
import { useState } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  type: 'user' | 'ai';
  content: string;
  image?: string;
  timestamp: Date;
}

export const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'ai',
      content: "Hi! I'm your friendly homework helper. You can upload a photo of your child's homework or type a question, and I'll provide a clear, step-by-step explanation. How can I help you today?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const sendMessage = async (content: string, image?: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content,
      image,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      console.log('Sending message to AI function...');

      // Get AI response
      const { data, error } = await supabase.functions.invoke('chat-ai', {
        body: {
          message: content,
          hasImage: !!image,
          userId: user.id
        }
      });

      console.log('AI function response:', data, 'error:', error);

      if (error) {
        console.error('Supabase function error:', error);
        throw new Error(`Function error: ${error.message}`);
      }

      if (!data || !data.response) {
        console.error('Invalid response data:', data);
        throw new Error('Invalid response from AI service');
      }

      // Store the question in the database (optional, don't fail if it doesn't work)
      try {
        const { error: dbError } = await supabase
          .from('questions')
          .insert({
            user_id: user.id,
            question_text: content,
            image_url: image || null,
            parent_name: user.user_metadata?.parent_name || 'Anonymous'
          });

        if (dbError) {
          console.error('Database error (non-critical):', dbError);
        }
      } catch (dbError) {
        console.error('Database insert failed (non-critical):', dbError);
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: data.response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, aiMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to get AI response. Please try again.",
        variant: "destructive"
      });
      
      // Add error message to chat
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'ai',
        content: "I'm sorry, I'm having trouble responding right now. Please check that your OpenAI API key is properly configured and try again in a moment.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const uploadImage = async (file: File): Promise<string | null> => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const fileName = `${user.id}/${Date.now()}-${file.name}`;
      
      const { data, error } = await supabase.storage
        .from('homework-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('homework-images')
        .getPublicUrl(data.path);

      return urlData.publicUrl;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast({
        title: "Upload Error",
        description: "Failed to upload image. Please try again.",
        variant: "destructive"
      });
      return null;
    }
  };

  return {
    messages,
    isLoading,
    sendMessage,
    uploadImage
  };
};
