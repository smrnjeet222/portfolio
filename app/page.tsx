import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Projects from "@/components/Projects";
import Experiences from "@/components/Experiences";
import Achievements from "@/components/Achievements";
import OpenSource from "@/components/OpenSource";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
// import BottomDock from "@/components/BottomDock";

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: "60px", paddingBottom: "100px" }}>
        <Hero />
        <About />
        <Experiences />
        <Projects />
        <Achievements />
        <OpenSource />
        <Contact />
      </main>
      <Footer />
      {/* <BottomDock /> */}
    </>
  );
}
