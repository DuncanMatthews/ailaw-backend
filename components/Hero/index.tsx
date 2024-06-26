"use client";
import { useState } from "react";
import { Button } from "../ui/button";
import Link from "next/link";



const Hero = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();
  };

  return (
    <>
      <section className="overflow-hidden pb-20 pt-35 md:pt-40 xl:pb-25 xl:pt-46">
        <div className="mx-auto max-w-c-1390 px-4 md:px-8 2xl:px-0">
          <div className="flex lg:items-center lg:gap-8 xl:gap-32.5">
            <div className="md:w-1/2">
              <h4 className="mb-4.5 text-lg font-medium text-black dark:text-white">
                🚀 AI Lawyer - Revolutionizing Legal Research
              </h4>
              <h1 className="mb-5 pr-16 text-3xl font-bold text-black dark:text-white xl:text-hero ">
                AI-Powered Legal Research for {"   "}
                <span className="relative inline-block before:absolute before:bottom-2.5 before:left-0 before:-z-1 before:h-3 before:w-full before:bg-titlebg dark:before:bg-titlebgdark ">
                  Lawyers
                </span>
              </h1>
              <p>
                AI Lawyer - Designed specifically for South African legal professionals, AI Lawyer harnesses the power of AI to quickly identify relevant case law, legislation, and legal principles from SA Law databases.
              </p>
              <div className="mt-10">
                <Link href='/dashboard'>
                  <Button className="p-6 text-white text-xl" >
                    Try it Now
                  </Button>
                </Link>
              </div>
            </div>

            <div className="animate_right hidden md:w-1/2 lg:block">
            <iframe 
  width="560" 
  height="315" 
  src="https://www.youtube.com/embed/bCHvPjSP3rQ?si=JMpyhmuQLrqsUYc2&rel=0&modestbranding=1" 
  title="YouTube video player" 
  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
  referrerPolicy="strict-origin-when-cross-origin" 
></iframe>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hero;