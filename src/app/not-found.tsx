import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Home } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-zinc-50 px-6 text-center">
      <h1 className="text-9xl font-black text-zinc-200">404</h1>
      <div className="space-y-4 max-w-md">
        <h2 className="text-3xl font-bold text-zinc-900">Page Not Found</h2>
        <p className="text-zinc-500 font-medium">
          The page you are looking for doesn't exist or has been moved to a new location.
        </p>
        <Link href="/" className="inline-block pt-6">
          <Button className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-full px-8 h-12 font-bold">
            <Home className="w-4 h-4 mr-2" /> Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
}
