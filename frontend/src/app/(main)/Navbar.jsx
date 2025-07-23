"use client"

import { useState, useContext } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { GraduationCap, Menu, Search } from "lucide-react"
import { AuthContext } from "@/context/AppContext"

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { authToken, logout } = useContext(AuthContext)

  const navItems = [
    { name: "Home", href: "/" },
    { name: "Projects", href: "/browse-project" },
    { name: "Categories", href: "/categories" },
    { name: "Students", href: "/students" },
    { name: "About", href: "/about" },
    { name: "Add Project", href: "/new-project-add" }, // Added new project link
  ]

  return (
    <header className="sticky top-0 z-50 w-full  border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-10 flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <GraduationCap className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">ProjectHub</span>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            College
          </Badge>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          {navItems.map((item) => (
            <Link key={item.name} href={item.href} className="text-sm font-medium transition-colors hover:text-primary">
              {item.name}
            </Link>
          ))}
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center space-x-4">
          <Button variant="ghost" size="sm">
            <Search className="h-4 w-4" />
          </Button>
          {authToken ? (
            <div className="flex items-center space-x-2">
              <Link href="/user/profile" className="flex items-center space-x-2">
                <Avatar>
                  <AvatarImage src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="User Avatar" />
                  <AvatarFallback>U</AvatarFallback>
                </Avatar>
                <Badge variant="secondary">Student</Badge>
              </Link>
              <Button variant="outline" size="sm" onClick={logout}>
                Logout
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        {/* Mobile Navigation */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="sm">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-[300px] sm:w-[400px]">
            <div className="flex flex-col space-y-4 mt-6">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-lg font-medium transition-colors hover:text-primary"
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex flex-col space-y-2 pt-4 border-t">
                {authToken ? (
                  <div className="flex items-center space-x-2">
                    <Link href="/user/profile" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
                      <Avatar>
                        <AvatarImage src="https://images.unsplash.com/photo-1510706019500-d23a509eecd4?auto=format&fit=facearea&facepad=3&w=320&h=320&q=80" alt="User Avatar" />
                        <AvatarFallback>U</AvatarFallback>
                      </Avatar>
                      <Badge variant="secondary">Student</Badge>
                    </Link>
                    <Button variant="outline" className="justify-start bg-transparent" onClick={() => { logout(); setIsOpen(false); }}>
                      Logout
                    </Button>
                  </div>
                ) : (
                  <Link href="/login" onClick={() => setIsOpen(false)}>
                    <Button variant="outline" className="justify-start bg-transparent">
                      Login
                    </Button>
                  </Link>
                )}
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  )
}
