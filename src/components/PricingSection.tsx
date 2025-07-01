
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Check, Star, Users, Crown } from "lucide-react";
import { Link } from "react-router-dom";

export const PricingSection = () => {
  const [billingPeriod, setBillingPeriod] = useState<'monthly' | 'yearly'>('monthly');

  const handlePlanSelection = (planName: string) => {
    if (planName === "Pay Per Question") {
      // Redirect to chat for pay-per-question
      window.location.href = "/chat";
    } else if (planName === "Family Plan") {
      // For now, show alert - would typically open subscription flow
      alert("Family Plan subscription will be available when you integrate payment processing!");
    } else if (planName === "School Partnership") {
      // Redirect to schools page
      window.location.href = "/schools";
    }
  };

  const plans = [
    {
      name: "Pay Per Question",
      icon: Star,
      price: "KES 5-10",
      period: "per question",
      description: "Perfect for occasional homework help",
      features: [
        "Instant AI explanations",
        "Photo upload support",
        "Step-by-step solutions",
        "Basic math & science",
        "24/7 availability"
      ],
      buttonText: "Start Asking",
      popular: false,
      color: "bg-primary"
    },
    {
      name: "Family Plan",
      icon: Users,
      price: billingPeriod === 'monthly' ? "KES 500" : "KES 5,000",
      period: billingPeriod === 'monthly' ? "per month" : "per year",
      description: "Unlimited questions for busy families",
      features: [
        "Unlimited questions",
        "All subjects covered",
        "Priority AI responses",
        "Progress tracking",
        "Multiple children support",
        "Parent dashboard",
        "Study schedules"
      ],
      buttonText: "Start Free Trial",
      popular: true,
      color: "bg-primary"
    },
    {
      name: "School Partnership",
      icon: Crown,
      price: "Custom",
      period: "pricing",
      description: "Bulk licensing for educational institutions",
      features: [
        "Unlimited student access",
        "Teacher dashboard",
        "Class management",
        "Progress analytics",
        "Custom branding",
        "API integration",
        "Dedicated support"
      ],
      buttonText: "Contact Sales",
      popular: false,
      color: "bg-primary"
    }
  ];

  return (
    <section className="py-16 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Choose Your Perfect Plan
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-8">
            From quick answers to comprehensive family support, we have the right solution for every parent
          </p>

          {/* Billing Toggle */}
          <div className="inline-flex bg-white rounded-full p-1 border">
            <button
              onClick={() => setBillingPeriod('monthly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'monthly'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Monthly
            </button>
            <button
              onClick={() => setBillingPeriod('yearly')}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-colors ${
                billingPeriod === 'yearly'
                  ? 'bg-primary text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              Yearly
              <span className="ml-2 text-xs bg-primary text-white px-2 py-1 rounded-full">
                Save 17%
              </span>
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {plans.map((plan, index) => {
            const Icon = plan.icon;
            return (
              <Card
                key={plan.name}
                className={`relative p-8 ${plan.popular ? 'border-primary border-2 scale-105' : 'border-border'} hover:shadow-lg transition-all duration-300`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-primary text-white px-4 py-2 rounded-full text-sm font-medium">
                      Most Popular
                    </span>
                  </div>
                )}

                <div className="text-center mb-8">
                  <div className={`w-16 h-16 ${plan.color} rounded-2xl flex items-center justify-center mx-auto mb-4`}>
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2">{plan.name}</h3>
                  <p className="text-muted-foreground mb-4">{plan.description}</p>
                  <div className="mb-2">
                    <span className="text-3xl font-bold text-foreground">{plan.price}</span>
                    <span className="text-muted-foreground ml-2">{plan.period}</span>
                  </div>
                </div>

                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-center">
                      <Check className="w-5 h-5 text-primary mr-3 shrink-0" />
                      <span className="text-sm text-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Button
                  className={`w-full ${plan.popular ? 'bg-primary text-white hover:bg-primary/90' : 'border-2 border-primary text-primary hover:bg-primary hover:text-white'}`}
                  variant={plan.popular ? 'default' : 'outline'}
                  onClick={() => handlePlanSelection(plan.name)}
                >
                  {plan.buttonText}
                </Button>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Have questions about our pricing? We're here to help!
          </p>
          <Button variant="outline" onClick={() => alert("Contact support would open a contact form or chat!")}>
            Contact Support
          </Button>
        </div>
      </div>
    </section>
  );
};
