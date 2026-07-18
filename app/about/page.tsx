import Navbar from "../components/Navbar";

export default function AboutPage() {
  return (
    <>
      <Navbar />
      <main className="p-6 space-y-4">
        <h1 className="text-3xl font-bold">About</h1>
        <p className="text-gray-600 dark:text-gray-400">
          This is a Pokemon demo app built with Next.js, React, Tailwind CSS, and Chart.js.
          It fetches data from the{" "}
          <a href="https://pokeapi.co/" className="text-blue-600 dark:text-blue-400 underline" target="_blank" rel="noopener noreferrer">
            PokeAPI
          </a>.
        </p>
      </main>
    </>
  );
}
