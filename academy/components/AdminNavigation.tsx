import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Shield, ArrowRight } from 'lucide-react';

export default function AdminNavigation() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Link href="/admin">
        <Button 
          className="bg-primary hover:bg-primary-75 text-white shadow-lg flex items-center space-x-2 px-4 py-2"
          size="lg"
        >
          <Shield className="w-5 h-5" />
          <span className="text-button">Admin Dashboard</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Link>
    </div>
  );
}
