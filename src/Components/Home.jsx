import React from "react";
import Banner from "./Banner/Banner";
import Products from "./Products/Products";
import FeaturesPage from "@/app/features/page";
import CollectionsPage from "@/app/collections/page";
import AboutSection from "@/app/about-section/page";
import NewArrivalsPage from "@/app/new-arrivals/page";
import TestimonialsPage from "@/app/testimonials/page";

export default function HomePage() {
  return (
    <div>
      <Banner />
      <FeaturesPage />
      <CollectionsPage />
      <Products />
      <AboutSection />
      <NewArrivalsPage />
      <TestimonialsPage />
    </div>
  );
}
