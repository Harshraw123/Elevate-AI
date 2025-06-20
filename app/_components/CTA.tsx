
import { Button } from "@/components/ui/button";
import { ArrowDown } from "lucide-react";

const CTA = () => {
  return (
    <section className="py-24 relative overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 w-64 h-64 gradient-accent rounded-full blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 right-1/4 w-48 h-48 gradient-secondary rounded-full blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-6xl font-bold mb-8">
            Ready to <span className="text-gradient">Transform</span>
            <br />
            Your Career?
          </h2>
          
          <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
            Join thousands of professionals who have accelerated their career growth 
            with our AI-powered career coaching platform.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              size="lg" 
              className="gradient-primary text-white hover:opacity-90 transition-all duration-300 transform hover:scale-105 px-10 py-5 text-xl font-semibold glow-box"
            >
              <ArrowDown className="mr-3 h-6 w-6" />
              START YOUR JOURNEY
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-border hover:bg-accent px-10 py-5 text-xl"
            >
              Watch Demo
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">10,000+</div>
              <div className="text-muted-foreground">Resumes Analyzed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">95%</div>
              <div className="text-muted-foreground">Success Rate</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-gradient mb-2">24/7</div>
              <div className="text-muted-foreground">AI Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTA;