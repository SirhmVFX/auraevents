import Articles from "@/components/Articles";
import Cta from "@/components/Cta";
import Herosection from "@/components/Herosection";
import ServicesGrid from "@/components/ServicesGrid";
import Stats from "@/components/Stats";
import Testimonials from "@/components/Testimonials";
import Newsletter from "@/components/Newsletter";
import Process from "@/components/Process";
import MemberRewards from "@/components/MemberRewards";
import PortfolioGallery from "@/components/PortfolioGallery";
import BeforeAfter from "@/components/BeforeAfter";
import BudgetEstimator from "@/components/BudgetEstimator";
import VendorPartners from "@/components/VendorPartners";
import AvailabilityCalendar from "@/components/AvailabilityCalendar";
import MoodboardBuilder from "@/components/MoodboardBuilder";
import PackageComparison from "@/components/PackageComparison";

export default function Home() {
  return (
    <div className="w-full">
      <Herosection />
      <Stats />
      <ServicesGrid />
      <PortfolioGallery />
      <BeforeAfter />
      <Testimonials />
      <BudgetEstimator />
      <AvailabilityCalendar />
      <MoodboardBuilder />
      <VendorPartners />
      <PackageComparison />
      <MemberRewards />
      <Process />
      <Articles />
      <Newsletter />
      <Cta />
    </div>
  );
}
