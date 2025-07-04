
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import { Camera, Send } from "lucide-react";
import { PaymentModal } from "./PaymentModal";
import { useChat } from "@/hooks/useChat";

export const ChatInterface = () => {
  const [inputText, setInputText] = useState("");
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const { messages, isLoading, sendMessage, uploadImage } = useChat();

  const handleSendMessage = async () => {
    if (!inputText.trim()) return;
    
    await sendMessage(inputText);
    setInputText("");
  };

  const handleImageUpload = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';
    fileInput.onchange = async (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (file) {
        const imageUrl = await uploadImage(file);
        if (imageUrl) {
          await sendMessage("I've uploaded a homework problem image. Can you help me solve this?", imageUrl);
        }
      }
    };
    fileInput.click();
  };

  const handlePaymentSuccess = () => {
    const aiResponse = {
      id: Date.now().toString(),
      type: 'ai' as const,
      content: "Thank you for your payment! I'm now providing you with a detailed solution:\n\n**Complete Step-by-Step Solution:**\n\n**Step 1:** [Detailed explanation of the first step]\n\n**Step 2:** [Detailed explanation of the second step]\n\n**Step 3:** [Final calculation or conclusion]\n\n**Answer:** [Final answer with explanation]\n\n**Learning tip:** [Additional insight to help with similar problems]\n\n**Practice suggestion:** Try solving a similar problem to reinforce your understanding!",
      timestamp: new Date()
    };
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
                ? 'bg-primary text-black' 
                : 'bg-gray-900 border-primary text-white'
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
            <Card className="max-w-xs p-4 bg-gray-900 border-primary">
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
      <Card className="p-4 bg-gray-900 sticky bottom-4 border-primary">
        <div className="flex items-end space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handleImageUpload}
            className="shrink-0 border-primary text-white hover:bg-primary hover:text-black"
            disabled={isLoading}
          >
            <Camera className="w-4 h-4" />
          </Button>
          <div className="flex-1">
            <Textarea
              placeholder="Type your homework question here..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="min-h-[60px] resize-none bg-black border-primary text-white placeholder:text-gray-400"
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSendMessage();
                }
              }}
              disabled={isLoading}
            />
          </div>
          <Button
            onClick={handleSendMessage}
            disabled={!inputText.trim() || isLoading}
            className="bg-primary text-black hover:bg-primary/90 shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
        <p className="text-xs text-gray-400 mt-2 text-center">
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
