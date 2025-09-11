'use client'
import Navbar from './_components/Navbar'
import Feature from './_components/Feature'
import CTA from './_components/CTA'
import LoadingSpinner from './_components/LoadingSpinner'
import dynamic from 'next/dynamic';
const Hero = dynamic(() => import('./_components/Hero'), { 
  ssr: false, 
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <LoadingSpinner size="lg" />
        <p className="text-muted-foreground mt-4">Preparing your experience...</p>
      </div>
    </div>
  )
});
const AnimatedTestimonialsDemo = dynamic(() => import('./_components/AnimatedTestimonial'), { 
  ssr: false, 
  loading: () => (
    <div className="flex items-center justify-center py-20">
      <div className="text-center">
        <LoadingSpinner size="md" />
        <p className="text-muted-foreground mt-4">Loading testimonials...</p>
      </div>
    </div>
  )
});
import { TrendingUp } from 'lucide-react'



const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <Hero />
      <Feature />
      <div className="text-center mb-12 px-4">
  <h1 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight mb-4">
    Success Stories from Our Users
  </h1>
  <p className="text-muted-foreground text-base sm:text-lg max-w-2xl mx-auto">
    Hear from professionals how Elevate AI helped them navigate their career paths with clarity, speed, and confidence.
  </p>
</div>

<AnimatedTestimonialsDemo />

      <CTA />
      
      {/* Footer */}
      <footer className="border-t border-border/50 py-12">
        <div className="container mx-auto px-6">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                <span ><TrendingUp/></span>
              </div>
              <span className="text-xl font-bold">Elevate AI</span>
            </div>
            <div className="text-muted-foreground mb-6">
            Empowering careers with artificial intelligence
            
            </div>
            <p className='mb-5 text-muted-foreground'>
              Made with love 💗 by Harsh Rawat
            </p>
          
            <div className="mt-6 text-sm text-muted-foreground">
              © 2025 Elevate Ai. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;