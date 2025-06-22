
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Menu, X, Zap, Settings, User } from "lucide-react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Hub Principal", path: "/" },
    { name: "Ghost Cut", path: "/ghost-cut" },
    { name: "Ghost Up", path: "/ghost-up" },
    { name: "Dashboard", path: "/dashboard" },
  ];

  const isActive = (path: string) => location.pathname === path;

  return (
    <nav className="ghost-glass-strong sticky top-0 z-50 border-b border-white/10">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-ghost-gradient rounded-xl flex items-center justify-center">
              <Zap className="w-6 h-6 text-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-bold text-xl ghost-gradient-text">Ghost Loader</span>
              <span className="text-xs text-gray-400">Premium Hub</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item.path)
                    ? "text-[#00ff88]"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                {item.name}
                {isActive(item.path) && (
                  <div className="absolute -bottom-2 left-0 right-0 h-0.5 bg-ghost-gradient rounded-full" />
                )}
              </Link>
            ))}
          </div>

          {/* User Section */}
          <div className="hidden md:flex items-center space-x-4">
            <Badge className="ghost-badge-premium">
              Jonathan Edward
            </Badge>
            <Avatar className="w-8 h-8 border-2 border-[#00ff88]">
              <AvatarImage src="/placeholder.svg" alt="Jonathan Edward" />
              <AvatarFallback className="bg-[#00ff88] text-black text-xs font-bold">JE</AvatarFallback>
            </Avatar>
            <Button variant="ghost" size="sm" className="text-gray-300 hover:text-white">
              <Settings className="w-4 h-4" />
            </Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-300 hover:text-white"
            >
              {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-white/10">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`px-3 py-2 text-sm font-medium transition-colors ${
                    isActive(item.path)
                      ? "text-[#00ff88] bg-[#00ff88]/10 rounded-lg"
                      : "text-gray-300 hover:text-white hover:bg-white/5 rounded-lg"
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center space-x-3 px-3 py-2 mt-4 border-t border-white/10">
                <Avatar className="w-8 h-8 border-2 border-[#00ff88]">
                  <AvatarImage src="/placeholder.svg" alt="Jonathan Edward" />
                  <AvatarFallback className="bg-[#00ff88] text-black text-xs font-bold">JE</AvatarFallback>
                </Avatar>
                <div className="flex flex-col">
                  <span className="text-sm font-medium text-white">Jonathan Edward</span>
                  <span className="text-xs text-gray-400">Premium User</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
