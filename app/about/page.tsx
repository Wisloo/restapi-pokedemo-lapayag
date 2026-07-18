import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 py-12">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            About
          </h1>
          <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
            <p>
              This is a Pokedex app built with Next.js, React, Tailwind CSS, and Chart.js.
              It fetches data from the{" "}
              <a
                href="https://pokeapi.co/"
                className="text-red-500 hover:text-red-600 dark:text-red-400 dark:hover:text-red-300 underline underline-offset-2 transition"
                target="_blank"
                rel="noopener noreferrer"
              >
                PokeAPI
              </a>.
            </p>
            <p>
              Browse through every Pokemon with infinite scroll, search by name,
              and view detailed stats with interactive radar charts.
            </p>
          </div>

          <div className="mt-8 p-5 rounded-2xl bg-gray-50 dark:bg-gray-800/50 border border-gray-200 dark:border-gray-700/50">
            <h2 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">Tech Stack</h2>
            <div className="flex flex-wrap gap-2">
              {["Next.js", "React", "TypeScript", "Tailwind CSS", "Chart.js", "PokeAPI"].map((tech) => (
                <span
                  key={tech}
                  className="px-3 py-1 text-xs font-medium bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-full text-gray-600 dark:text-gray-300"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
