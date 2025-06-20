
import { Button } from "@/components/ui/button";
import { UserButton } from "@clerk/nextjs";
import { TrendingUp } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border/50">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm"><TrendingUp/></span>
            </div>
            <span className="text-xl font-bold text-foreground">Elevate AI</span>
          </div>
          
        

          <UserButton/>
        </div>
      </div>
    </header>
  );
};

export default Header;