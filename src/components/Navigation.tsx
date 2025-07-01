
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Book, User, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

export const Navigation = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/", icon: Book },
    { name: "Chat", path: "/chat", icon: Book },
    { name: "Pricing", path: "/pricing", icon: Book },
    { name: "Schools", path: "/schools", icon: Book },
  ];

  const handleSignIn = () => {
    alert("Sign in functionality will be implemented when you connect to Supabase for authentication!");
  };

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden md:flex items-center justify-between p-4 lg:px-8 bg-black shadow-sm border-b border-primary">
        <div className="flex items-center space-x-2">
          <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
            <Book className="w-6 h-6 text-black" />
          </div>
          <span className="text-xl font-bold text-white">Homework Helper</span>
        </div>
        
        <div className="flex items-center space-x-6">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                location.pathname === item.path ? "text-primary" : "text-white"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Button variant="outline" size="sm" onClick={handleSignIn} className="border-primary text-white hover:bg-primary hover:text-black">
            <User className="w-4 h-4 mr-2" />
            Sign In
          </Button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="md:hidden bg-black shadow-sm border-b border-primary">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Book className="w-5 h-5 text-black" />
            </div>
            <span className="text-lg font-bold text-white">Homework Helper</span>
          </div>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-white hover:bg-primary hover:text-black"
          >
            {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="border-t border-primary bg-black px-4 py-2 animate-slide-up">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block py-3 text-sm font-medium transition-colors hover:text-primary ${
                  location.pathname === item.path ? "text-primary" : "text-white"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-2 border-t border-primary mt-2">
              <Button variant="outline" size="sm" className="w-full border-primary text-white hover:bg-primary hover:text-black" onClick={handleSignIn}>
                <User className="w-4 h-4 mr-2" />
                Sign In
              </Button>
            </div>
          </div>
        )}
      </nav>

      {/* Bottom Mobile Navigation */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-black border-t border-primary z-50">
        <div className="flex items-center justify-around py-2">
          {navItems.slice(0, 4).map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  isActive ? "text-primary bg-primary/10" : "text-white"
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="text-xs mt-1">{item.name}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </>
  );
};
