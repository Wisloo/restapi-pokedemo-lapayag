"use client";

interface SearchProps {
  onSearch: (query: string) => void;
  resultCount: number;
  totalCount: number;
}

export default function Search({ onSearch, resultCount, totalCount }: SearchProps) {
  return (
    <div className="space-y-2">
      <div className="relative">
        <svg
          className="absolute left-3.5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 dark:text-gray-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
          />
        </svg>
        <input
          placeholder="Search Pokemon..."
          onChange={(e) => onSearch(e.target.value)}
          className="w-full pl-11 pr-4 py-3 rounded-2xl border border-gray-200 dark:border-gray-700
            bg-gray-50 dark:bg-gray-800/80 text-gray-900 dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            focus:outline-none focus:ring-2 focus:ring-red-400/50 focus:border-red-400
            dark:focus:ring-red-500/30 dark:focus:border-red-500
            transition text-sm"
        />
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 px-1">
        Showing {resultCount} of {totalCount} Pokemon
      </p>
    </div>
  );
}
