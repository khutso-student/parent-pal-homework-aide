
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

  const handleSendMessage = () => {
    if (!inputText.trim()) return;

    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputText,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, newMessage]);
    setInputText("");
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'd be happy to help you with that! To provide the most accurate explanation, I'll need to analyze your question. This will cost KES 5 for a detailed step-by-step solution. Would you like to proceed?",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiResponse]);
      setIsLoading(false);
      setShowPaymentModal(true);
    }, 1500);
  };

  const handleImageUpload = () => {
    // In a real app, this would handle file upload
    const imageMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: "I've uploaded a homework problem image",
      image: "/api/placeholder/300/200",
      timestamp: new Date()
    };

    setMessages(prev => [...prev, imageMessage]);
    setShowPaymentModal(true);
  };

  const handlePaymentSuccess = () => {
    const aiResponse: Message = {
      id: Date.now().toString(),
      type: 'ai',
      content: "Great! Here's a step-by-step solution:\n\n**Step 1:** First, identify what type of problem this is. In this case, it's a multiplication word problem.\n\n**Step 2:** Extract the key information: 'Sarah has 4 bags with 6 apples each'.\n\n**Step 3:** Set up the multiplication: 4 × 6\n\n**Step 4:** Calculate: 4 × 6 = 24\n\n**Answer:** Sarah has 24 apples in total.\n\n**Learning tip:** Word problems often have key phrases like 'each', 'total', or 'altogether' that tell us what operation to use!",
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
                ? 'bg-primary text-primary-foreground' 
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
      <Card className="p-4 bg-white sticky bottom-4">
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
