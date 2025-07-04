
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/ChatInterface";
import { AuthForm } from "@/components/AuthForm";
import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";

const Chat = () => {
  const { user, loading, signOut } = useAuth();

  if (loading) {
    return (
      <Layout>
        <div className="container mx-auto py-8 bg-black min-h-screen flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return (
      <Layout>
        <div className="container mx-auto py-8 bg-black min-h-screen">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">
              Homework Helper Chat
            </h1>
            <p className="text-gray-300">
              Please sign in to start chatting with our AI homework helper
            </p>
          </div>
          <AuthForm onAuthSuccess={() => {}} />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container mx-auto py-8 bg-black min-h-screen">
        <div className="text-center mb-8">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold text-white">
              Homework Helper Chat
            </h1>
            <Button
              onClick={signOut}
              variant="outline"
              className="border-primary text-white hover:bg-primary hover:text-black"
            >
              Sign Out
            </Button>
          </div>
          <p className="text-gray-300">
            Upload a photo or type your question to get started
          </p>
        </div>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
