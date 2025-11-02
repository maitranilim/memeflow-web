import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="w-full px-6 py-6 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div>
          © {new Date().getFullYear()} MemeFlow. All rights reserved.
        </div>
        <div className="flex gap-4">
          <Link href="/admin" className="hover:text-[#00d4c9] transition-colors">
            Admin Dashboard
          </Link>
          <Link href="/profile" className="hover:text-[#00d4c9] transition-colors">
            Profile
          </Link>
        </div>
      </div>
    </footer>
  );
}
