import { useCursor } from '@/hooks/useCursor';
import ScrollProgress from '@/components/layout/ScrollProgress';
import Hero from '@/components/sections/Hero';
import Introduction from '@/components/sections/Introduction';
import Story from '@/components/sections/Story';
import Experience from '@/components/sections/Experience';
import Title from '@/components/sections/Title';
import Projects from '@/components/sections/Projects';
import Contact from '@/components/sections/Contact';

export default function Portfolio() {
  useCursor();

  return (
    <>
      <ScrollProgress />
      <main>
        <div className="scroll__container">
          <Hero />
          <Introduction />
          <Story />
          <Experience />
          <Title message="STUFFS" />
          <Projects />
          <Title message="Find me!" />
          <Contact />
        </div>
      </main>
    </>
  );
}
