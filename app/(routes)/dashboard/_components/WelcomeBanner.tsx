import React from 'react';
import { Brain, ArrowRightCircle } from 'lucide-react';

const WelcomeBanner: React.FC = () => {
  return (
    <section className=" py-12 px-4 flex justify-center">
      <div className="w-full max-w-5xl  backdrop-blur-md border border-white/10 text-white rounded-3xl p-8 md:p-12 shadow-xl shadow-slate-900 transition-all">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-white/10 rounded-full border border-white/20">
            <Brain className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-3xl md:text-4xl font-bold">AI Career Coach</h1>
        </div>

        <p className="mt-4 text-lg text-slate-300 max-w-3xl">
          Smarter career decisions start here — get tailored advice, real-time market insights, and a roadmap built just for you.
        </p>

        <button className="mt-6 inline-flex items-center gap-2 bg-white text-slate-900 font-semibold px-6 py-3 rounded-full hover:bg-purple-100 hover:text-slate-900 transition-all shadow-md shadow-slate-400/30">
          Let’s Get Started
          <ArrowRightCircle className="w-5 h-5" />
        </button>
      </div>
    </section>
  );
};

export default WelcomeBanner;
