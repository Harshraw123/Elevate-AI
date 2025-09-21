
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";
import Link from "next/link";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 bg-gradient-to-br from-pink-500 to-rose-600 rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 bg-gradient-to-br from-green-500 to-teal-600 rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Transform</span>
            <br />
            Your Career?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their career growth 
            with our AI-powered career coaching platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
           <Link href={'/dashboard'}> <Button 
              size="lg" 
              className="bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 px-10 py-5 text-xl font-semibold shadow-lg"
            >
              <ArrowDown className="mr-3 h-6 w-6" />
              START YOUR JOURNEY
            </Button>
            </Link>
          <Link href={'/dashboard'}>  <Button 
              size="lg" 
              variant="outline" 
              className="border-border hover:bg-accent px-10 py-5 text-xl font-bold"
            >
             Try for free
            </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent mb-2">10,000+</div>
              <div className="text-muted-foreground">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-green-500 to-teal-600 bg-clip-text text-transparent mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold bg-gradient-to-r from-pink-500 to-rose-600 bg-clip-text text-transparent mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;