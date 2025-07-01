
import { Layout } from "@/components/Layout";
import { PricingSection } from "@/components/PricingSection";

const Pricing = () => {
  return (
    <Layout>
      <div className="py-8 bg-black min-h-screen">
        <PricingSection />
      </div>
    </Layout>
  );
};

export default Pricing;
