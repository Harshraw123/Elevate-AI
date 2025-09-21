import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: "📄",
      title: "Resume Analysis",
      description: "AI-powered resume scanning and optimization suggestions to make your resume stand out to employers.",
      gradient: "bg-gradient-to-br from-blue-500 to-purple-600"
    },
    {
      icon: "🗺️",
      title: "Study Roadmaps",
      description: "Personalized learning paths and skill development roadmaps tailored to your career goals.",
      gradient: "bg-gradient-to-br from-green-500 to-teal-600"
    },
    {
      icon: "💬",
      title: "Query Resolution",
      description: "Get instant answers to your career questions from our intelligent AI assistant.",
      gradient: "bg-gradient-to-br from-pink-500 to-rose-600"
    },
    {
      icon: "🎯",
      title: "Career Matching",
      description: "Discover careers that match your skills, interests, and personality profile.",
      gradient: "bg-gradient-to-br from-orange-500 to-red-600"
    },
    {
      icon: "📊",
      title: "Skill Assessment",
      description: "Comprehensive skill evaluation and gap analysis to identify areas for improvement.",
      gradient: "bg-gradient-to-br from-indigo-500 to-blue-600"
    },
    {
      icon: "🚀",
      title: "Interview Prep",
      description: "Practice with AI-powered mock interviews and get feedback to ace your next interview.",
      gradient: "bg-gradient-to-br from-cyan-500 to-blue-600"
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">Powerful Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to accelerate your career growth and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-lg hover:scale-105 transition-all duration-300 transform"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader>
                <div className={`w-16 h-16 ${feature.gradient} rounded-xl flex items-center justify-center mb-4 `}>
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <CardTitle className="text-xl font-semibold text-foreground">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fadeIn 0.8s ease-out forwards;
        }
      `}</style>
    </section>
  );
};

export default Features;
