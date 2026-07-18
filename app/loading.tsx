export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 rounded-full border-4 border-gray-200 dark:border-gray-700" />
          <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white dark:bg-gray-900 border-2 border-red-500" />
          </div>
        </div>
        <p className="text-sm text-gray-400 dark:text-gray-500 font-medium">
          Loading Pokemon...
        </p>
      </div>
    </div>
  );
}
