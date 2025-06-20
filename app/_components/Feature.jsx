import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: "📄",
      title: "Resume Analysis",
      description: "AI-powered resume scanning and optimization suggestions to make your resume stand out to employers.",
      gradient: "gradient-primary"
    },
    {
      icon: "🗺️",
      title: "Study Roadmaps",
      description: "Personalized learning paths and skill development roadmaps tailored to your career goals.",
      gradient: "gradient-secondary"
    },
    {
      icon: "💬",
      title: "Query Resolution",
      description: "Get instant answers to your career questions from our intelligent AI assistant.",
      gradient: "gradient-accent"
    },
    {
      icon: "🎯",
      title: "Career Matching",
      description: "Discover careers that match your skills, interests, and personality profile.",
      gradient: "gradient-warm"
    },
    {
      icon: "📊",
      title: "Skill Assessment",
      description: "Comprehensive skill evaluation and gap analysis to identify areas for improvement.",
      gradient: "gradient-primary"
    },
    {
      icon: "🚀",
      title: "Interview Prep",
      description: "Practice with AI-powered mock interviews and get feedback to ace your next interview.",
      gradient: "gradient-secondary"
    }
  ];

  return (
    <section id="features" className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl md:text-5xl font-bold mb-6">
            <span className="text-gradient">Powerful Features</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to accelerate your career growth and land your dream job
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/50 transition-all duration-300 transform hover:scale-105 hover:shadow-xl group animate-slide-up"
              style={{animationDelay: `${index * 0.1}s`}}
            >
              <CardHeader>
                <div className={`w-16 h-16 ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
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
    </section>
  );
};

export default Features;
