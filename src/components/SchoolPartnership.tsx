
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Users, BookOpen, BarChart3, Shield, Award, Zap } from "lucide-react";

export const SchoolPartnership = () => {
  const handleScheduleDemo = () => {
    // In a real app, this would open a calendar booking widget or contact form
    alert("Demo scheduling would open a calendar booking system or contact form!");
  };

  const handleContactSales = () => {
    // In a real app, this would open a contact form or start a chat
    alert("Contact sales would open a contact form or chat system!");
  };

  const handleDownloadBrochure = () => {
    // In a real app, this would download a PDF brochure
    alert("This would download a school partnership brochure PDF!");
  };

  const benefits = [
    {
      icon: Users,
      title: "Unlimited Student Access",
      description: "Every student gets unlimited homework help, 24/7"
    },
    {
      icon: BookOpen,
      title: "Curriculum Integration",
      description: "Aligned with Kenyan curriculum standards (8-4-4 & CBC)"
    },
    {
      icon: BarChart3,
      title: "Analytics Dashboard",
      description: "Track student progress and identify learning gaps"
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "COPPA compliant with robust privacy protections"
    },
    {
      icon: Award,
      title: "Teacher Training",
      description: "Professional development and implementation support"
    },
    {
      icon: Zap,
      title: "API Integration",
      description: "Seamlessly integrate with your existing LMS"
    }
  ];

  const testimonials = [
    {
      name: "Dr. Mary Wanjiku",
      role: "Head Teacher, Nairobi Primary School",
      quote: "Homework Helper has transformed how our students approach learning at home. Parent engagement has increased by 60%."
    },
    {
      name: "James Kiprotich",
      role: "ICT Coordinator, Eldoret Academy",
      quote: "The analytics help us identify struggling students early. It's like having a teaching assistant for every family."
    }
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section */}
      <section className="bg-primary text-black py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Partner with Homework Helper
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Empower every family in your school community with AI-powered homework assistance
          </p>
          <Button size="lg" variant="outline" className="bg-black text-primary border-black hover:bg-gray-900" onClick={handleScheduleDemo}>
            Schedule a Demo
          </Button>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Why Schools Choose Us
            </h2>
            <p className="text-lg text-gray-300 max-w-2xl mx-auto">
              Transform homework from a struggle into a learning opportunity for every student
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="p-6 hover:shadow-lg transition-shadow bg-gray-900 border-primary">
                  <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {benefit.title}
                  </h3>
                  <p className="text-gray-300">
                    {benefit.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary mb-2">500+</div>
              <div className="text-gray-300">Schools Served</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">50K+</div>
              <div className="text-gray-300">Students Helped</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">95%</div>
              <div className="text-gray-300">Parent Satisfaction</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-gray-300">Grade Improvement</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-black">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-white mb-12">
            What Educators Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="p-8 bg-gray-900 border-primary">
                <blockquote className="text-lg text-white mb-4">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
                    <span className="text-black font-bold">
                      {testimonial.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <div className="font-semibold text-white">{testimonial.name}</div>
                    <div className="text-gray-300">{testimonial.role}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary text-black">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Learning?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto opacity-90">
            Join hundreds of schools already using Homework Helper to support their students and families
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="outline" className="bg-black text-primary border-black hover:bg-gray-900" onClick={handleScheduleDemo}>
              Request a Demo
            </Button>
            <Button size="lg" variant="outline" className="border-black text-black hover:bg-black/10" onClick={handleDownloadBrochure}>
              Download Brochure
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};
