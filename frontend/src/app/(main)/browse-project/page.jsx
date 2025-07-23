"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import { ProjectCard } from "@/components/project-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Grid3X3, List, Users, BookOpen, TrendingUp, RefreshCw, X } from "lucide-react"

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

const statuses = ["Ongoing", "Completed", "Archived", "Pending Approval"]
const academicYears = ["2024-25", "2023-24", "2022-23", "2021-22", "2020-21"]

export default function BrowseProject() {
	const [projectList, setProjectList] = useState([])
	const [filteredProjects, setFilteredProjects] = useState([])
	const [searchQuery, setSearchQuery] = useState("")
	const [categoryFilter, setCategoryFilter] = useState("all")
	const [statusFilter, setStatusFilter] = useState("all")
	const [yearFilter, setYearFilter] = useState("all")
	const [sortBy, setSortBy] = useState("newest")
	const [viewMode, setViewMode] = useState("grid")
	const [isLoading, setIsLoading] = useState(true)
	const [activeFilters, setActiveFilters] = useState([])

	// Fetch projects from the backend
	const fetchProjects = async () => {
		setIsLoading(true)
		try {
			const res = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/project/getall`)
			setProjectList(res.data)
			console.log(res.data);
			
			setFilteredProjects(res.data)
		} catch (error) {
			console.error("Error fetching projects:", error)
		} finally {
			setIsLoading(false)
		}
	}

	useEffect(() => {
		fetchProjects()
	}, [])

	// Update active filters
	useEffect(() => {
		const filters = []
		if (searchQuery) filters.push(`Search: "${searchQuery}"`)
		if (categoryFilter !== "all") filters.push(`Category: ${categoryFilter}`)
		if (statusFilter !== "all") filters.push(`Status: ${statusFilter}`)
		if (yearFilter !== "all") filters.push(`Year: ${yearFilter}`)
		setActiveFilters(filters)
	}, [searchQuery, categoryFilter, statusFilter, yearFilter])

	// Filter and sort projects
	useEffect(() => {
		let filtered = [...projectList]

		// Apply search filter
		if (searchQuery) {
			filtered = filtered.filter(
				(project) =>
					project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
					project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
					project.abstract.toLowerCase().includes(searchQuery.toLowerCase()) ||
					project.contributors.some((contributor) => contributor.toLowerCase().includes(searchQuery.toLowerCase())) ||
					project.technologiesUsed.some((tech) => tech.toLowerCase().includes(searchQuery.toLowerCase()))
			)
		}

		// Apply filters
		if (categoryFilter !== "all") {
			filtered = filtered.filter((project) => project.department === categoryFilter)
		}
		if (statusFilter !== "all") {
			filtered = filtered.filter((project) => project.status === statusFilter)
		}
		if (yearFilter !== "all") {
			filtered = filtered.filter((project) => project.academicYear === yearFilter)
		}

		// Apply sorting
		filtered.sort((a, b) => {
			switch (sortBy) {
				case "newest":
					return new Date(b.createdAt || "").getTime() - new Date(a.createdAt || "").getTime()
				case "oldest":
					return new Date(a.createdAt || "").getTime() - new Date(b.createdAt || "").getTime()
				case "title-asc":
					return a.title.localeCompare(b.title)
				case "title-desc":
					return b.title.localeCompare(a.title)
				default:
					return 0
			}
		})

		setFilteredProjects(filtered)
	}, [searchQuery, categoryFilter, statusFilter, yearFilter, sortBy, projectList])

	const clearAllFilters = () => {
		setSearchQuery("")
		setCategoryFilter("all")
		setStatusFilter("all")
		setYearFilter("all")
	}

	const removeFilter = (filterText) => {
		if (filterText.startsWith("Search:")) setSearchQuery("")
		else if (filterText.startsWith("Category:")) setCategoryFilter("all")
		else if (filterText.startsWith("Status:")) setStatusFilter("all")
		else if (filterText.startsWith("Year:")) setYearFilter("all")
	}

	const getStatusStats = () => {
		const stats = statuses.map((status) => ({
			status,
			count: projectList.filter((p) => p.status === status).length,
		}))
		return stats
	}

	const getCategoryStats = () => {
		const stats = categories
			.map((cat) => ({
				category: cat,
				count: projectList.filter((p) => p.department === cat).length,
			}))
			.filter((stat) => stat.count > 0)
		return stats
	}

	return (
		<div className="min-h-screen bg-background">
			{/* Enhanced Header */}
			<header className="bg-gradient-to-r from-primary via-primary/90 to-secondary py-12 shadow-lg">
				<div className="max-w-7xl mx-auto px-6">
					<div className="text-center text-primary-foreground">
						<h1 className="text-4xl md:text-6xl font-bold mb-4">Explore Projects</h1>
						<p className="text-xl md:text-2xl opacity-90 mb-6 max-w-3xl mx-auto">
							Discover innovative projects from talented students across all engineering departments
						</p>
						<div className="flex flex-wrap justify-center gap-4 text-sm">
							<div className="flex items-center gap-2">
								<BookOpen className="h-4 w-4" />
								<span>{projectList.length} Projects</span>
							</div>
							<div className="flex items-center gap-2">
								<Users className="h-4 w-4" />
								<span>{categories.length} Categories</span>
							</div>
							<div className="flex items-center gap-2">
								<TrendingUp className="h-4 w-4" />
								<span>Updated Daily</span>
							</div>
						</div>
					</div>
				</div>
			</header>

			<main className="max-w-7xl mx-auto px-6 py-8">
				{/* Search and Filter Section */}
				<Card className="mb-8">
					<CardContent className="p-6">
						<div className="space-y-6">
							{/* Search Bar */}
							<div className="relative">
								<Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
								<Input
									type="text"
									placeholder="Search projects, contributors, technologies..."
									value={searchQuery}
									onChange={(e) => setSearchQuery(e.target.value)}
									className="pl-10 h-12 text-base"
								/>
							</div>

							{/* Filters Row */}
							<div className="grid grid-cols-1 md:grid-cols-4 gap-4">
								<Select value={categoryFilter} onValueChange={setCategoryFilter}>
									<SelectTrigger>
										<SelectValue placeholder="All Categories" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Categories</SelectItem>
										{categories.map((cat) => (
											<SelectItem key={cat} value={cat}>
												{cat}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select value={statusFilter} onValueChange={setStatusFilter}>
									<SelectTrigger>
										<SelectValue placeholder="All Statuses" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Statuses</SelectItem>
										{statuses.map((status) => (
											<SelectItem key={status} value={status}>
												{status}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select value={yearFilter} onValueChange={setYearFilter}>
									<SelectTrigger>
										<SelectValue placeholder="All Years" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="all">All Years</SelectItem>
										{academicYears.map((year) => (
											<SelectItem key={year} value={year}>
												{year}
											</SelectItem>
										))}
									</SelectContent>
								</Select>

								<Select value={sortBy} onValueChange={setSortBy}>
									<SelectTrigger>
										<SelectValue placeholder="Sort by" />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value="newest">Newest First</SelectItem>
										<SelectItem value="oldest">Oldest First</SelectItem>
										<SelectItem value="title-asc">Title A-Z</SelectItem>
										<SelectItem value="title-desc">Title Z-A</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Active Filters */}
							{activeFilters.length > 0 && (
								<div className="flex flex-wrap gap-2 items-center">
									<span className="text-sm text-muted-foreground">Active filters:</span>
									{activeFilters.map((filter, index) => (
										<Badge
											key={index}
											variant="secondary"
											className="cursor-pointer hover:bg-destructive hover:text-destructive-foreground"
											onClick={() => removeFilter(filter)}
										>
											{filter}
											<X className="h-3 w-3 ml-1" />
										</Badge>
									))}
									<Button
										variant="ghost"
										size="sm"
										onClick={clearAllFilters}
										className="text-muted-foreground hover:text-foreground"
									>
										Clear all
									</Button>
								</div>
							)}
						</div>
					</CardContent>
				</Card>

				{/* Results Header */}
				<div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
					<div>
						<h2 className="text-2xl font-semibold">
							{filteredProjects.length} Project{filteredProjects.length !== 1 ? "s" : ""} Found
						</h2>
						<p className="text-muted-foreground">
							{activeFilters.length > 0 ? "Filtered results" : "Showing all projects"}
						</p>
					</div>

					<div className="flex items-center gap-2">
						<Button variant="ghost" size="sm" onClick={fetchProjects} disabled={isLoading}>
							<RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
							Refresh
						</Button>

						<div className="flex items-center border rounded-md">
							<Button
								variant={viewMode === "grid" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("grid")}
								className="rounded-r-none"
							>
								<Grid3X3 className="h-4 w-4" />
							</Button>
							<Button
								variant={viewMode === "list" ? "default" : "ghost"}
								size="sm"
								onClick={() => setViewMode("list")}
								className="rounded-l-none"
							>
								<List className="h-4 w-4" />
							</Button>
						</div>
					</div>
				</div>

				{/* Loading State */}
				{isLoading ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
						{[...Array(6)].map((_, i) => (
							<Card key={i} className="animate-pulse">
								<div className="aspect-video bg-muted" />
								<CardContent className="p-4 space-y-3">
									<div className="h-4 bg-muted rounded w-3/4" />
									<div className="h-3 bg-muted rounded w-full" />
									<div className="h-3 bg-muted rounded w-2/3" />
								</CardContent>
							</Card>
						))}
					</div>
				) : (
					/* Project Grid */
					<div
						className={`grid gap-6 ${
							viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"
						}`}
					>
						{filteredProjects.map((project) => (
							<ProjectCard
								key={project._id}
								_id={project._id}
								title={project.title}
								description={project.description}
								abstract={project.abstract}
								contributors={project.contributors}
								technologiesUsed={project.technologiesUsed}
								tags={project.tags}
								sourceCodeUrl={project.sourceCodeUrl}
								thumbnailUrl={project.thumbnailUrl}
								academicYear={project.academicYear}
								status={project.status}
								creator={project.creator}
								categories={project.categories}
							/>
						))}
					</div>
				)}

				{/* Empty State */}
				{!isLoading && filteredProjects.length === 0 && (
					<Card className="text-center py-12">
						<CardContent>
							<BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
							<h3 className="text-xl font-semibold mb-2">No projects found</h3>
							<p className="text-muted-foreground mb-4">Try adjusting your search criteria or filters</p>
							<Button onClick={clearAllFilters} variant="outline">
								Clear all filters
							</Button>
						</CardContent>
					</Card>
				)}

				{/* Quick Stats */}
				{!isLoading && projectList.length > 0 && (
					<div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8">
						<Card>
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4 flex items-center gap-2">
									<TrendingUp className="h-4 w-4" />
									Projects by Status
								</h3>
								<div className="space-y-2">
									{getStatusStats().map((stat) => (
										<div key={stat.status} className="flex justify-between items-center">
											<span className="text-sm">{stat.status}</span>
											<Badge variant="outline">{stat.count}</Badge>
										</div>
									))}
								</div>
							</CardContent>
						</Card>

						<Card>
							<CardContent className="p-6">
								<h3 className="font-semibold mb-4 flex items-center gap-2">
									<Users className="h-4 w-4" />
									Active Categories
								</h3>
								<div className="space-y-2">
									{getCategoryStats()
										.slice(0, 5)
										.map((stat) => (
											<div key={stat.category} className="flex justify-between items-center">
												<span className="text-sm truncate">{stat.category}</span>
												<Badge variant="outline">{stat.count}</Badge>
											</div>
										))}
								</div>
							</CardContent>
						</Card>
					</div>
				)}
			</main>
		</div>
	)
}
