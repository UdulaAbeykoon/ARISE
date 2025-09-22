import { Card } from "@/components/ui/card"
import Link from "next/link"

export default function ProjectsPage() {
  const projects = [
    {
      title: "SpaceY",
      description: "3D assets for Rocket company",
      category: "3D Design",
      client: "SpaceY Corporation",
      year: "2025"
    },
    {
      title: "Lineal",
      description: "3D Images for B2B digital product",
      category: "Product Design",
      client: "Lineal Technologies",
      year: "2025"
    },
    {
      title: "The G Company",
      description: "Special design for the doodle of the day",
      category: "Branding",
      client: "G Company",
      year: "2024"
    },
    {
      title: "Splines",
      description: "3D assets for public website and marketing campaigns",
      category: "Marketing",
      client: "Spline Design",
      year: "2024"
    }
  ]

  return (
    <div className="min-h-screen pt-32 px-6">
      <div className="max-w-[1400px] mx-auto">
        <h1 className="text-6xl font-bold mb-12">Projects</h1>
        
        <div className="grid grid-cols-2 gap-12">
          {projects.map((project, index) => (
            <Card key={index} className="group relative overflow-hidden rounded-3xl bg-gray-100 aspect-[4/3] hover:cursor-pointer hover-lift">
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-all z-10" />
              <div className="absolute bottom-8 left-8 z-20 text-white">
                <h3 className="text-2xl font-semibold mb-2">{project.title}</h3>
                <p className="text-white/80 mb-4">{project.description}</p>
                <div className="flex gap-4 text-sm">
                  <span className="text-white/60">{project.category}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">{project.client}</span>
                  <span className="text-white/60">•</span>
                  <span className="text-white/60">{project.year}</span>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
