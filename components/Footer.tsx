export default function Footer() {
  return (
    <footer className="w-full px-6 py-6 border-t border-gray-800 mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-400">
        <div>
          © {new Date().getFullYear()} MemeFlow. All rights reserved.
        </div>
        <div className="flex gap-4">
          {/* Admin dashboard and profile pages don't exist yet - shown as
              disabled so the footer previews what's coming without linking
              to a 404. */}
          <span className="cursor-not-allowed opacity-50" title="Coming soon">
            Admin Dashboard
          </span>
          <span className="cursor-not-allowed opacity-50" title="Coming soon">
            Profile
          </span>
        </div>
      </div>
    </footer>
  );
}
