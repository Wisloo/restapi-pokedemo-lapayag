"use client";

export default function SkeletonCard() {
  return (
    <div className="rounded-2xl bg-gray-100 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50 p-5 animate-pulse">
      <div className="w-24 h-24 mx-auto rounded-full bg-gray-200 dark:bg-gray-700 mb-4" />
      <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-2/3 mx-auto mb-3" />
      <div className="flex justify-center gap-2 mb-4">
        <div className="h-5 w-14 bg-gray-200 dark:bg-gray-700 rounded-full" />
        <div className="h-5 w-16 bg-gray-200 dark:bg-gray-700 rounded-full" />
      </div>
      <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2 mx-auto" />
    </div>
  );
}
