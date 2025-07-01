
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Camera, Send, Image as ImageIcon, MessageSquare } from "lucide-react";
import { PaymentModal } from "./PaymentModal";

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  image?: string;
  timestamp: Date;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your friendly homework helper. You can upload a photo of your child's homework or type a question, and I'll provide a clear, step-by-step explanation. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const generateAIResponse = (userMessage: string, hasImage: boolean = false) => {
    // Generate different responses based on content
    if (hasImage) {
      return "I can see you've uploaded a homework problem! Let me analyze this step by step:\n\n**Step 1:** I can see this is a math problem involving [subject area]\n\n**Step 2:** The key information I notice is...\n\n**Step 3:** Here's how to solve it...\n\n**Final Answer:** [Solution]\n\n**Learning Tip:** Remember that [helpful tip for understanding the concept]!";
    }
    
    if (userMessage.toLowerCase().includes('math')) {
      return "Great math question! Let me break this down step by step:\n\n**Step 1:** First, let's identify what type of math problem this is.\n\n**Step 2:** Here's the approach we should take...\n\n**Step 3:** Let's work through the calculation...\n\n**Answer:** [Your solution here]\n\n**Learning tip:** Always double-check your work by substituting back into the original problem!";
    }
    
    if (userMessage.toLowerCase().includes('science')) {
      return "Excellent science question! Here's a clear explanation:\n\n**What's happening:** [Scientific concept explanation]\n\n**Why it works:** [Underlying principles]\n\n**Real-world example:** [Practical application]\n\n**Remember:** Science is all about observing patterns and understanding why things work the way they do!";
    }
    
    if (userMessage.toLowerCase().includes('english') || userMessage.toLowerCase().includes('writing')) {
      return "Great question about English/Writing! Here's how to approach this:\n\n**Structure:** [How to organize your thoughts]\n\n**Key points to include:** [Important elements]\n\n**Writing tip:** [Helpful advice]\n\n**Example:** [Sample sentence or paragraph]\n\nRemember, good writing comes from practice and clear thinking!";
    }
    
    // Default response
    return `I'd be happy to help you with that question! Based on what you've asked, here's my explanation:\n\n**Understanding the problem:** ${userMessage}\n\n**Step-by-step approach:**\n1. First, let's break down what we're being asked\n2. Then we'll identify the key information\n3. Finally, we'll work through the solution\n\n**Learning tip:** Don't hesitate to ask follow-up questions if anything isn't clear!`;
  };

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    const currentInput = inputText;
    setInputText("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: generateAIResponse(currentInput),
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
    }, 1500);
  };

  const handleImageUpload = () => {
    // Create a file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        // Create a preview URL for the image
        const imageUrl = URL.createObjectURL(file);
        
        const imageMessage: Message = {
          id: Date.now().toString(),
          type: 'user',
          content: "I've uploaded a homework problem image. Can you help me solve this?",
          image: imageUrl,
          timestamp: new Date()
        };

        setMessages(prev => [...prev, imageMessage]);
        setIsLoading(true);

        // Simulate AI response for image
        setTimeout(() => {
          const aiResponse: Message = {
            id: (Date.now() + 1).toString(),
            type: 'ai',
            content: generateAIResponse("image uploaded", true),
            timestamp: new Date()
          };
          setMessages(prev => [...prev, aiResponse]);
          setIsLoading(false);
        }, 2000);
      }
    };
    fileInput.click();
  };

  const handlePaymentSuccess = () => {
    const aiResponse: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: "Thank you for your payment! I'm now providing you with a detailed solution:\n\n**Complete Step-by-Step Solution:**\n\n**Step 1:** [Detailed explanation of the first step]\n\n**Step 2:** [Detailed explanation of the second step]\n\n**Step 3:** [Final calculation or conclusion]\n\n**Answer:** [Final answer with explanation]\n\n**Learning tip:** [Additional insight to help with similar problems]\n\n**Practice suggestion:** Try solving a similar problem to reinforce your understanding!",
      timestamp: new Date()
    };
    setMessages(prev => [...prev, aiResponse]);
    setShowPaymentModal(false);
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      {/* Chat Messages */}
      <div className="space-y-4 mb-6 max-h-96 overflow-y-auto">
        {messages.map((message) => (
          <div key={message.id} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
            <Card className={`max-w-xs sm:max-w-sm md:max-w-md p-4 ${
              message.type === 'user' 
                ? 'bg-primary text-white' 
                : 'bg-white border-2'
            }`}>
              {message.image && (
                <img src={message.image} alt="Uploaded homework" className="w-full rounded-lg mb-2" />
              )}
              <p className="text-sm whitespace-pre-line">{message.content}</p>
              <span className="text-xs opacity-70 mt-2 block">
                {message.timestamp.toLocaleTimeString()}
              </span>
            </Card>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <Card className="max-w-xs p-4 bg-white border-2">
              <div className="flex items-center space-x-2">
                <div className="animate-bounce w-2 h-2 bg-primary rounded-full"></div>
                <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{animationDelay: '0.1s'}}></div>
                <div className="animate-bounce w-2 h-2 bg-primary rounded-full" style={{animationDelay: '0.2s'}}></div>
              </div>
            </Card>
          </div>
        )}
      </div>

      {/* Input Area */}
      <Card className="p-4 bg-white sticky bottom-4 border">
        <div className="flex items-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImageUpload}
            className="shrink-0"
          >
            <Camera className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <Textarea
              placeholder="Type your homework question here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[60px] resize-none"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim()}
            className="bg-primary shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-2 text-center">
          Upload a photo or type your question • KES 5-10 per detailed answer
        </p>
      </Card>

      <PaymentModal
        isOpen={showPaymentModal}
        onClose={() => setShowPaymentModal(false)}
        onSuccess={handlePaymentSuccess}
      />
    </div>
  );
};
