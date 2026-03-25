"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X, Search, Clapperboard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ModeToggle } from "../Navbar/ModeToggle";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Movies", href: "/movies" },
    { name: "Series", href: "/series" },
    { name: "Pricing", href: "/pricing" },
    // { name: "Dashboard", href: "/dashboard" },
  ];

  const user = useSelector((state: any) => state?.auth?.user) || null;

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }
  return (
    <nav className="sticky top-0 z-50 w-full border-b border-white/10 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2 group">
              <Clapperboard className="h-7 w-7 text-primary transition-transform group-hover:scale-110" />
              <span className="text-xl font-bold tracking-tighter uppercase">
                Movie<span className="text-primary">Portal</span>
              </span>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Register
                </Link>
              </>
            )}

            <ModeToggle />
          </div>

          <div className="flex md:hidden items-center gap-2">
            <ModeToggle />
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden border-t border-white/10 bg-background px-4 py-6 space-y-4 animate-in slide-in-from-top-5 duration-300">
          <div className="space-y-2">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="block text-lg font-medium text-muted-foreground hover:text-primary px-2 py-2 rounded-md hover:bg-secondary/50"
              >
                {link.name}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3 pt-4 border-t border-white/5">
            {user ? (
              <Link
                href="/dashboard"
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
              >
                Dashboard
              </Link>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Login
                </Link>

                <Link
                  href="/register"
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                >
                  Register
                </Link>
              </>
            )}

            <Button
              className="w-full bg-primary cursor-pointer"
              onClick={() => setIsOpen(false)}
            >
              Get Started
            </Button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
