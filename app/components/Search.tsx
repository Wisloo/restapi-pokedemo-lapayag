"use client";

interface SearchProps {
  onSearch: (query: string) => void;
}

export default function Search({ onSearch }: SearchProps) {
  return (
    <input
      placeholder="Search Pokemon..."
      onChange={(e) => {
        onSearch(e.target.value);
      }}
      className="border p-2 rounded w-full mb-4 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 placeholder-gray-400 dark:placeholder-gray-500"
    />
  );
}
