
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message, hasImage, userId } = await req.json();
    
    const openAIApiKey = Deno.env.get('OPENAI_API_KEY');
    if (!openAIApiKey) {
      throw new Error('OpenAI API key not configured');
    }

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_ANON_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `You are a friendly homework helper AI assistant. Your goal is to help students and parents with homework questions by providing clear, step-by-step explanations. 

Guidelines:
- Always provide educational explanations rather than just answers
- Break down complex problems into simple steps
- Use encouraging and supportive language
- For math problems, show the work step by step
- For science questions, explain the concepts clearly
- For writing tasks, provide structure and guidance
- Always aim to help the student learn, not just complete the assignment

Format your responses with clear sections using **bold** for headings when appropriate.`
          },
          {
            role: 'user',
            content: hasImage 
              ? `I've uploaded a homework problem image. The question is: ${message}. Please help me understand how to solve this step by step.`
              : message
          }
        ],
        temperature: 0.7,
        max_tokens: 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.status}`);
    }

    const data = await response.json();
    const aiResponse = data.choices[0].message.content;

    // Store the question and response in the database if user is authenticated
    if (userId) {
      await supabase.from('questions').insert({
        user_id: userId,
        question_text: message,
        parent_name: 'Anonymous', // You can update this with actual parent name
        created_at: new Date().toISOString()
      });
    }

    return new Response(JSON.stringify({ response: aiResponse }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chat-ai function:', error);
    return new Response(
      JSON.stringify({ 
        error: 'Sorry, I encountered an error. Please try again.',
        details: error.message 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});
