"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import axios from "axios"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { ImageCarousel } from "@/components/image-carousel"
import {
  Calendar,
  Users,
  Code,
  Tag,
  ExternalLink,
  Building2,
  FileText,
  ImageIcon,
  Loader2,
  Star,
  Download,
  Share2,
  Eye,
  Clock,
  Award,
} from "lucide-react"

const placeholderImg = "/placeholder.svg?height=500&width=800"

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)

  const fetchProjectDetails = async () => {
    try {
      const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/getbyid/${id}`)
      setProject(res.data)
      setLoading(false)
    } catch (error) {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (id) fetchProjectDetails()
  }, [id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center">
        <div className="flex flex-col items-center gap-4 text-slate-600">
          <div className="relative">
            <Loader2 className="h-12 w-12 animate-spin text-indigo-600" />
            <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-indigo-200 opacity-20" />
          </div>
          <div className="text-center">
            <h3 className="text-lg font-semibold text-slate-900">Loading Project</h3>
            <p className="text-sm text-slate-600">Please wait while we fetch the details...</p>
          </div>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-xl border-0 bg-white/80 backdrop-blur-sm">
          <CardContent className="pt-8 text-center">
            <div className="w-16 h-16 rounded-full bg-red-100 flex items-center justify-center mx-auto mb-4">
              <FileText className="h-8 w-8 text-red-600" />
            </div>
            <h2 className="text-xl font-bold text-slate-900 mb-2">Project Not Found</h2>
            <p className="text-slate-600 mb-4">The project you're looking for doesn't exist or has been removed.</p>
            <Button variant="outline" onClick={() => window.history.back()}>
              Go Back
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          color: "bg-emerald-100 text-emerald-800 border-emerald-200",
          icon: Award,
        }
      case "in progress":
        return {
          color: "bg-blue-100 text-blue-800 border-blue-200",
          icon: Clock,
        }
      case "pending":
        return {
          color: "bg-amber-100 text-amber-800 border-amber-200",
          icon: Clock,
        }
      default:
        return {
          color: "bg-slate-100 text-slate-800 border-slate-200",
          icon: FileText,
        }
    }
  }

  const statusConfig = getStatusConfig(project.status)
  const StatusIcon = statusConfig.icon

  // Combine thumbnail and gallery images for carousel
  const allImages = [
    ...(project.thumbnailUrl ? [project.thumbnailUrl] : []),
    ...(Array.isArray(project.galleryImageUrls) ? project.galleryImageUrls : []),
  ].filter(Boolean)

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600">
        <div className="absolute inset-0 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/50 to-transparent" />

        <div className="relative container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center text-white">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Badge className={`${statusConfig.color} border-0`}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {project.status}
              </Badge>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
              {project.title}
            </h1>

            <div className="flex flex-wrap items-center justify-center gap-6 text-white/90">
              {project.department && (
                <div className="flex items-center gap-2">
                  <Building2 className="h-5 w-5" />
                  <span>{project.department}</span>
                </div>
              )}
              {project.academicYear && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  <span>{project.academicYear}</span>
                </div>
              )}
              {Array.isArray(project.contributors) && (
                <div className="flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  <span>{project.contributors.length} Contributors</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Action Buttons */}
        <div className="flex flex-wrap gap-3 mb-8 justify-center">
          {project.sourceCodeUrl && (
            <Button
              size="lg"
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
            >
              <Code className="h-4 w-4 mr-2" />
              View Source Code
              <ExternalLink className="h-4 w-4 ml-2" />
            </Button>
          )}
          <Button variant="outline" size="lg">
            <Share2 className="h-4 w-4 mr-2" />
            Share Project
          </Button>
          <Button variant="outline" size="lg">
            <Download className="h-4 w-4 mr-2" />
            Download
          </Button>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Image Carousel */}
            {allImages.length > 0 && (
              <Card className="overflow-hidden shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-slate-50 to-slate-100">
                  <CardTitle className="flex items-center gap-2">
                    <ImageIcon className="h-5 w-5 text-indigo-600" />
                    Project Gallery
                    <Badge variant="secondary" className="ml-auto">
                      {allImages.length} {allImages.length === 1 ? "Image" : "Images"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <ImageCarousel images={allImages} title={project.title} />
                </CardContent>
              </Card>
            )}

            {/* Description */}
            {project.description && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-indigo-50">
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5 text-blue-600" />
                    Project Description
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 leading-relaxed text-lg">{project.description}</p>
                </CardContent>
              </Card>
            )}

            {/* Abstract */}
            {project.abstract && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                  <CardTitle className="flex items-center gap-2">
                    <Star className="h-5 w-5 text-purple-600" />
                    Abstract
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-slate-700 leading-relaxed text-lg">{project.abstract}</p>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Project Stats */}
            <Card className="shadow-xl border-0 bg-gradient-to-br from-indigo-500 to-purple-600 text-white">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-4 text-lg">Project Overview</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <Eye className="h-4 w-4" />
                      Status
                    </span>
                    <Badge className="bg-white/20 text-white border-white/30">{project.status}</Badge>
                  </div>
                  {project.creator && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Users className="h-4 w-4" />
                        Creator
                      </span>
                      <span className="text-sm">{project.creator.name || project.creator.email || 'Unknown'}</span>
                    </div>
                  )}
                  {project.department && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Building2 className="h-4 w-4" />
                        Department
                      </span>
                      <span className="text-sm">{project.department}</span>
                    </div>
                  )}
                  {project.academicYear && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Calendar className="h-4 w-4" />
                        Year
                      </span>
                      <span className="text-sm">{project.academicYear}</span>
                    </div>
                  )}
                  {project.categories && project.categories.length > 0 && (
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-2">
                        <Tag className="h-4 w-4" />
                        Categories
                      </span>
                      <span className="flex flex-wrap gap-1">
                        {project.categories.map((cat, i) => (
                          <Badge key={i} className="bg-blue-100 text-blue-800 border-blue-200">{cat}</Badge>
                        ))}
                      </span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Contributors */}
            {Array.isArray(project.contributors) && project.contributors.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-green-600" />
                    Contributors
                    <Badge variant="secondary" className="ml-auto">
                      {project.contributors.length}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="space-y-3">
                    {project.contributors.map((contributor, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-3 p-3 rounded-lg bg-gradient-to-r from-slate-50 to-slate-100 hover:from-slate-100 hover:to-slate-200 transition-all"
                      >
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-emerald-500 flex items-center justify-center text-white font-semibold">
                          {(contributor.name || contributor.email || "C").charAt(0).toUpperCase()}
                        </div>
                        <div>
                          <p className="font-medium text-slate-900">
                            {contributor.name || contributor.email || "Contributor"}
                          </p>
                          {contributor.role && <p className="text-xs text-slate-600">{contributor.role}</p>}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Technologies */}
            {Array.isArray(project.technologiesUsed) && project.technologiesUsed.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                  <CardTitle className="flex items-center gap-2">
                    <Code className="h-5 w-5 text-blue-600" />
                    Technologies
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.technologiesUsed.map((tech, i) => (
                      <Badge
                        key={i}
                        className="bg-gradient-to-r from-blue-100 to-cyan-100 text-blue-800 border-blue-200 hover:from-blue-200 hover:to-cyan-200 transition-all"
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Tags */}
            {Array.isArray(project.tags) && project.tags.length > 0 && (
              <Card className="shadow-xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="bg-gradient-to-r from-amber-50 to-orange-50">
                  <CardTitle className="flex items-center gap-2">
                    <Tag className="h-5 w-5 text-amber-600" />
                    Tags
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, i) => (
                      <Badge
                        key={i}
                        variant="outline"
                        className="bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200 text-amber-800 hover:bg-gradient-to-r hover:from-amber-100 hover:to-orange-100 transition-all"
                      >
                        #{tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProjectDetail
