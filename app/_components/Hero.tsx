"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useCallback } from "react";

interface GSAPModule {
  gsap: any;
  ScrollTrigger: any;
}

interface ParticleElement extends HTMLDivElement {
  style: CSSStyleDeclaration;
}

let gsap: any = null;
let ScrollTrigger: any = null;

const loadGSAP = async (): Promise<GSAPModule> => {
  if (typeof window !== 'undefined' && !gsap) {
    const gsapModule = await import('gsap');
    const scrollTriggerModule = await import('gsap/ScrollTrigger');
    gsap = gsapModule.gsap;
    ScrollTrigger = scrollTriggerModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
  }
  return { gsap, ScrollTrigger };
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const blob1Ref = useRef<HTMLDivElement>(null);
  const blob2Ref = useRef<HTMLDivElement>(null);
  const blob3Ref = useRef<HTMLDivElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<HTMLDivElement>(null);

  const initAnimations = useCallback(async (): Promise<(() => void) | void> => {
    if (typeof window === 'undefined') return;
    const { gsap: g, ScrollTrigger: ST } = await loadGSAP();
    if (!g || !ST) return;

    const ctx = g.context(() => {
      // Set initial states with null checks
      const textElements = [titleRef.current, subtitleRef.current, ctaRef.current].filter(Boolean);
      if (textElements.length > 0) {
        g.set(textElements, {
          opacity: 0,
          y: 50
        });
      }
      
      if (badgeRef.current) {
        g.set(badgeRef.current, { opacity: 0, y: 50 });
      }
      
      if (imageRef.current) {
        g.set(imageRef.current, {
          opacity: 0,
          scale: 0.8,
          rotationX: 15
        });
      }

      // Floating blobs with morphing
      if (blob1Ref.current) {
        g.to(blob1Ref.current, {
          x: "random(-50, 50)",
          y: "random(-30, 30)",
          scale: "random(0.8, 1.2)",
          rotation: 360,
          duration: "random(8, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }

      if (blob2Ref.current) {
        g.to(blob2Ref.current, {
          x: "random(-40, 40)",
          y: "random(-30, 30)",
          scale: "random(0.9, 1.3)",
          rotation: -360,
          duration: "random(10, 15)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 1
        });
      }

      if (blob3Ref.current) {
        g.to(blob3Ref.current, {
          x: "random(-45, 45)",
          y: "random(-20, 20)",
          scale: "random(0.7, 1.1)",
          rotation: 360,
          duration: "random(12, 18)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 2
        });
      }

      // Main entrance timeline
      const tl = g.timeline({
        delay: 0.5,
        onComplete: () => {
          // Floating animation removed as requested.
        }
      });

      if (badgeRef.current) {
        tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" });
      }
      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 1, ease: "power3.out" }, "-=0.3");
      }
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }, "-=0.5");
      }
      if (ctaRef.current) {
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.8, ease: "back.out(1.7)" }, "-=0.4");
      }
      if (imageRef.current) {
        tl.to(imageRef.current, {
          opacity: 1,
          scale: 1,
          rotationX: 0,
          duration: 1.2,
          ease: "power2.out"
        }, "-=0.6");
      }

      // ScrollTrigger for parallax and fade effects (excluding badge)
      ST.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self: { progress: number }) => {
          const progress = self.progress;
          if (imageRef.current) {
            g.set(imageRef.current, {
              y: progress * 100,
              scale: 1 + progress * 0.1,
              rotationX: progress * 10
            });
          }
          if (titleRef.current) {
            g.set(titleRef.current, {
              scale: 1 - progress * 0.2,
              opacity: 1 - progress * 0.8,
              y: -progress * 50
            });
          }
          if (subtitleRef.current) {
            g.set(subtitleRef.current, {
              opacity: 1 - progress * 1.2,
              y: -progress * 30
            });
          }
          if (ctaRef.current) {
            g.set(ctaRef.current, {
              opacity: 1 - progress * 1.5,
              y: -progress * 40
            });
          }
          const blobs = [blob1Ref.current, blob2Ref.current, blob3Ref.current].filter(Boolean);
          if (blobs.length > 0) {
            g.set(blobs, {
              scale: 1 + progress * 0.5,
              opacity: 0.3 - progress * 0.2
            });
          }
        }
      });

      // Magnetic button effect
      const buttons = ctaRef.current?.querySelectorAll('button, a') as NodeListOf<HTMLElement>;
      const listeners: { el: HTMLElement; move: any; leave: any }[] = [];
      buttons?.forEach((button) => {
        const handleMouseMove = (e: MouseEvent) => {
          const rect = button.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          g.to(button, { x: x * 0.3, y: y * 0.3, duration: 0.3, ease: "power2.out" });
        };
        const handleMouseLeave = () => {
          g.to(button, { x: 0, y: 0, duration: 0.5, ease: "elastic.out(1, 0.5)" });
        };
        button.addEventListener('mousemove', handleMouseMove);
        button.addEventListener('mouseleave', handleMouseLeave);
        listeners.push({ el: button, move: handleMouseMove, leave: handleMouseLeave });
      });

      // Particle system
      const createParticles = () => {
        for (let i = 0; i < 30; i++) {
          const particle = document.createElement('div') as ParticleElement;
          particle.className = 'absolute w-1 h-1 bg-white/20 rounded-full';
          particle.style.left = Math.random() * 100 + '%';
          particle.style.top = Math.random() * 100 + '%';
          particlesRef.current?.appendChild(particle);
          g.to(particle, {
            y: "random(-100, 100)",
            x: "random(-50, 50)",
            opacity: "random(0.1, 0.8)",
            scale: "random(0.5, 2)",
            duration: "random(10, 20)",
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 5
          });
        }
      };
      createParticles();

      // Return cleanup for context and mouse listeners
      return () => {
        listeners.forEach(({ el, move, leave }) => {
          el.removeEventListener('mousemove', move);
          el.removeEventListener('mouseleave', leave);
        });
      };
    });

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    let cleanup: (() => void) | void;
    initAnimations().then((cleanupFn) => {
      cleanup = cleanupFn;
    });
    return () => {
      if (cleanup) cleanup();
    };
  }, [initAnimations]);

  return (
    <section
      ref={heroRef}
      className="min-h-screen p-5 mt-5 flex items-center md:mt-12 justify-center relative overflow-hidden bg-black"
    >
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Morphing blobs - responsive size */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-cyan-400/30 rounded-full blur-3xl"
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-pink-500/30 rounded-full blur-3xl"
      />
      <div
        ref={blob3Ref}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-36 md:w-72 h-36 md:h-72 bg-emerald-400/30 rounded-full blur-3xl"
      />

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Floating badge */}
          <div ref={badgeRef} className="inline-block mb-4 md:mb-8">
            <div className="relative group">
              <span className="relative bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-full px-4 md:px-8 py-2 md:py-3 text-xs md:text-sm text-cyan-300 tracking-wider font-medium flex items-center gap-2">
                <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
                AI-POWERED CAREER GUIDANCE
                <Zap className="w-3 md:w-4 h-3 md:h-4" />
              </span>
            </div>
          </div>

          {/* Hero title */}
          <h1 ref={titleRef} className="text-4xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-8 leading-none tracking-tighter">
            <span className="block relative">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                AMAZINGLY
              </span>
            </span>
            <span className="block text-white font-light tracking-wide">
              SIMPLE
            </span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg md:text-2xl lg:text-3xl text-slate-300 mb-8 md:mb-12 max-w-3xl md:max-w-4xl mx-auto leading-relaxed font-light">
            We designed AI Career Coach to be{" "}
            <span className="text-cyan-400 font-medium">intuitive</span>,{" "}
            <span className="text-purple-400 font-medium">fast</span>, and{" "}
            <span className="text-pink-400 font-medium">exceptionally helpful</span>{" "}
            for your professional journey.
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-3 md:gap-6 justify-center items-center mb-8 md:mb-16">
            <Link href="/dashboard">
              <Button
                size="lg"
                className="relative group bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-600 hover:to-purple-700 text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-bold rounded-2xl shadow-2xl border-0"
              >
                <span className="relative flex items-center gap-2 md:gap-3">
                  <ArrowDown className="w-4 md:w-5 h-4 md:h-5" />
                  TRY IT NOW
                </span>
              </Button>
            </Link>
           <Link  href={'/dashboard'} > <Button
              size="lg"
              variant="outline"
              className="bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-2xl"
            >
              Learn More
            </Button>
            </Link>
          </div>

          {/* Image section */}
          <div ref={imageRef} className="relative mx-auto max-w-4xl md:max-w-6xl perspective-1000">
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              <Image
                src="/Hero.Avif"
                alt="AI Career Coach Interface"
                width={1200}
                height={600}
                priority
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl px-3 md:px-4 py-1 md:py-2 border border-white/20">
                <div className="flex items-center gap-2 text-white text-xs md:text-sm">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Live AI Assistant
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient-x { animation: gradient-x 6s ease infinite; }
        .bg-300% { background-size: 300% 300%; }
        .perspective-1000 { perspective: 1000px; }
      `}</style>
    </section>
  );
};

export default Hero;
