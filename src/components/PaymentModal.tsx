
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, Check, CreditCard } from "lucide-react";

interface PaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export const PaymentModal = ({ isOpen, onClose, onSuccess }: PaymentModalProps) => {
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedOption, setSelectedOption] = useState<'pay-per-question' | 'monthly'>('pay-per-question');

  if (!isOpen) return null;

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50 animate-scale-in">
      <Card className="w-full max-w-md bg-white p-6 relative">
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="absolute top-4 right-4"
        >
          <X className="w-4 h-4" />
        </Button>

        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-warm-gradient rounded-full flex items-center justify-center mx-auto mb-4">
            <CreditCard className="w-8 h-8 text-white" />
          </div>
          <h3 className="text-lg font-semibold mb-2">Get Your Answer</h3>
          <p className="text-sm text-muted-foreground">
            Choose how you'd like to access our AI homework help
          </p>
        </div>

        <div className="space-y-3 mb-6">
          <Card 
            className={`p-4 cursor-pointer border-2 transition-colors ${
              selectedOption === 'pay-per-question' 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedOption('pay-per-question')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Per Question</h4>
                <p className="text-sm text-muted-foreground">KES 5 - One detailed answer</p>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === 'pay-per-question' ? 'border-primary bg-primary' : 'border-border'
              }`}>
                {selectedOption === 'pay-per-question' && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
          </Card>

          <Card 
            className={`p-4 cursor-pointer border-2 transition-colors ${
              selectedOption === 'monthly' 
                ? 'border-primary bg-primary/5' 
                : 'border-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedOption('monthly')}
          >
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">Monthly Plan</h4>
                <p className="text-sm text-muted-foreground">KES 500 - Unlimited questions</p>
                <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full">
                  Best Value
                </span>
              </div>
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                selectedOption === 'monthly' ? 'border-primary bg-primary' : 'border-border'
              }`}>
                {selectedOption === 'monthly' && <Check className="w-3 h-3 text-white" />}
              </div>
            </div>
          </Card>
        </div>

        <Button
          onClick={handlePayment}
          disabled={isProcessing}
          className="w-full bg-warm-gradient text-white"
        >
          {isProcessing ? (
            <div className="flex items-center">
              <div className="animate-spin w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2" />
              Processing...
            </div>
          ) : (
            `Pay ${selectedOption === 'pay-per-question' ? 'KES 5' : 'KES 500'}`
          )}
        </Button>

        <p className="text-xs text-muted-foreground text-center mt-4">
          Secure payment powered by M-Pesa & Card payments
        </p>
      </Card>
    </div>
  );
};
