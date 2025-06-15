"use client";

import { useWebsiteContent } from "@/lib/website-content-store";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export function EnhancedAdminPanel() {
  const {
    hero,
    featuredJourneys,
    testimonials,
    blog,
    addFeaturedTour,
    removeFeaturedTour,
    addBlogPost,
    removeBlogPost,
    addTestimonial,
    removeTestimonial,
    saveToServer,
    loadFromServer,
  } = useWebsiteContent();

  const [newTour, setNewTour] = useState({
    id: "",
    title: "",
    location: "",
    duration: "",
    groupSize: "",
    price: "",
    originalPrice: "",
    image: "",
    category: "",
    rating: 0,
    reviews: 0,
    highlights: [],
    discount: "",
    enabled: true,
  });

  const handleAddTour = () => {
    addFeaturedTour(newTour);
    setNewTour({
      id: "",
      title: "",
      location: "",
      duration: "",
      groupSize: "",
      price: "",
      originalPrice: "",
      image: "",
      category: "",
      rating: 0,
      reviews: 0,
      highlights: [],
      discount: "",
      enabled: true,
    });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Enhanced Admin Panel</h1>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Add New Tour</h2>
        <Input
          placeholder="Tour Title"
          value={newTour.title}
          onChange={(e) => setNewTour({ ...newTour, title: e.target.value })}
        />
        <Button onClick={handleAddTour} className="mt-2">
          Add Tour
        </Button>
      </section>

      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-2">Featured Tours</h2>
        {featuredJourneys.tours.map((tour) => (
          <div key={tour.id} className="flex items-center justify-between mb-2">
            <span>{tour.title}</span>
            <Button onClick={() => removeFeaturedTour(tour.id)} variant="destructive">
              Remove
            </Button>
          </div>
        ))}
      </section>

      <Button onClick={saveToServer} className="mt-4">
        Save Changes
      </Button>
    </div>
  );
}
