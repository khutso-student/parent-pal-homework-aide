
import { Layout } from "@/components/Layout";
import { ChatInterface } from "@/components/ChatInterface";

const Chat = () => {
  return (
    <Layout>
      <div className="container mx-auto py-8">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Homework Helper Chat
          </h1>
          <p className="text-muted-foreground">
            Upload a photo or type your question to get started
          </p>
        </div>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
