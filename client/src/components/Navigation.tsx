import { Link, useLocation } from "wouter";
import { Cpu, LayoutDashboard, Menu, X } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import logo from '@assets/logo.meechain_1768537047159.png';

 export function Navigation() {
  const [location] = useLocation();
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { href: "/", label: "Home", icon: Cpu },
    { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/5 bg-background/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="relative w-8 h-8">
            <img 
              src={logo} 
              alt="MeeChain Logo" 
              className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-110" 
            />
          </div>
          <span className="font-display font-bold text-xl tracking-tight text-white group-hover:text-primary transition-colors">
            MeeChain
          </span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link 
              key={link.href} 
              href={link.href}
              className={`
                text-sm font-medium transition-colors hover:text-primary flex items-center gap-2
                ${location === link.href ? "text-primary" : "text-muted-foreground"}
              `}
            >
              <link.icon className="w-4 h-4" />
              {link.label}
            </Link>
          ))}
          <Button 
            asChild
            variant="default" 
            className="bg-primary hover:bg-primary/90 text-white font-medium shadow-lg shadow-primary/20"
          >
            <Link href="/dashboard">Launch App</Link>
          </Button>
        </nav>

        {/* Mobile Nav */}
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild className="md:hidden">
            <Button variant="ghost" size="icon" className="text-muted-foreground">
              <Menu className="w-6 h-6" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="bg-card border-l border-white/10 w-[80vw] sm:w-[350px]">
            <div className="flex flex-col gap-8 mt-8">
              <div className="flex items-center gap-2 mb-4">
                 <img src={logo} alt="Logo" className="w-8 h-8" />
                 <span className="font-display font-bold text-xl">MeeChain</span>
              </div>
              
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link 
                    key={link.href} 
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`
                      text-lg font-medium p-4 rounded-xl transition-all
                      ${location === link.href 
                        ? "bg-primary/10 text-primary border border-primary/20" 
                        : "text-muted-foreground hover:bg-white/5 hover:text-white"}
                    `}
                  >
                    <div className="flex items-center gap-3">
                      <link.icon className="w-5 h-5" />
                      {link.label}
                    </div>
                  </Link>
                ))}
              </div>

              <div className="mt-auto">
                <Button className="w-full bg-gradient-to-r from-primary to-purple-600 h-12 text-lg">
                  Connect Wallet
                </Button>
              </div>
            </div>
          </SheetContent>
        </Sheet>
      </div>
    </header>
  );
}
