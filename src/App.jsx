import styles from "./App.module.css";
import { ThemeProvider } from "./contexts/ThemeContext.jsx";
import { Navbar } from "./components/Navbar/Navbar";
import { Hero } from "./components/Hero/Hero";
import { About } from "./components/About/About";
import { Experience } from "./components/Experience/Experience";
import { Projects } from "./components/Projects/Projects";
import KnowledgeGraph from "./components/KnowledgeGraph/KnowledgeGraph";
import { Contact } from "./components/Contact/Contact";

function App() {
  return (
    <ThemeProvider>
      <div className={styles.App}>
        <Navbar />
        <Hero />
        <About />
        <Experience />
        <Projects />
        <KnowledgeGraph />
        <Contact />
      </div>
    </ThemeProvider>
  );
}

export default App;
