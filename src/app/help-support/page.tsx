"use client";
import React, { useState } from "react";
import matter from "gray-matter";
import { text } from "./_markdown/text";
import SearchBar from "./_components/SearchBar";
import Card from "./_components/Card";
import { onboarding } from "./_markdown/onboarding";
import { onboardingCrew } from "./_markdown/onboarding-crew";
import { producerDashboard } from "./_markdown/dashboard-producer";
import { crewDashboard } from "./_markdown/crew-dashboard";
import { aiCopilot } from "./_markdown/ai-copilot";
import { marketplace } from "./_markdown/marketplace";
import Image from "next/image";

// Parse metadata and content from markdown
const markdownFiles = [
  { slug: "text", title: "Introduction to Storyvord", content: matter(text) },
  {
    slug: "onboarding",
    title: "Guide for Onboarding Producers on Storyvord",
    content: matter(onboarding),
  },
  {
    slug: "onboarding-crew",
    title: "Guide for Onboarding Crew Members on Storyvord",
    content: matter(onboardingCrew),
  },
  {
    slug: "producer-dashboard",
    title: "Guide for Using the Producer Dashboard on Storyvord",
    content: matter(producerDashboard),
  },
  {
    slug: "crew-dashboard",
    title: "Guide for Using the Crew Dashboard on Storyvord",
    content: matter(crewDashboard),
  },
  {
    slug: "ai-copilot",
    title: "Guide for Using the AI Copilot on Storyvord",
    content: matter(aiCopilot),
  },
  {
    slug: "marketplace",
    title: "Guide for Using the Marketplace on Storyvord",
    content: matter(marketplace),
  },
];

const HelpAndSupport: React.FC = () => {
  const [filteredArticles, setFilteredArticles] = useState(markdownFiles);

  console.log(filteredArticles);

  const handleSearch = (query: string) => {
    const filtered = markdownFiles.filter((file) =>
      file.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredArticles(filtered);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 flex-grow w-full">
      <div className=" bg-[#0A0A41]  text-white p-5 rounded-lg flex justify-between px-8">
        <div className=" flex-1 md:flex-[0.7]">
          <h3 className="text-lg mb-2 hidden">Help Center</h3>
          <h1 className="text-3xl font-bold mb-4">Find solutions fast.</h1>
          <h3 className="mb-4">Search hundreds of articles on Storyvord Help</h3>
          <SearchBar onSearch={handleSearch} />
          <div className="mt-4">
            <span className="bg-gray-300 text-gray-800 py-1 px-3 rounded-full mr-2 cursor-pointer">
              Popular: connects
            </span>
            <span className="bg-gray-300 text-gray-800 py-1 px-3 rounded-full mr-2 cursor-pointer">
              work diary
            </span>
            <span className="bg-gray-300 text-gray-800 py-1 px-3 rounded-full cursor-pointer">
              get paid
            </span>
          </div>
        </div>
        <Image
          src="/support.svg"
          alt=""
          width={50}
          height={50}
          className=" hidden md:block w-72 h-fit mr-8"
        />
      </div>
      <h2 className="text-3xl font-poppins-semibold my-6 mb-4">
        Choose an article for personalized service
      </h2>
      <hr />
      <div className="mt-4 grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredArticles.map((file) => (
          <Card
            key={file.slug}
            title={file.title}
            slug={file.slug}
            description={file.content.data.description}
          />
        ))}
      </div>
    </div>
  );
};

export default HelpAndSupport;
