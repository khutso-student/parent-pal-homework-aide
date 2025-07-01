
import { Button } from "@/components/ui/button";
import { Camera, MessageSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  const handleSeeHowItWorks = () => {
    // Scroll to the features section or show a demo
    const featuresSection = document.querySelector('.features-preview');
    if (featuresSection) {
      featuresSection.scrollIntoView({ behavior: 'smooth' });
    } else {
      alert("This would typically show a demo video or tutorial!");
    }
  };

  return (
    <section className="relative overflow-hidden bg-cream-gradient">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-primary/20 rounded-full animate-float" />
          <div className="absolute top-20 right-10 w-16 h-16 bg-primary/20 rounded-full animate-bounce-soft" />
          <div className="absolute bottom-10 left-20 w-12 h-12 bg-primary/20 rounded-full animate-float" />
          
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Homework Help Made{" "}
              <span className="text-primary">
                Simple
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Snap a photo or type your question. Get instant, friendly explanations 
              that help your child learn and succeed. Perfect for busy parents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/chat">
                <Button size="lg" className="bg-primary hover:bg-primary/90 text-white px-8 py-3 text-lg">
                  <Camera className="w-5 h-5 mr-2" />
                  Try It Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg" onClick={handleSeeHowItWorks}>
                <MessageSquare className="w-5 h-5 mr-2" />
                See How It Works
              </Button>
            </div>

            {/* Features Preview */}
            <div className="features-preview grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm animate-scale-in border">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Photo Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Snap a picture of any homework problem
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm animate-scale-in border" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">AI Explanation</h3>
                <p className="text-sm text-muted-foreground">
                  Get step-by-step, easy-to-understand answers
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm animate-scale-in border" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Instant Help</h3>
                <p className="text-sm text-muted-foreground">
                  Available 24/7 whenever you need support
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
