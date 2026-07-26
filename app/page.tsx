import { RevealEngine } from "@/components/RevealEngine";
import { Hero } from "@/components/Hero";
import { Firm } from "@/components/Firm";
import { Strategies } from "@/components/Strategies";
import { Record } from "@/components/Record";
import { Statement } from "@/components/Statement";
import { Reach } from "@/components/Reach";
import { People } from "@/components/People";
import { Insights } from "@/components/Insights";
import { Contact } from "@/components/Contact";

export default function Home() {
  return (
    <>
      <RevealEngine />
      <Hero />
      <Firm />
      <Strategies />
      <Record />
      <Statement />
      <Reach />
      <People />
      <Insights />
      <Contact />
    </>
  );
}
