import Articles from "@/components/Articles";
import Cta from "@/components/Cta";
import Herosection from "@/components/Herosection";

export default function Home() {
  return (
    <>
      <div className="w-full">
        <Herosection />
        <Articles />
        <Cta />
      </div>
    </>
  );
}
