import React from "react";
import Link from "next/link";
import {
  Facebook,
  Twitter,
  Instagram,
  Youtube,
  Mail,
  Phone,
} from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const Footer = () => {
  return (
    <footer className="bg-slate-50 dark:bg-black/40 border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Info */}
          <div className="space-y-4">
            <Link
              href="/"
              className="text-2xl font-black tracking-tighter text-primary"
            >
              MOVIE-
              <span className="text-slate-900 dark:text-white">PORTAL</span>
            </Link>
            <p className="text-muted-foreground text-sm leading-relaxed">
              The ultimate destination for movie lovers. Experience high-quality
              streaming, detailed ratings, and an extensive library of
              world-class cinema.
            </p>
            <div className="flex items-center gap-4">
              <Link
                href="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Facebook size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Twitter size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Instagram size={18} />
              </Link>
              <Link
                href="#"
                className="p-2 rounded-full bg-primary/10 text-primary hover:bg-primary hover:text-white transition-all"
              >
                <Youtube size={18} />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-bold text-lg mb-6">Quick Links</h4>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li>
                <Link
                  href="/movies"
                  className="hover:text-primary transition-colors"
                >
                  Browse Movies
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className="hover:text-primary transition-colors"
                >
                  Subscription Plans
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="hover:text-primary transition-colors"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="hover:text-primary transition-colors"
                >
                  Contact Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-bold text-lg mb-6">Contact Us</h4>
            <ul className="space-y-4 text-sm text-muted-foreground">
              <li className="flex items-center gap-3">
                <Mail size={16} className="text-primary" />
                <span>support@movieportal.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={16} className="text-primary" />
                <span>+880 1234 567 890</span>
              </li>
              <li className="text-xs italic mt-4">
                Available for 24/7 technical support for Premium Members.
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="font-bold text-lg mb-6">Newsletter</h4>
            <p className="text-sm text-muted-foreground mb-4">
              Get updates on new releases and upcoming series.
            </p>
            <div className="flex flex-col gap-3">
              <Input
                placeholder="Enter your email"
                className="bg-background border-border rounded-xl"
              />
              <Button className="w-full rounded-xl font-bold shadow-lg shadow-primary/20">
                Subscribe
              </Button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© 2026 MoviePortal. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="#" className="hover:text-primary">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-primary">
              Terms of Service
            </Link>
            <Link href="#" className="hover:text-primary">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
