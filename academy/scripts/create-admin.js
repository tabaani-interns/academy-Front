const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// MongoDB connection
const MONGODB_URI =
  process.env.MONGODB_URI ||
  "mongodb+srv://admin:admin12345678@cluster0.veacp0i.mongodb.net/tabaani-academy?retryWrites=true&w=majority&appName=Cluster0";

// User Schema
const UserSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String },
    image: { type: String },
    role: {
      type: String,
      enum: ["student", "tutor", "admin"],
      default: "student",
    },
    githubId: { type: String },
    enrolledCourses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Course" }],
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model("User", UserSchema);

async function createAdminUser() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log("Connected to MongoDB");

    // Check if admin already exists
    const existingAdmin = await User.findOne({ email: "admin@admin.com" });

    if (existingAdmin) {
      console.log("Admin user already exists!");
      console.log("Email: admin@admin.com");
      console.log("Role:", existingAdmin.role);
      return;
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash("123456789", saltRounds);

    // Create admin user
    const adminUser = new User({
      name: "admin",
      email: "admin@admin.com",
      password: hashedPassword,
      role: "admin",
    });

    await adminUser.save();

    console.log("✅ Admin user created successfully!");
    console.log("📧 Email: admin@admin.com");
    console.log("🔑 Password: 123456789");
    console.log("👤 Role: admin");
  } catch (error) {
    console.error("❌ Error creating admin user:", error);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    process.exit(0);
  }
}

createAdminUser();
