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
  ExternalLink,
  Building2,
  FileText,
  ImageIcon,
  Download,
  Share2,
  Clock,
  Award,
  ArrowLeft,
  Globe,
  Star,
  Eye,
  Heart,
  MessageCircle,
} from "lucide-react"
import { toast } from "react-hot-toast"

const ProjectDetail = () => {
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState(false)

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

  const handleShare = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch (err) {
      // fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = window.location.href
      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()
      try {
        document.execCommand("copy")
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      } catch (err) {}
      document.body.removeChild(textArea)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-center">
          <div className="relative mb-6">
            <div className="w-20 h-20 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin mx-auto"></div>
            <div className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-indigo-400 rounded-full animate-spin mx-auto" style={{ animationDelay: '0.5s' }}></div>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-3">Loading Project</h3>
          <p className="text-gray-600 max-w-md">Please wait while we fetch the project details...</p>
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-4">
        <div className="bg-white/80 backdrop-blur-sm rounded-3xl shadow-2xl p-10 text-center max-w-lg w-full border border-white/20">
          <div className="w-20 h-20 bg-gradient-to-br from-red-100 to-red-200 rounded-full flex items-center justify-center mx-auto mb-6">
            <FileText className="h-10 w-10 text-red-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-3">Project Not Found</h2>
          <p className="text-gray-600 mb-8 text-lg">The project you're looking for doesn't exist or has been removed.</p>
          <Button 
            variant="outline" 
            onClick={() => window.history.back()} 
            className="w-full h-12 text-lg font-medium hover:bg-gray-50"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const getStatusConfig = (status) => {
    switch (status?.toLowerCase()) {
      case "completed":
        return {
          color: "bg-gradient-to-r from-emerald-50 to-green-50 text-emerald-700 border-emerald-200",
          icon: Award,
          dot: "bg-emerald-500",
          glow: "shadow-emerald-200",
        }
      case "in progress":
        return {
          color: "bg-gradient-to-r from-blue-50 to-cyan-50 text-blue-700 border-blue-200",
          icon: Clock,
          dot: "bg-blue-500",
          glow: "shadow-blue-200",
        }
      case "pending":
        return {
          color: "bg-gradient-to-r from-amber-50 to-yellow-50 text-amber-700 border-amber-200",
          icon: Clock,
          dot: "bg-amber-500",
          glow: "shadow-amber-200",
        }
      default:
        return {
          color: "bg-gradient-to-r from-gray-50 to-slate-50 text-gray-700 border-gray-200",
          icon: FileText,
          dot: "bg-gray-500",
          glow: "shadow-gray-200",
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
    <div className="min-h-screen  bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Hero Section */}
      {/* <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 pt-12 pb-0">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="lg"
              onClick={() => window.history.back()}
              className="text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm rounded-xl"
            >
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
            <div className="h-6 w-px bg-gray-300"></div>
            <Badge 
              variant="outline" 
              className={`${statusConfig.color} ${statusConfig.glow} font-semibold text-sm px-4 py-2 rounded-full border-2`}
            >
              <div className={`w-3 h-3 rounded-full ${statusConfig.dot} mr-2 animate-pulse`}></div>
              <StatusIcon className="h-4 w-4 mr-1" />
              {project.status}
            </Badge>
          </div>
        </div>
      </div> */}

      {/* Main Content Layout with Left Sidebar for Back and Status */}
      <div className="max-w-7xl mx-auto px-4 pt-12 pb-12 flex flex-col lg:flex-row gap-8">
        {/* Left Sidebar: Back + Status */}
        <div className="flex flex-row lg:flex-col items-start gap-4 min-w-[160px] lg:min-w-[180px] mb-4 lg:mb-0">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => window.history.back()}
            className="text-gray-600 hover:text-gray-900 hover:bg-white/50 backdrop-blur-sm rounded-xl w-fit"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back
          </Button>
          <Badge 
            variant="outline" 
            className={`${statusConfig.color} ${statusConfig.glow} font-semibold text-sm px-4 py-2 rounded-full border-2 flex items-center gap-2`}
          >
            <div className={`w-3 h-3 rounded-full ${statusConfig.dot} animate-pulse`}></div>
            <StatusIcon className="h-4 w-4" />
            {project.status}
          </Badge>
        </div>
        {/* Main Content Area */}
        <div className="flex-1">
          {/* Project Gallery at Top */}
          {allImages.length > 0 && (
            <div className="pb-8">
              <Card className="overflow-hidden shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm">
                <CardHeader className="pb-6 bg-gradient-to-r from-gray-50 to-blue-50">
                  <CardTitle className="flex items-center gap-3 text-xl font-bold">
                    <div className="p-2 bg-blue-100 rounded-lg">
                      <ImageIcon className="h-6 w-6 text-blue-600" />
                    </div>
                    Project Gallery
                    <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 font-semibold">
                      {allImages.length} {allImages.length === 1 ? "Image" : "Images"}
                    </Badge>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-0">
                  <ImageCarousel images={allImages} title={project.title} />
                </CardContent>
              </Card>
            </div>
          )}
          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-3 gap-10">
            {/* Left/Main Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Project Title & Info */}
              <div className="mb-8">
                <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight bg-gradient-to-r from-gray-900 via-blue-900 to-indigo-900 bg-clip-text text-transparent">
                  {project.title}
                </h1>
                <div className="flex flex-wrap items-center gap-8 text-gray-600 mb-8">
                  {project.department && (
                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Building2 className="h-5 w-5 text-blue-600" />
                      <span className="font-semibold">{project.department}</span>
                    </div>
                  )}
                  {project.academicYear && (
                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Calendar className="h-5 w-5 text-green-600" />
                      <span className="font-semibold">{project.academicYear}</span>
                    </div>
                  )}
                  {Array.isArray(project.contributors) && (
                    <div className="flex items-center gap-3 bg-white/60 backdrop-blur-sm px-4 py-2 rounded-full">
                      <Users className="h-5 w-5 text-purple-600" />
                      <span className="font-semibold">
                        {project.contributors.length} contributor{project.contributors.length !== 1 ? "s" : ""}
                      </span>
                    </div>
                  )}
                </div>
                {/* Action Buttons */}
                <div className="flex flex-wrap gap-4 mb-4">
                  {project.sourceCodeUrl && (
                    <Button size="lg" className="bg-gradient-to-r from-gray-900 to-black hover:from-gray-800 hover:to-gray-900 text-white px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300">
                      <Code className="h-5 w-5 mr-3" />
                      View Source Code
                      <ExternalLink className="h-5 w-5 ml-3" />
                    </Button>
                  )}
                  <Button
                    variant="outline"
                    size="lg"
                    className="px-8 py-3 rounded-xl border-2 hover:bg-white/80 backdrop-blur-sm transition-all duration-300 relative"
                    onClick={handleShare}
                    type="button"
                  >
                    <Share2 className="h-5 w-5 mr-3" />
                    {copied ? "Copied!" : "Share Project"}
                  </Button>
                  {/* <Button variant="outline" size="lg" className="px-8 py-3 rounded-xl border-2 hover:bg-white/80 backdrop-blur-sm transition-all duration-300">
                    <Download className="h-5 w-5 mr-3" />
                    Download
                  </Button> */}
                </div>
              </div>
              {/* Contributors and Tags side by side */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Contributors */}
                {Array.isArray(project.contributors) && project.contributors.length > 0 && (
                  <Card className="shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-blue-50 to-cyan-50">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold">
                        <div className="p-2 bg-blue-100 rounded-lg">
                          <Users className="h-6 w-6 text-blue-600" />
                        </div>
                        Contributors
                        <Badge variant="secondary" className="ml-auto bg-blue-100 text-blue-700 font-semibold">
                          {project.contributors.length}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6 space-y-4">
                      {project.contributors.map((contributor, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-r from-gray-50 to-blue-50 hover:from-blue-50 hover:to-indigo-50 transition-all duration-300 border border-gray-100 hover:border-blue-200"
                        >
                          <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 via-purple-500 to-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                            {(contributor.name || contributor.email || "C").charAt(0).toUpperCase()}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-gray-900 text-lg">
                              {contributor.name || contributor.email || "Contributor"}
                            </p>
                            {contributor.role && <p className="text-sm text-gray-600 font-medium">{contributor.role}</p>}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>
                )}
                {/* Tags */}
                {Array.isArray(project.tags) && project.tags.length > 0 && (
                  <Card className="shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                    <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                      <CardTitle className="flex items-center gap-3 text-xl font-bold">
                        <div className="p-2 bg-purple-100 rounded-lg">
                          <Star className="h-6 w-6 text-purple-600" />
                        </div>
                        Tags
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="p-6">
                      <div className="flex flex-wrap gap-3">
                        {project.tags.map((tag, i) => (
                          <Badge
                            key={i}
                            variant="outline"
                            className="bg-gradient-to-r from-purple-50 to-pink-50 text-purple-700 border-purple-200 hover:from-purple-100 hover:to-pink-100 transition-all duration-300 font-semibold px-4 py-2 rounded-full"
                          >
                            #{tag}
                          </Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
              {/* Description */}
              {project.description && (
                <Card className="shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <FileText className="h-6 w-6 text-green-600" />
                      </div>
                      Description
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <p className="text-gray-700 leading-relaxed text-lg">{project.description}</p>
                  </CardContent>
                </Card>
              )}
              {/* Abstract */}
              {project.abstract && (
                <Card className="shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-purple-100 rounded-lg">
                        <Star className="h-6 w-6 text-purple-600" />
                      </div>
                      Abstract
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-8">
                    <p className="text-gray-700 leading-relaxed text-lg">{project.abstract}</p>
                  </CardContent>
                </Card>
              )}
            </div>
            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Overview */}
              <Card className="bg-white/80 backdrop-blur-sm border-white/20 shadow-2xl rounded-2xl overflow-hidden">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
                  <h3 className="font-bold text-xl mb-2">Project Overview</h3>
                  <p className="text-blue-100">Key information about this project</p>
                </div>
                <CardContent className="p-6 space-y-4">
                  {project.creator && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Creator</span>
                      <span className="font-semibold text-gray-900">
                        {project.creator.name || project.creator.email || "Unknown"}
                      </span>
                    </div>
                  )}
                  {project.department && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Department</span>
                      <span className="font-semibold text-gray-900">{project.department}</span>
                    </div>
                  )}
                  {project.academicYear && (
                    <div className="flex justify-between items-center p-3 bg-gray-50 rounded-xl">
                      <span className="text-gray-600 font-medium">Academic Year</span>
                      <span className="font-semibold text-gray-900">{project.academicYear}</span>
                    </div>
                  )}
                </CardContent>
              </Card>
              {/* Technologies */}
              {Array.isArray(project.technologiesUsed) && project.technologiesUsed.length > 0 && (
                <Card className="shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-orange-100 rounded-lg">
                        <Code className="h-6 w-6 text-orange-600" />
                      </div>
                      Technologies
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3">
                      {project.technologiesUsed.map((tech, i) => (
                        <Badge
                          key={i}
                          variant="secondary"
                          className="bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-700 border-blue-200 hover:from-blue-100 hover:to-indigo-100 transition-all duration-300 font-semibold px-4 py-2 rounded-full"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              )}
              {/* Categories */}
              {project.categories && project.categories.length > 0 && (
                <Card className="shadow-xl rounded-2xl border-0 bg-white/80 backdrop-blur-sm overflow-hidden">
                  <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
                    <CardTitle className="flex items-center gap-3 text-xl font-bold">
                      <div className="p-2 bg-green-100 rounded-lg">
                        <Globe className="h-6 w-6 text-green-600" />
                      </div>
                      Categories
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-6">
                    <div className="flex flex-wrap gap-3">
                      {project.categories.map((cat, i) => (
                        <Badge
                          key={i}
                          variant="outline"
                          className="bg-gradient-to-r from-green-50 to-emerald-50 text-green-700 border-green-200 hover:from-green-100 hover:to-emerald-100 transition-all duration-300 font-semibold px-4 py-2 rounded-full"
                        >
                          {cat}
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
    </div>
  )
}

export default ProjectDetail
