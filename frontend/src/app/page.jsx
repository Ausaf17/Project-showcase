"use client"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Navbar } from "./(main)/Navbar"
import { ProjectCard } from "@/components/project-card"
import { Search, TrendingUp, Users, FolderOpen, Award, ArrowRight, Filter, GraduationCap } from "lucide-react"
import React, { useEffect, useState } from "react"
import axios from "axios"
import Link from "next/link"

// Sample data
const featuredProjects = [
  {
    id: "1",
    title: "AI-Powered Student Management System",
    description:
      "A comprehensive web application that uses machine learning to predict student performance and provide personalized learning recommendations.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Computer Science",
    student: {
      name: "Sarah Johnson",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Computer Science",
    },
    date: "Dec 2024",
    views: 1250,
    likes: 89,
    rating: 4.8,
    featured: true,
  },
  {
    id: "2",
    title: "Sustainable Energy Monitoring IoT Device",
    description:
      "An IoT-based system for monitoring and optimizing energy consumption in smart buildings using renewable energy sources.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Engineering",
    student: {
      name: "Michael Chen",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Electrical Engineering",
    },
    date: "Nov 2024",
    views: 980,
    likes: 67,
    rating: 4.6,
    featured: true,
  },
  {
    id: "3",
    title: "Mental Health Support Mobile App",
    description:
      "A React Native application providing mental health resources, mood tracking, and peer support for college students.",
    image: "/placeholder.svg?height=300&width=400",
    category: "Mobile Development",
    student: {
      name: "Emily Rodriguez",
      avatar: "/placeholder.svg?height=40&width=40",
      department: "Psychology & CS",
    },
    date: "Oct 2024",
    views: 756,
    likes: 54,
    rating: 4.7,
  },
]

const categories = [
  "Computer Science",
  "Engineering",
  "Mobile Development",
  "Web Development",
  "Data Science",
  "AI/ML",
  "Blockchain",
  "IoT",
  "AR/VR",
  "Design",
]

const stats = [
  { label: "Total Projects", value: "2,847", icon: FolderOpen },
  { label: "Active Students", value: "1,234", icon: Users },
  { label: "Categories", value: "25", icon: Award },
  { label: "Monthly Views", value: "45.2K", icon: TrendingUp },
]

export default function HomePage() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/getall`)
        setProjects(res.data)
      } catch (error) {
        setProjects([])
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [])

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-br from-primary/10 via-background to-secondary/10">
        <div className="container mx-auto text-center">
          <Badge variant="outline" className="mb-4">
            🎓 Showcasing Student Innovation
          </Badge>
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
            Discover Amazing
            <br />
            College Projects
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Explore innovative projects created by talented students from universities worldwide. Get inspired, learn,
            and connect with the next generation of creators.
          </p>

          {/* Search Bar */}
          <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto mb-8">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input placeholder="Search projects, students, or categories..." className="pl-10" />
            </div>
            <Button size="lg">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button>
          </div>

          <div className="flex flex-wrap justify-center gap-2">
            {categories.slice(0, 6).map((category) => (
              <Badge
                key={category}
                variant="secondary"
                className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              >
                {category}
              </Badge>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 border-b">
        <div className="container mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center">
                <CardContent className="pt-6">
                  <stat.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <div className="text-2xl font-bold mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Projects */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Featured Projects</h2>
              <p className="text-muted-foreground">Handpicked exceptional projects by our community</p>
            </div>
            <Button variant="outline">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.id} {...project} />
            ))}
          </div>
        </div>
      </section>

      {/* Recent Projects */}
      <section className="py-16 px-4 bg-muted/50">
        <div className="container mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold mb-2">Recent Projects</h2>
              <p className="text-muted-foreground">Latest submissions from our student community</p>
            </div>
            <Button variant="outline">
              View All
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
          {loading ? (
            <div className="text-center py-12">Loading projects...</div>
          ) : projects.length === 0 ? (
            <div className="text-center py-12">No projects found.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.slice(0, 6).map((project) => (
                <ProjectCard key={project._id} {...project} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Explore by Category</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Browse projects across different fields of study and discover what interests you most
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {categories.map((category) => (
              <Link key={category} href={`/browse-project?category=${encodeURIComponent(category)}`} passHref legacyBehavior>
                <Card className="cursor-pointer hover:shadow-md transition-shadow">
                  <CardContent className="p-6 text-center">
                    <div className="text-sm font-medium">{category}</div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Share Your Project?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of students showcasing their innovative work. Get feedback, recognition, and connect with
            peers and industry professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary">
              Submit Project
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <GraduationCap className="h-6 w-6 text-primary" />
                <span className="text-xl font-bold">ProjectHub</span>
              </div>
              <p className="text-muted-foreground">
                Empowering students to showcase their innovative projects and connect with the world.
              </p>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Explore</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Featured Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Recent Projects
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Categories
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Top Students
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Community</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    Submit Project
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Guidelines
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Support
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Blog
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary">
                    About Us
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary">
                    Terms of Service
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            <p>&copy; {new Date().getFullYear()} ProjectHub. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
