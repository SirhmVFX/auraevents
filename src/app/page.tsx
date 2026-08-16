import Articles from "@/components/Articles";
import Cta from "@/components/Cta";
import Herosection from "@/components/Herosection";
import ServicesGrid from "@/components/ServicesGrid";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Process from "@/components/Process";
import PortfolioGallery from "@/components/PortfolioGallery";
import VendorPartners from "@/components/VendorPartners";
import BudgetEstimator from "@/components/BudgetEstimator";

export default function Home() {
  return (
    <div className="w-full">
      <Herosection />
      <BudgetEstimator />
      <Stats />
      <ServicesGrid />
      <PortfolioGallery />
      <Testimonials />
      <VendorPartners />
      <Process />
      <Articles />
      <Newsletter />
      <Cta />
    </div>
  );
}
