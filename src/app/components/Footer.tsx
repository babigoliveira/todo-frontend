export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="w-full border-t border-gray-200 bg-white">
      <div className="mx-auto flex max-w-6xl items-center justify-center px-4 py-2">
        <span className="text-xs text-gray-500 sm:text-sm">Copyright © {year}</span>
      </div>
    </footer>
  );
}
