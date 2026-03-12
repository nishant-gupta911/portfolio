import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ProjectShowcase from './components/ProjectShowcase';
import CapabilitySection from './components/CapabilitySection';
import CredentialsStrip from './components/CredentialsStrip';
import ContactBand from './components/ContactBand';
import Footer from './components/Footer';

function App() {
  return (
    <div className="relative min-h-screen overflow-x-clip bg-black text-white selection:bg-accent-purple/30 selection:text-white">
      <div className="relative z-10">
        <Navbar />

        <main>
          <Hero />
          <ProjectShowcase />
          <CapabilitySection />
          <CredentialsStrip />
          <ContactBand />
        </main>

        <Footer />
      </div>
    </div>
  );
}

export default App;
