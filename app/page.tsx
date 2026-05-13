import { Navbar } from "@/components/navbar"
import { Hero } from "@/components/hero"
import { Skills } from "@/components/skills"
import { Projects } from "@/components/projects"
import { Footer } from "@/components/footer"
import { About } from "@/components/about"
import { ContactSection } from "@/components/contact-section"
import { Timeline } from "@/components/timeline"
import { getEducations } from "@/lib/actions/education-actions"
import { getExperiences } from "@/lib/actions/experience-actions"

export default async function Home() {
  const educations = await getEducations()
  const experiences = await getExperiences()

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark font-sans selection:bg-primary/30">
      <div className="relative w-full flex flex-col overflow-x-hidden grid-pattern">
        <Navbar />
        <Hero />
        <Skills />
        <Projects />
        <Timeline experiences={experiences} educations={educations} />
        <About />
        <ContactSection />
        <Footer />
      </div>
    </main>
  );
}
