import { Header } from "./_components/Header";
import { Hero } from "./_components/Hero";
import { Professionals } from "./_components/Professionals";

export default function HomePage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div>
        <Hero />
        <Professionals />
      </div>
    </div>
  );
}
