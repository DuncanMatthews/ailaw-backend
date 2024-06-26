import { Metadata } from "next";
import Hero from "@/components/Hero";
import Brands from "@/components/Brands";
import Feature from "@/components/Features";
import About from "@/components/About";
import FeaturesTab from "@/components/FeaturesTab";
import FunFact from "@/components/FunFact";
import Integration from "@/components/Integration";
import CTA from "@/components/CTA";
import FAQ from "@/components/FAQ";
import Pricing from "@/components/Pricing";
import Contact from "@/components/Contact";
import Blog from "@/components/Blog";
import Testimonial from "@/components/Testimonial";

export const metadata: Metadata = {
  title: "AI Lawyer - Revolutionizing Legal Research for South African Lawyers",
  description: "AI Lawyer is a cutting-edge SaaS tool designed specifically for South African legal professionals. Harness the power of AI to quickly identify relevant case law, legislation, and legal principles from local databases, supporting your legal strategy. With multilingual support, customizable searches, and a user-friendly interface, AI Lawyer streamlines your research process and helps you build stronger cases.",
  };

export default function Home() {
  return (
    <main>
      <Hero />
      {/* <Brands />
      <Feature /> */}
      {/* <About /> */}
      {/* <FeaturesTab /> */}
      {/* <FunFact /> */}
      {/* <Integration /> */}
      {/* <CTA />
      <FAQ /> */}
      {/* <Testimonial /> */}
      {/* <Pricing /> */}
      {/* <Contact />
      <Blog /> */}
    </main>
  );
}
