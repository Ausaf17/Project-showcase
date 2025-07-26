"use client"

import { useState, useContext } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { GraduationCap, Menu, Search, Sparkles, BookOpen, Plus } from "lucide-react"
import { AuthContext } from "@/context/AppContext"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { authToken, logout } = useContext(AuthContext)

  const navItems = [
    { name: "Home", href: "/", icon: Sparkles },
    { name: "Projects", href: "/browse-project", icon: BookOpen },
    { name: "Add Project", href: "/new-project-add", icon: Plus },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-primary/10 bg-background/95 backdrop-blur-xl supports-[backdrop-filter]:bg-background/80 shadow-sm">
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-secondary rounded-lg blur opacity-20 group-hover:opacity-40 transition-opacity duration-300"></div>
              <div className="relative bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                <GraduationCap className="h-6 w-6 text-white" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Project Hub
              </span>
              <Badge variant="secondary" className="hidden sm:inline-flex w-fit text-xs">
                College Innovation
              </Badge>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              return (
                <Link 
                  key={item.name} 
                  href={item.href} 
                  className="flex items-center space-x-2 px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 hover:bg-primary/10 hover:text-primary group"
                >
                  <Icon className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
                  <span>{item.name}</span>
                </Link>
              )
            })}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center space-x-3">
            <Button variant="ghost" size="sm" className="relative group">
              <Search className="h-4 w-4 group-hover:scale-110 transition-transform duration-200" />
              <div className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </Button>
            
            {authToken ? (
              <div className="flex items-center space-x-3">
                <Link href="/user/profile" className="flex items-center space-x-3 p-2 rounded-lg hover:bg-primary/10 transition-colors duration-200 group">
                  <Avatar className="h-8 w-8 ring-2 ring-primary/20 group-hover:ring-primary/40 transition-all duration-200">
                    <AvatarImage src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="User Avatar" />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white font-semibold">U</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col items-start">
                    <Badge variant="secondary" className="text-xs font-medium">Student</Badge>
                    <span className="text-xs text-muted-foreground">Profile</span>
                  </div>
                </Link>
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={logout}
                  className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Link href="/login">
                <Button 
                  variant="outline" 
                  size="sm"
                  className="border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200"
                >
                  Login
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Navigation */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="sm" className="relative group">
                <Menu className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                <div className="absolute inset-0 bg-primary/5 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[320px] sm:w-[400px] bg-background/95 backdrop-blur-xl">
              <div className="flex flex-col space-y-6 mt-8">
                <div className="flex items-center space-x-3 pb-4 border-b border-primary/10">
                  <div className="bg-gradient-to-r from-primary to-secondary p-2 rounded-lg">
                    <GraduationCap className="h-5 w-5 text-white" />
                  </div>
                  <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                    ProjectHub
                  </span>
                </div>
                
                {navItems.map((item) => {
                  const Icon = item.icon
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className="flex items-center space-x-3 text-lg font-medium transition-all duration-200 hover:text-primary group"
                      onClick={() => setIsOpen(false)}
                    >
                      <Icon className="h-5 w-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>{item.name}</span>
                    </Link>
                  )
                })}
                
                <div className="flex flex-col space-y-4 pt-6 border-t border-primary/10">
                  {authToken ? (
                    <div className="flex flex-col space-y-3">
                      <Link href="/user/profile" className="flex items-center space-x-3 p-3 rounded-lg hover:bg-primary/10 transition-colors duration-200" onClick={() => setIsOpen(false)}>
                        <Avatar className="h-10 w-10 ring-2 ring-primary/20">
                          <AvatarImage src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="User Avatar" />
                          <AvatarFallback className="bg-gradient-to-r from-primary to-secondary text-white font-semibold">U</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <Badge variant="secondary" className="w-fit text-sm font-medium">Student</Badge>
                          <span className="text-sm text-muted-foreground">View Profile</span>
                        </div>
                      </Link>
                      <Button 
                        variant="outline" 
                        className="justify-start bg-transparent border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200" 
                        onClick={() => { logout(); setIsOpen(false); }}
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Link href="/login" onClick={() => setIsOpen(false)}>
                      <Button 
                        variant="outline" 
                        className="justify-start bg-transparent border-primary/20 hover:border-primary/40 hover:bg-primary/5 transition-all duration-200 w-full"
                      >
                        Login
                      </Button>
                    </Link>
                  )}
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
