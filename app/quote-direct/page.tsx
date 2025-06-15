"use client";

import { useState } from "react";
import { MainLayout } from "@/components/main-layout";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function QuoteDirectPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    destination: "",
    duration: "",
    groupSize: "",
    message: ""
  });

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const whatsappNumber = "919371131975";
    const message = encodeURIComponent(`
*Quote Request*
Name: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone}
Destination: ${formData.destination}
Duration: ${formData.duration}
Group Size: ${formData.groupSize}
Message: ${formData.message}
    `);
    
    const whatsappUrl = `https://api.whatsapp.com/send?phone=${whatsappNumber}&text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <MainLayout>
      <div className="container max-w-3xl mx-auto py-10">
        <div className="bg-white rounded-2xl shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Get Your Free Quote</h1>
            <p className="text-gray-600">Fill out the form and we'll get back to you within 24 hours</p>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <Input 
                  className="bg-blue-50"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
                <Input
                  type="email"
                  className="bg-blue-50"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <Input
                  type="tel"
                  className="bg-blue-50"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <Select value={formData.destination} onValueChange={(value) => handleChange("destination", value)}>
                  <SelectTrigger className="bg-blue-50">
                    <SelectValue placeholder="Select destination" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Rajasthan">Rajasthan</SelectItem>
                    <SelectItem value="Kerala">Kerala</SelectItem>
                    <SelectItem value="Goa">Goa</SelectItem>
                    <SelectItem value="Ladakh">Ladakh</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Number of Travelers</label>
                <Select value={formData.groupSize} onValueChange={(value) => handleChange("groupSize", value)}>
                  <SelectTrigger className="bg-blue-50">
                    <SelectValue placeholder="Select group size" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1 Person">1 Person</SelectItem>
                    <SelectItem value="2 People">2 People</SelectItem>
                    <SelectItem value="3-5 People">3-5 People</SelectItem>
                    <SelectItem value="6+ People">6+ People</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                <Select value={formData.duration} onValueChange={(value) => handleChange("duration", value)}>
                  <SelectTrigger className="bg-blue-50">
                    <SelectValue placeholder="Select duration" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1-3 Days">1-3 Days</SelectItem>
                    <SelectItem value="4-7 Days">4-7 Days</SelectItem>
                    <SelectItem value="8-14 Days">8-14 Days</SelectItem>
                    <SelectItem value="15+ Days">15+ Days</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Tell us about your preferences</label>
              <Textarea
                className="bg-blue-50"
                value={formData.message}
                onChange={(e) => handleChange("message", e.target.value)}
                rows={4}
              />
            </div>
            
            <div className="flex justify-center mt-8">
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white text-lg py-4 rounded-xl font-medium"
              >
                Get My Free Quote ➤
              </button>
            </div>
          </form>
        </div>
      </div>
    </MainLayout>
  );
}
