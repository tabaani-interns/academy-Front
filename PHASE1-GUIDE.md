# 🚀 Phase 1 Implementation Guide

## Getting Started - Database & Authentication Setup

### Step 1: Install Required Dependencies

```bash
cd academy
npm install next-auth @next-auth/mongodb-adapter mongoose @types/mongoose
npm install --save-dev @types/node
```

### Step 2: Environment Variables Setup

Create `.env.local` in the academy folder:

```env
# MongoDB Connection
MONGODB_URI=mongodb://localhost:27017/tabaani-academy
# or use MongoDB Atlas: mongodb+srv://username:password@cluster.mongodb.net/tabaani-academy

# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here

# GitHub OAuth (Create app at: https://github.com/settings/applications/new)
GITHUB_ID=your-github-client-id
GITHUB_SECRET=your-github-client-secret
```

### Step 3: Create Database Connection

Create `lib/mongodb.ts`:

```typescript
import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI!;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectDB() {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }

  try {
    cached.conn = await cached.promise;
  } catch (e) {
    cached.promise = null;
    throw e;
  }

  return cached.conn;
}

export default connectDB;
```

### Step 4: Create User Model

Create `models/User.ts`:

```typescript
import mongoose, { Schema, Document } from 'mongoose';

export interface IUser extends Document {
  email: string;
  name: string;
  image?: string;
  role: 'student' | 'tutor' | 'admin';
  githubId: string;
  enrolledCourses: mongoose.Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  image: { type: String },
  role: { type: String, enum: ['student', 'tutor', 'admin'], default: 'student' },
  githubId: { type: String, required: true, unique: true },
  enrolledCourses: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
}, {
  timestamps: true
});

export default mongoose.models.User || mongoose.model<IUser>('User', UserSchema);
```

### Step 5: Setup NextAuth

Create `app/api/auth/[...nextauth]/route.ts`:

```typescript
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import { MongoDBAdapter } from '@next-auth/mongodb-adapter';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URI!);
const clientPromise = client.connect();

const handler = NextAuth({
  adapter: MongoDBAdapter(clientPromise),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
    }),
  ],
  callbacks: {
    async session({ session, user }) {
      session.user.id = user.id;
      session.user.role = user.role || 'student';
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  pages: {
    signIn: '/login',
  },
});

export { handler as GET, handler as POST };
```

### Step 6: Create Session Provider

Create `components/SessionProvider.tsx`:

```typescript
'use client';

import { SessionProvider } from 'next-auth/react';

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}
```

### Step 7: Update Root Layout

Update `app/layout.tsx`:

```typescript
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import AuthProvider from "@/components/SessionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Tabaani Academy",
  description: "E-learning application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### Step 8: Create Login Page

Create `app/login/page.tsx`:

```typescript
'use client';

import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export default function LoginPage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push('/dashboard');
    }
  }, [session, router]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Welcome to Tabaani Academy</CardTitle>
          <p className="text-gray-600">Sign in to continue your learning journey</p>
        </CardHeader>
        <CardContent>
          <Button
            onClick={() => signIn('github', { callbackUrl: '/dashboard' })}
            className="w-full"
            size="lg"
          >
            Continue with GitHub
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
```

### Step 9: Add Auth to Header

Update `components/Header.tsx` to include login/logout:

```typescript
// Add these imports
import { useSession, signIn, signOut } from 'next-auth/react';

// In the header component, replace the user profile section:
const { data: session } = useSession();

// Replace the user profile div with:
{session ? (
  <div className="flex items-center space-x-3">
    <div className="flex items-center space-x-2">
      <img
        src={session.user?.image || ''}
        alt={session.user?.name || ''}
        className="h-8 w-8 rounded-full"
      />
      <div className="hidden sm:block">
        <p className="text-subtitle2 font-roboto text-gray-700">
          {session.user?.name}
        </p>
        <p className="text-body2 font-roboto text-gray-500">
          {session.user?.role}
        </p>
      </div>
    </div>
    <Button onClick={() => signOut()} variant="outline" size="sm">
      Logout
    </Button>
  </div>
) : (
  <Button onClick={() => signIn('github')} size="sm">
    Login
  </Button>
)}
```

### Step 10: GitHub OAuth App Setup

1. Go to GitHub Settings → Developer settings → OAuth Apps
2. Click "New OAuth App"
3. Fill in:
   - Application name: `Tabaani Academy`
   - Homepage URL: `http://localhost:3000`
   - Authorization callback URL: `http://localhost:3000/api/auth/callback/github`
4. Copy Client ID and Client Secret to `.env.local`

## 🚀 Ready to Start!

After completing these steps, you'll have:
- ✅ GitHub authentication working
- ✅ MongoDB connection established
- ✅ User model created
- ✅ Basic login/logout functionality

Run the development server:
```bash
npm run dev
```

Then visit `http://localhost:3000/login` to test the authentication!

## Next Steps

1. Create Course, Enrollment, and Progress models
2. Set up protected routes middleware
3. Build the dashboard pages
4. Start working on course enrollment functionality

Happy coding! 🎉
