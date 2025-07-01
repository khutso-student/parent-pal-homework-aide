
import { Button } from "@/components/ui/button";
import { Camera, MessageSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-cream-gradient">
      <div className="container mx-auto px-4 py-12 lg:py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Floating Elements */}
          <div className="absolute top-10 left-10 w-20 h-20 bg-gentle-orange/20 rounded-full animate-float" />
          <div className="absolute top-20 right-10 w-16 h-16 bg-soft-green/20 rounded-full animate-bounce-soft" />
          <div className="absolute bottom-10 left-20 w-12 h-12 bg-light-purple/20 rounded-full animate-float" />
          
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6">
              Homework Help Made{" "}
              <span className="bg-warm-gradient bg-clip-text text-transparent">
                Simple
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Snap a photo or type your question. Get instant, friendly explanations 
              that help your child learn and succeed. Perfect for busy parents.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/chat">
                <Button size="lg" className="bg-warm-gradient hover:opacity-90 text-white px-8 py-3 text-lg">
                  <Camera className="w-5 h-5 mr-2" />
                  Try It Free
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="px-8 py-3 text-lg">
                <MessageSquare className="w-5 h-5 mr-2" />
                See How It Works
              </Button>
            </div>

            {/* Features Preview */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-3xl mx-auto">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm animate-scale-in">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">Photo Upload</h3>
                <p className="text-sm text-muted-foreground">
                  Snap a picture of any homework problem
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm animate-scale-in" style={{animationDelay: '0.1s'}}>
                <div className="w-12 h-12 bg-accent/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <MessageSquare className="w-6 h-6 text-accent" />
                </div>
                <h3 className="font-semibold text-foreground mb-2">AI Explanation</h3>
                <p className="text-sm text-muted-foreground">
                  Get step-by-step, easy-to-understand answers
                </p>
              </div>

              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-2xl shadow-sm animate-scale-in" style={{animationDelay: '0.2s'}}>
                <div className="w-12 h-12 bg-gentle-orange/10 rounded-xl flex items-center justify-center mb-4 mx-auto">
                  <Clock className="w-6 h-6 text-gentle-orange" />
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
