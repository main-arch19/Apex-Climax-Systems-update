import HVACScroll from "@/components/HVACScroll";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

export default function Home() {
    return (
        <main className="min-h-screen bg-[#0A0A0A]">
            {/* 
        Scroll Section:
        This component handles the 500vh scroll height internally.
      */}
            <HVACScroll />

            {/* Static Content follows naturally after the scroll section ends */}
            <Testimonials />

            <Footer />
        </main>
    );
}
