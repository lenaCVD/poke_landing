import Nav from "./components/Nav";
import Hero from "./components/Hero";
import Skills from "./components/Skills";


export default function Home() {
  return (
    <>
      <main className="flex-1 flex flex-col items-start justify-center h-screen">
        <Hero />
      </main>
      <footer>
        <Skills />
      </footer>
    </>
  );
}
