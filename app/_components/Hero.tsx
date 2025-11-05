"use client";

import { Button } from "@/components/ui/button";
import { ArrowDown, Sparkles, Zap } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useRef, useEffect, useCallback, useState } from "react";

interface GSAPModule {
  gsap: typeof import("gsap").gsap;
  ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger;
}

let gsap: typeof import("gsap").gsap | null = null;
let ScrollTrigger: typeof import("gsap/ScrollTrigger").ScrollTrigger | null = null;

const loadGSAP = async (): Promise<GSAPModule | void> => {
  if (typeof window === "undefined") return;
  if (!gsap || !ScrollTrigger) {
    const gsapModule = await import("gsap");
    const stModule = await import("gsap/ScrollTrigger");
    gsap = gsapModule.gsap;
    ScrollTrigger = stModule.ScrollTrigger;
    gsap.registerPlugin(ScrollTrigger);
    // Lower the tick fps for lighter CPU usage (helps on low-power devices)
    try {
      gsap.ticker.fps(30);
    } catch (e) {
      // ignore if not supported
    }
  }
  return { gsap: gsap!, ScrollTrigger: ScrollTrigger! };
};

const Hero: React.FC = () => {
  const heroRef = useRef<HTMLElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRef = useRef<HTMLParagraphElement | null>(null);
  const ctaRef = useRef<HTMLDivElement | null>(null);
  const imageRef = useRef<HTMLDivElement | null>(null);
  const blob1Ref = useRef<HTMLDivElement | null>(null);
  const blob2Ref = useRef<HTMLDivElement | null>(null);
  const badgeRef = useRef<HTMLDivElement | null>(null);
  const particlesRef = useRef<HTMLDivElement | null>(null);
  const [loaded, setLoaded] = useState(false);

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  // Preload fallback image with native Image to ensure onLoad fires reliably
  useEffect(() => {
    if (typeof window === "undefined") return;
    const img = new window.Image();
    img.src = "/Hero.avif";
    img.onload = () => {
      setImageLoaded(true);
    };
    img.onerror = () => {
      setImageError(true);
      // still mark as loaded so animations don't wait forever
      setImageLoaded(true);
    };
  }, []);

  const initAnimations = useCallback(async () => {
    if (typeof window === "undefined") return;
    const modules = await loadGSAP();
    if (!modules) return;
    const { gsap: g, ScrollTrigger: ST } = modules;
    if (!g || !ST) return;

    // Use context for automatic scoping and cleanup
    const ctx = g.context(() => {
      // Reduced initial set of elements to animate
      const texts = [titleRef.current, subtitleRef.current, ctaRef.current].filter(Boolean);
      if (texts.length) {
        g.set(texts, { opacity: 0, y: 30 });
      }
      if (badgeRef.current) {
        g.set(badgeRef.current, { opacity: 0, y: 20 });
      }

      if (imageRef.current) {
        const isMobile = window.innerWidth < 768;
        g.set(imageRef.current, {
          opacity: 1,
          scale: isMobile ? 1 : 0.98,
          rotationX: isMobile ? 0 : 3
        });
      }

      // Simplified floating blobs (only 2 blobs now)
      if (blob1Ref.current) {
        g.to(blob1Ref.current, {
          x: "random(-30, 30)",
          y: "random(-20, 20)",
          scale: "random(0.9, 1.08)",
          rotation: "random(-10,10)",
          duration: "random(6, 10)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        });
      }
      if (blob2Ref.current) {
        g.to(blob2Ref.current, {
          x: "random(-25, 25)",
          y: "random(-15, 15)",
          scale: "random(0.95, 1.12)",
          rotation: "random(-8,8)",
          duration: "random(8, 12)",
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.5
        });
      }

      // Entrance timeline (shorter & smoother)
      const tl = g.timeline({ delay: 0.35 });
      if (badgeRef.current) {
        tl.to(badgeRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" });
      }
      if (titleRef.current) {
        tl.to(titleRef.current, { opacity: 1, y: 0, duration: 0.9, ease: "power3.out" }, "-=0.2");
      }
      if (subtitleRef.current) {
        tl.to(subtitleRef.current, { opacity: 1, y: 0, duration: 0.7, ease: "power2.out" }, "-=0.5");
      }
      if (ctaRef.current) {
        tl.to(ctaRef.current, { opacity: 1, y: 0, duration: 0.6, ease: "back.out(1.2)" }, "-=0.45");
      }
      if (imageRef.current && window.innerWidth >= 768) {
        tl.to(imageRef.current, { scale: 1, rotationX: 0, duration: 0.6, ease: "power2.out" }, "-=0.45");
      }

      // Light parallax / scroll effects: scrub but gentle and cheap
      ST.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
        onUpdate: (self: { progress: number }) => {
          const p = self.progress;
          if (imageRef.current) {
            // small transforms for parallax only
            g.set(imageRef.current, { y: p * 60, scale: 1 + p * 0.04, rotationX: p * 6 });
          }
          if (titleRef.current) {
            g.set(titleRef.current, { scale: 1 - p * 0.12, opacity: 1 - p * 0.8, y: -p * 30 });
          }
          if (subtitleRef.current) {
            g.set(subtitleRef.current, { opacity: 1 - p * 0.9, y: -p * 20 });
          }
          if (ctaRef.current) {
            g.set(ctaRef.current, { opacity: 1 - p * 1.1, y: -p * 30 });
          }
          // subtle blob reaction
          const blobs = [blob1Ref.current, blob2Ref.current].filter(Boolean);
          if (blobs.length) {
            g.set(blobs, { scale: 1 + p * 0.25, opacity: 0.35 - p * 0.18 });
          }
        }
      });

      // Lightweight magnetic button effect: smaller multiplier, faster reset
      const buttons = ctaRef.current?.querySelectorAll("button, a") as NodeListOf<HTMLElement> | undefined;
      const listeners: Array<{ el: HTMLElement; move: (e: MouseEvent) => void; leave: () => void }> = [];
      buttons?.forEach((button) => {
        const handleMouseMove = (e: MouseEvent) => {
          // cheap calculation, less transform magnitude
          const rect = button.getBoundingClientRect();
          const x = (e.clientX - rect.left - rect.width / 2) * 0.15;
          const y = (e.clientY - rect.top - rect.height / 2) * 0.12;
          // shorter duration, small easing
          g.to(button, { x, y, duration: 0.18, ease: "power2.out" });
        };
        const handleMouseLeave = () => {
          g.to(button, { x: 0, y: 0, duration: 0.35, ease: "power2.out" });
        };
        button.addEventListener("mousemove", handleMouseMove);
        button.addEventListener("mouseleave", handleMouseLeave);
        listeners.push({ el: button, move: handleMouseMove, leave: handleMouseLeave });
      });

      // Reduced particle system (8 particles max) and much cheaper tweens
      const createdParticles: HTMLElement[] = [];
      const createParticles = () => {
        const count = 8;
        for (let i = 0; i < count; i++) {
          const particle = document.createElement("div");
          particle.className = "absolute w-1 h-1 bg-white/20 rounded-full";
          // use percentages but clamp to center area so they're not all over the page
          particle.style.left = 20 + Math.random() * 60 + "%";
          particle.style.top = 20 + Math.random() * 60 + "%";
          particle.style.pointerEvents = "none";
          particlesRef.current?.appendChild(particle);
          createdParticles.push(particle);
          g.to(particle, {
            y: `random(-40, 40)`,
            x: `random(-25, 25)`,
            opacity: `random(0.1, 0.6)`,
            scale: `random(0.6, 1.6)`,
            duration: `random(6, 12)`,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
            delay: Math.random() * 3
          });
        }
      };
      createParticles();

      // cleanup function for listeners + particles
      return () => {
        listeners.forEach(({ el, move, leave }) => {
          try {
            el.removeEventListener("mousemove", move);
            el.removeEventListener("mouseleave", leave);
          } catch (e) {}
        });
        // remove particles from DOM
        createdParticles.forEach((p) => p.remove());
      };
    }, heroRef);

    // ensure ScrollTrigger knows about any layout changes (call refresh)
    // Refresh after a short delay (image load / layout stable)
    setTimeout(() => {
      try {
        if (ScrollTrigger) ScrollTrigger.refresh();
      } catch (e) {}
    }, 200);

    // return revert for unmount
    return () => {
      try {
        ctx.revert();
      } catch (e) {}
    };
  }, []);

  useEffect(() => {
    // initialize when image loaded or errored (so we don't block)
    let cleanup: (() => void) | void;
    if (imageLoaded || imageError) {
      const maybeCleanup = initAnimations();
      // if initAnimations returns cleanup synchronously (it doesn't here), handle it
      Promise.resolve(maybeCleanup).then((fn) => {
        cleanup = fn as any;
      });
    }
    return () => {
      if (cleanup) cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [imageLoaded, imageError]);

  // Handler for Next.js Image load callback - ensures GSAP refresh
  const onImageLoad = () => {
    setImageLoaded(true);
    if (ScrollTrigger) {
      try {
        ScrollTrigger.refresh();
      } catch (e) {}
    }
  };

  return (
    <section
      ref={heroRef}
      className="min-h-screen p-5 mt-5 flex items-center md:mt-12 justify-center relative overflow-hidden bg-black"
    >
      {/* Animated particles */}
      <div ref={particlesRef} className="absolute inset-0 z-0 pointer-events-none" />

      {/* Simplified morphing blobs */}
      <div
        ref={blob1Ref}
        className="absolute top-1/4 left-1/4 w-48 md:w-96 h-48 md:h-96 bg-cyan-400/30 rounded-full blur-3xl"
        aria-hidden
      />
      <div
        ref={blob2Ref}
        className="absolute bottom-1/4 right-1/4 w-40 md:w-80 h-40 md:h-80 bg-pink-500/30 rounded-full blur-3xl"
        aria-hidden
      />

      {/* Main content */}
      <div className="container mx-auto px-4 sm:px-6 text-center relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Badge */}
          <div ref={badgeRef} className="inline-block mb-4 md:mb-8">
            <div className="relative group">
              <span className="relative bg-slate-900/80 backdrop-blur-xl border border-white/20 rounded-full px-4 md:px-8 py-2 md:py-3 text-xs md:text-sm text-cyan-300 tracking-wider font-medium flex items-center gap-2">
                <Sparkles className="w-3 md:w-4 h-3 md:h-4" />
                AI-POWERED CAREER GUIDANCE
                <Zap className="w-3 md:w-4 h-3 md:h-4" />
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 ref={titleRef} className="text-4xl md:text-7xl lg:text-8xl font-black mb-4 md:mb-8 leading-none tracking-tighter">
            <span className="block relative">
              <span className="bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400 bg-clip-text text-transparent animate-gradient-x bg-300%">
                AMAZINGLY
              </span>
            </span>
            <span className="block text-white font-light tracking-wide">SIMPLE</span>
          </h1>

          {/* Subtitle */}
          <p ref={subtitleRef} className="text-lg md:text-2xl lg:text-3xl text-slate-300 mb-8 md:mb-12 max-w-3xl md:max-w-4xl mx-auto leading-relaxed font-light">
            We designed AI Career Coach to be{" "}
            <span className="text-cyan-400 font-medium">intuitive</span>,{" "}
            <span className="text-purple-400 font-medium">fast</span>, and{" "}
            <span className="text-pink-400 font-medium">exceptionally helpful</span> for your professional journey.
          </p>

          {/* CTA */}
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

            <Link href={"/dashboard"}>
              <Button
                size="lg"
                variant="outline"
                className="bg-white/5 backdrop-blur-xl border-white/20 hover:bg-white/10 text-white px-6 md:px-10 py-3 md:py-4 text-base md:text-lg font-semibold rounded-2xl"
              >
                Learn More
              </Button>
            </Link>
          </div>

          {/* Image section */}
          <div ref={imageRef} className="relative mx-auto max-w-4xl md:max-w-6xl perspective-1000" style={{ minHeight: "200px" }}>
            <div className="relative bg-white/5 backdrop-blur-xl rounded-2xl md:rounded-3xl overflow-hidden border border-white/20 shadow-2xl">
              {/* Placeholder while image loads */}
              {!imageLoaded && !imageError && (
                <div className="w-full h-[300px] md:h-[600px] bg-gradient-to-br from-slate-800 to-slate-900 flex items-center justify-center">
                  <div className="text-center">
                    <div className="w-8 h-8 border-2 border-cyan-400 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-400 text-sm">Loading interface...</p>
                  </div>
                </div>
              )}

              {/* Error fallback */}
            
              {/* Next.js Image - explicitly eager & priority */}
              <Image
      src="/Hero.png" 
      alt="AI Career Coach Interface"
      width={1200}
      height={600}
      priority // ✅ ensures eager load for hero image
      className={`w-full h-auto object-cover transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      }`}
      onLoadingComplete={() => setLoaded(true)}
      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
    />


              {/* Live indicator */}
              {(imageLoaded || imageError) && (
                <div className="absolute top-4 md:top-6 left-4 md:left-6 bg-white/10 backdrop-blur-md rounded-lg md:rounded-xl px-3 md:px-4 py-1 md:py-2 border border-white/20">
                  <div className="flex items-center gap-2 text-white text-xs md:text-sm">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    Live AI Assistant
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes gradient-x {
          0%,
          100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient-x {
          animation: gradient-x 6s ease infinite;
        }
        .bg-300% {
          background-size: 300% 300%;
        }
        .perspective-1000 {
          perspective: 1000px;
        }
      `}</style>
    </section>
  );
};

export default Hero;
