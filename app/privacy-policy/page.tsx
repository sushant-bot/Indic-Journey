import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, Check } from "lucide-react"

export default function PrivacyPolicyPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-orange-500 to-orange-600">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold bg-yellow-400 text-orange-800 rounded-full">
            <Shield className="h-4 w-4 mr-2" />
            <span>Legal Information</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Privacy Policy
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            How we collect, use, and protect your personal information when you use our services.
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1440,37.3L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Privacy Policy Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Shield className="mr-2 h-6 w-6 text-orange-600" />
                  Last Updated: June 15, 2025
                </h2>
              </div>
              <CardContent className="p-6 lg:p-8">
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                  <h2>Introduction</h2>
                  <p>
                    Indic Journeys ("we," "our," or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website or use our services.
                  </p>

                  <h2>Information We Collect</h2>
                  <p>We may collect the following types of information:</p>
                  <ul>
                    <li><strong>Personal Identification Information:</strong> Name, email address, phone number, and other contact information when you fill out our inquiry forms.</li>
                    <li><strong>Travel Preferences:</strong> Information about your travel plans, preferences, and requirements.</li>
                    <li><strong>Payment Information:</strong> Credit card details, billing address, and other financial information necessary for transaction processing.</li>
                    <li><strong>Usage Data:</strong> Information about how you interact with our website, including browser type, IP address, pages visited, and time spent.</li>
                    <li><strong>Cookies:</strong> Small data files stored on your device to enhance your browsing experience.</li>
                  </ul>

                  <h2>How We Use Your Information</h2>
                  <div className="grid sm:grid-cols-2 gap-6 mt-6 mb-6">
                    {[
                      {
                        title: "Provide Services",
                        description:
                          "To process your bookings, arrange tours, and provide customer support",
                      },
                      {
                        title: "Personalization",
                        description:
                          "To tailor our offerings and provide personalized travel recommendations",
                      },
                      {
                        title: "Communication",
                        description:
                          "To respond to inquiries and send updates about your bookings or services",
                      },
                      {
                        title: "Improvement",
                        description:
                          "To analyze usage patterns and enhance our website functionality and services",
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-orange-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Check className="h-5 w-5 mr-2 text-orange-600" />
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  <h2>Information Sharing and Disclosure</h2>
                  <p>
                    We may share your information with third parties in the following situations:
                  </p>
                  <ul>
                    <li><strong>Travel Partners:</strong> Hotels, transportation providers, and local guides necessary to fulfill your travel arrangements.</li>
                    <li><strong>Service Providers:</strong> Payment processors, IT service providers, and other vendors who help us operate our business.</li>
                    <li><strong>Legal Compliance:</strong> When required by applicable law, court orders, or governmental regulations.</li>
                  </ul>
                  
                  <h2>Data Security</h2>
                  <p>
                    We implement reasonable security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
                  </p>

                  <h2>Your Privacy Rights</h2>
                  <p>Depending on your location, you may have the right to:</p>
                  <ul>
                    <li>Access personal information we have about you</li>
                    <li>Correct inaccuracies in your personal information</li>
                    <li>Request deletion of your personal information</li>
                    <li>Object to or restrict processing of your personal information</li>
                    <li>Request transfer of your personal information</li>
                  </ul>

                  <h2>Children's Privacy</h2>
                  <p>
                    Our services are not directed at individuals under 18 years of age. We do not knowingly collect personal information from children. If you become aware that a child has provided us with personal information, please contact us.
                  </p>

                  <h2>Changes to This Privacy Policy</h2>
                  <p>
                    We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the "Last Updated" date.
                  </p>

                  <h2>Contact Us</h2>
                  <p>
                    If you have any questions about this Privacy Policy, please contact us at:
                  </p>
                  <p>
                    <strong>Email:</strong> indicjourneys@gmail.com<br />
                    <strong>Phone:</strong> +91-9371131975<br />
                    <strong>Address:</strong> 403 - Anandvan Residency, Lane A-31, Opp. Moti Bakery, Dhayari - 411041
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </MainLayout>
  )
}
