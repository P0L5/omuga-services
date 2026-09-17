import SmoothScroll from "@/components/smooth-scroll";
import Preloader from "@/components/preloader";
import SiteNav from "@/components/site-nav";
import Hero from "@/components/sections/hero";
import Marquee from "@/components/sections/marquee";
import About from "@/components/sections/about";
import Services from "@/components/sections/services";
import Properties from "@/components/sections/properties";
import MediaGallery from "@/components/sections/media-gallery";
import VideoTours from "@/components/sections/video-tours";
import Concierge from "@/components/sections/concierge";
import WhyUs from "@/components/sections/why-us";
import Testimonials from "@/components/sections/testimonials";
import Faq from "@/components/sections/faq";
import Cta from "@/components/sections/cta";
import Contact from "@/components/sections/contact";
import SiteFooter from "@/components/site-footer";
import WhatsAppFloat from "@/components/whatsapp-float";

export default function Home() {
  return (
    <SmoothScroll>
      <Preloader />
      <SiteNav />
      <main className="flex-1">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Properties />
        <MediaGallery />
        <VideoTours />
        <Concierge />
        <WhyUs />
        <Testimonials />
        <Faq />
        <Cta />
        <Contact />
      </main>
      <SiteFooter />
      <WhatsAppFloat />
    </SmoothScroll>
  );
}
