import Navbar from "./components/Navbar";
import PokedexApp from "./components/PokedexApp";

export default function Page() {
  return (
    <>
      <Navbar />
      <main className="min-h-screen">
        <PokedexApp />
      </main>
    </>
  );
}
