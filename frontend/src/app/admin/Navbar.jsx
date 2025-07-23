import React from 'react'
import Link from "next/link";

const Navbar = () => {
  return (
    <nav className="bg-gray-700 text-white shadow-lg py-3 px-6 flex items-center justify-between">
      <div className="font-bold text-xl tracking-tight">HEYY ADMIN</div>
      <ul className="flex gap-6 text-base font-medium">
      <li>
          <Link href="/admin/admin-profile" className="hover:underline"> Profile</Link>
        </li>
        <li>
          <Link href="/admin" className="hover:underline">Dashboard</Link>
        </li>
         
        <li>
          <Link href="/admin/add-project" className="hover:underline">Add Project</Link>
        </li>
        <li>
          <Link href="/admin/manage-project" className="hover:underline">Manage Projects</Link>
        </li>
        <li>
          <Link href="/admin/manage-user" className="hover:underline">Manage Users</Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar;