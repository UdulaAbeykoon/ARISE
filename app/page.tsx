import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowRight, Bot, Code, Zap, Users, Globe, Sparkles, Play, Star, Cpu, Layers, BookOpen } from "lucide-react"
import Link from "next/link"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background overflow-hidden relative">
      <div className="fixed inset-0 gradient-mesh grain-texture"></div>

      <div
        className="abstract-shape-enhanced organic-shape"
        style={{
          width: "300px",
          height: "300px",
          top: "5%",
          right: "5%",
          zIndex: 0,
        }}
      ></div>
      <div
        className="abstract-shape-enhanced float-complex"
        style={{
          width: "200px",
          height: "200px",
          bottom: "15%",
          left: "3%",
          zIndex: 0,
          animationDelay: "2s",
        }}
      ></div>
      <div
        className="abstract-shape-enhanced organic-shape"
        style={{
          width: "150px",
          height: "150px",
          top: "50%",
          right: "15%",
          zIndex: 0,
          animationDelay: "4s",
        }}
      ></div>

      {/* Navigation */}
      <nav className="sticky top-0 z-50 glass-card">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 gradient-orb rounded-2xl flex items-center justify-center pulse-glow relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <Bot className="w-7 h-7 text-white relative z-10" />
            </div>
            <span className="text-3xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
              ARISE
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <Link href="#mission" className="text-foreground hover:text-primary transition-colors font-medium">
              Mission
            </Link>
            <Link href="#features" className="text-foreground hover:text-primary transition-colors font-medium">
              Features
            </Link>
            <Link href="#community" className="text-foreground hover:text-primary transition-colors font-medium">
              Community
            </Link>
            <Button className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white shadow-lg">
              Start Building
            </Button>
          </div>
        </div>
      </nav>

      <section className="relative min-h-screen flex items-center">
        <div className="absolute inset-0 animated-gradient"></div>
        <div className="container mx-auto px-6 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left side - Content */}
            <div className="slide-in-left">
              <Badge className="mb-6 glass-card text-primary border-primary/30 hover:bg-primary/10 text-sm font-medium relative overflow-hidden">
                <div className="absolute inset-0 grain-texture"></div>
                <Sparkles className="w-4 h-4 mr-2 relative z-10" />
                <span className="relative z-10">2,000+ Students Building the Future</span>
              </Badge>

              <h1 className="text-5xl md:text-7xl font-display font-bold text-balance mb-8 leading-tight">
                Robotics Education
                <span className="block bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                  Reimagined
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-muted-foreground text-balance mb-10 leading-relaxed max-w-lg">
                Experience the future with <strong className="text-primary">Spike Prime robots</strong> in augmented
                reality. No hardware barriers, just pure innovation.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 text-white text-lg px-8 py-6 shadow-xl"
                >
                  <Play className="w-5 h-5 mr-2" />
                  Experience AR Demo
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 py-6 border-2 border-primary text-primary hover:bg-primary hover:text-white bg-transparent"
                >
                  Watch in Action
                </Button>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 text-center">
                <div>
                  <div className="text-2xl font-display font-bold text-primary">10K+</div>
                  <div className="text-sm text-muted-foreground">Students</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-secondary">500+</div>
                  <div className="text-sm text-muted-foreground">Kits Shipped</div>
                </div>
                <div>
                  <div className="text-2xl font-display font-bold text-primary">100+</div>
                  <div className="text-sm text-muted-foreground">Workshops</div>
                </div>
              </div>
            </div>

            {/* Right side - Enhanced Spike Prime Robot Illustration */}
            <div className="slide-in-right relative">
              <div className="relative w-full max-w-md mx-auto">
                <div className="w-80 h-80 mx-auto gradient-orb rounded-3xl flex items-center justify-center float-complex organic-shape relative overflow-hidden">
                  <div className="absolute inset-0 grain-texture"></div>
                  <Bot className="w-40 h-40 text-white relative z-10" />
                </div>

                <div className="absolute -top-4 -right-4 w-16 h-16 glass-card rounded-2xl flex items-center justify-center float-complex">
                  <Code className="w-8 h-8 text-primary" />
                </div>
                <div
                  className="absolute -bottom-4 -left-4 w-12 h-12 glass-card rounded-xl flex items-center justify-center float-complex"
                  style={{ animationDelay: "1s" }}
                >
                  <Zap className="w-6 h-6 text-secondary" />
                </div>

                <div className="absolute top-1/4 -left-8 w-8 h-8 gradient-orb rounded-full organic-shape"></div>
                <div
                  className="absolute bottom-1/4 -right-8 w-6 h-6 gradient-orb rounded-full float-complex"
                  style={{ animationDelay: "3s" }}
                ></div>
                <div className="absolute top-3/4 left-1/4 w-4 h-4 glass-card rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="mission" className="relative py-24 animated-gradient">
        <div className="absolute inset-0 grain-texture"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-4xl mx-auto text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-balance mb-8">
              Breaking Down <span className="text-secondary">Barriers</span> to Innovation
            </h2>
            <p className="text-xl text-muted-foreground text-balance leading-relaxed">
              Traditional robotics education costs over $500 per student and requires expensive hardware. ARISE
              transforms this with cutting-edge AR simulation and visual programming.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 relative">
            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 glass-card border-2 border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <CardHeader className="text-center p-8 relative z-10">
                <div className="w-16 h-16 gradient-orb rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-display text-xl mb-4">Global Accessibility</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Reach students worldwide without the need for expensive physical robotics kits
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 glass-card border-2 border-secondary/20 md:mt-8 relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <CardHeader className="text-center p-8 relative z-10">
                <div className="w-16 h-16 gradient-orb rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <Cpu className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-display text-xl mb-4">AR Innovation</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Experience Spike Prime robots in immersive augmented reality environments
                </CardDescription>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-2xl transition-all duration-500 hover:-translate-y-4 glass-card border-2 border-primary/20 relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <CardHeader className="text-center p-8 relative z-10">
                <div className="w-16 h-16 gradient-orb rounded-2xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                  <BookOpen className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-display text-xl mb-4">Visual Learning</CardTitle>
                <CardDescription className="text-base leading-relaxed">
                  Intuitive drag-and-drop programming that makes robotics accessible to all ages
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section id="features" className="relative py-24">
        <div className="absolute inset-0 gradient-mesh grain-texture"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-balance mb-6">
              Everything You Need for <span className="text-primary">Robotics Mastery</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-3xl mx-auto">
              From Spike Prime simulation to advanced AR visualization, ARISE provides a complete robotics education
              ecosystem
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-8">
            {/* Large feature card */}
            <Card className="lg:col-span-8 group hover:shadow-2xl transition-all duration-500 glass-card border-2 border-primary/30 relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <CardHeader className="p-10 relative z-10">
                <div className="flex items-start gap-6">
                  <div className="w-20 h-20 gradient-orb rounded-3xl flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Bot className="w-10 h-10 text-white" />
                  </div>
                  <div>
                    <CardTitle className="font-display text-3xl mb-4">Spike Prime AR Simulation</CardTitle>
                    <CardDescription className="text-lg leading-relaxed text-muted-foreground">
                      Experience authentic Spike Prime robotics in augmented reality. Build, program, and test your
                      robots in virtual environments that mirror real-world physics and constraints.
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>

            {/* Smaller feature cards */}
            <div className="lg:col-span-4 space-y-8">
              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-card relative overflow-hidden">
                <div className="absolute inset-0 grain-texture"></div>
                <CardHeader className="p-6 relative z-10">
                  <div className="w-12 h-12 gradient-orb rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Code className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="font-display text-lg">Visual Coding</CardTitle>
                  <CardDescription>Drag-and-drop programming interface designed for intuitive learning</CardDescription>
                </CardHeader>
              </Card>

              <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-card relative overflow-hidden">
                <div className="absolute inset-0 grain-texture"></div>
                <CardHeader className="p-6 relative z-10">
                  <div className="w-12 h-12 gradient-orb rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="font-display text-lg">3D CAD Design</CardTitle>
                  <CardDescription>Build and customize robot components with professional-grade tools</CardDescription>
                </CardHeader>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <section id="community" className="relative py-24 animated-gradient">
        <div className="absolute inset-0 grain-texture"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-display font-bold text-balance mb-8">
              Join Our Global <span className="text-secondary">Community</span>
            </h2>
            <p className="text-xl text-muted-foreground text-balance max-w-2xl mx-auto">
              Connect with educators, students, and robotics enthusiasts from around the world
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-card relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <CardHeader className="p-8 text-center relative z-10">
                <div className="w-16 h-16 gradient-orb rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Users className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-display text-xl mb-4">2,000+ Active Students</CardTitle>
                <CardDescription className="text-base">
                  "ARISE transformed how I teach robotics. My students are more engaged than ever!"
                </CardDescription>
                <div className="mt-4 text-sm text-primary font-medium">- Sarah Chen, Educator</div>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-card md:mt-8 relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <CardHeader className="p-8 text-center relative z-10">
                <div className="w-16 h-16 gradient-orb rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Globe className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-display text-xl mb-4">50+ Countries</CardTitle>
                <CardDescription className="text-base">
                  "Finally, robotics education that doesn't require a huge budget. Game-changer!"
                </CardDescription>
                <div className="mt-4 text-sm text-secondary font-medium">- Marcus Rodriguez, Principal</div>
              </CardHeader>
            </Card>

            <Card className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 glass-card lg:mt-0 md:col-span-2 lg:col-span-1 relative overflow-hidden">
              <div className="absolute inset-0 grain-texture"></div>
              <CardHeader className="p-8 text-center relative z-10">
                <div className="w-16 h-16 gradient-orb rounded-full flex items-center justify-center mb-6 mx-auto">
                  <Star className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="font-display text-xl mb-4">4.9/5 Rating</CardTitle>
                <CardDescription className="text-base">
                  "My kids love building robots in AR. It's like magic meets education!"
                </CardDescription>
                <div className="mt-4 text-sm text-primary font-medium">- Jennifer Park, Parent</div>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      <section className="relative py-24 overflow-hidden bg-gradient-to-br from-primary to-secondary">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="absolute inset-0 opacity-10">
          <div className="grain-texture w-full h-full"></div>
        </div>
        <div className="container mx-auto px-6 text-center relative z-10 text-white">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-balance mb-8">
            Ready to Transform Robotics Education?
          </h2>
          <p className="text-xl text-balance mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of educators and students already building the future with ARISE's innovative platform
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-primary hover:bg-white/90 text-lg px-10 py-6 shadow-xl">
              <Star className="w-5 h-5 mr-2" />
              Start Free Trial
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white hover:text-primary text-lg px-10 py-6 bg-transparent"
            >
              Schedule Demo
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t border-border py-16 relative">
        <div className="absolute inset-0 grain-texture"></div>
        <div className="container mx-auto px-6 relative z-10">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="flex items-center gap-3 mb-6 md:mb-0">
              <div className="w-10 h-10 gradient-orb rounded-xl flex items-center justify-center">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <span className="text-3xl font-display font-bold bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent">
                ARISE
              </span>
            </div>
            <div className="flex items-center gap-8 text-muted-foreground">
              <Link href="https://www.arisesim.com" className="hover:text-primary transition-colors font-medium">
                Visit Platform
              </Link>
              <span>•</span>
              <span>Robotics education reimagined</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
