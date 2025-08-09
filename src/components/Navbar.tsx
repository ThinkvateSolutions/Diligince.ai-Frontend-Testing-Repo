import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navLinkClass = (path: string) =>
    `text-white hover:text-blue-100 transition-colors ${
      location.pathname === path ? "text-blue-100 font-medium border-b border-blue-100" : ""
    }`;

  return (
    <nav
      className={`fixed top-0 z-50 w-full py-4 px-4 md:px-8 transition-all duration-300 ${
        scrolled ? "bg-blue-600 shadow-md" : "bg-blue-600"
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-white tracking-wide">
          Diligince.ai
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center space-x-6">
          <Link to="/" className={navLinkClass("/")}>Home</Link>
          <Link to="/about" className={navLinkClass("/about")}>About</Link>
          <Link to="/pricing" className={navLinkClass("/pricing")}>Pricing</Link>
          <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>

          <Button
            variant="outline"
            className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
            asChild
          >
            <Link to="/signin">Sign In</Link>
          </Button>
          <Button
            className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
            asChild
          >
            <Link to="/signup">Sign Up</Link>
          </Button>
        </div>

        {/* Mobile Menu Icon */}
        <div className="md:hidden">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsOpen(!isOpen)}
            className="text-white hover:bg-blue-700"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-blue-600 shadow-md border-t border-blue-500 animate-fade-in-down">
          <div className="flex flex-col px-4 py-5 space-y-3">
            <Link to="/" className={navLinkClass("/")}>Home</Link>
            <Link to="/about" className={navLinkClass("/about")}>About</Link>
            <Link to="/pricing" className={navLinkClass("/pricing")}>Pricing</Link>
            <Link to="/contact" className={navLinkClass("/contact")}>Contact</Link>

            <div className="flex flex-col space-y-2 mt-4">
              <Button
                variant="outline"
                className="bg-transparent border-white text-white hover:bg-white hover:text-blue-600"
                asChild
              >
                <Link to="/signin">Log In</Link>
              </Button>
              <Button
                className="bg-white text-blue-600 hover:bg-blue-50 hover:text-blue-700"
                asChild
              >
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
