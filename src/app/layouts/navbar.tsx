"use client"

  import Link from "next/link";
  import { NavigationMenu, NavigationMenuItem, NavigationMenuList } from "@/components/ui/navigation-menu";

  export default function Navbar() {
    return (
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b">
          <div className="container-max h-14 flex items-center justify-between relative">
            <Link href="/" className="font-bold text-lg">Semai</Link>
            <nav className="flex-1 flex justify-center">
              <NavigationMenu>
                <NavigationMenuList className="hidden sm:flex gap-6">
                  <NavigationMenuItem><Link href="#services">Services</Link></NavigationMenuItem>
                  <NavigationMenuItem><Link href="#work">Work</Link></NavigationMenuItem>
                  <NavigationMenuItem><Link href="#testimonials">Testimonials</Link></NavigationMenuItem>
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
            <Link href="#contact" className="hidden sm:block font-semibold px-4 py-2 rounded-xl border">Contact</Link>
          </div>
      </header>
    );
  }