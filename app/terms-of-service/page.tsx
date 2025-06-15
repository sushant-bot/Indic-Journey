import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { FileText, Check, AlertTriangle } from "lucide-react"

export default function TermsOfServicePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-blue-500 to-blue-600">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold bg-yellow-400 text-blue-800 rounded-full">
            <FileText className="h-4 w-4 mr-2" />
            <span>Legal Information</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Terms of Service
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            The terms and conditions governing the use of our services and website.
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1440,37.3L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Terms of Service Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <FileText className="mr-2 h-6 w-6 text-blue-600" />
                  Last Updated: June 15, 2025
                </h2>
              </div>
              <CardContent className="p-6 lg:p-8">
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                  <h2>Acceptance of Terms</h2>
                  <p>
                    By accessing and using the services provided by Indic Journeys ("we," "our," or "us"), you accept and agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
                  </p>

                  <h2>Services Description</h2>
                  <p>
                    Indic Journeys provides travel planning services, tour arrangements, and related services as described on our website. We act as an intermediary between you and various travel service providers such as hotels, transportation companies, and local guides.
                  </p>

                  <h2>Booking and Payment</h2>
                  <div className="grid sm:grid-cols-1 gap-6 mt-6 mb-6">
                    {[
                      {
                        title: "Deposits and Payments",
                        description:
                          "Most tours require a non-refundable deposit at the time of booking, with full payment due 60 days before departure. For bookings made within 60 days of departure, full payment is required at the time of booking.",
                      },
                      {
                        title: "Payment Methods",
                        description:
                          "We accept payments via credit card, bank transfer, and other methods specified at the time of booking. All prices are quoted in Indian Rupees (INR) unless otherwise specified.",
                      },
                      {
                        title: "Price Changes",
                        description:
                          "Prices are subject to change until full payment is received. We reserve the right to adjust prices due to currency fluctuations, government actions, or increased operational costs.",
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-blue-50 p-4 rounded-lg">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          <Check className="h-5 w-5 mr-2 text-blue-600" />
                          {item.title}
                        </h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  <h2>Booking Modifications and Cancellations</h2>
                  <p>
                    Changes to bookings are subject to availability and may incur additional fees. Cancellation policies vary by tour and are detailed in your booking confirmation. Please refer to our separate Cancellation Policy for detailed information.
                  </p>

                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertTriangle className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          We strongly recommend purchasing comprehensive travel insurance to protect against unexpected cancellations, medical emergencies, and other travel-related risks.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2>Travel Documents</h2>
                  <p>
                    You are responsible for obtaining all necessary travel documents, including valid passports, visas, and health certificates. We are not responsible for any issues arising from inadequate travel documentation.
                  </p>

                  <h2>Liability and Limitation</h2>
                  <p>
                    Indic Journeys acts as an intermediary between travelers and service providers. We are not liable for:
                  </p>
                  <ul>
                    <li>Acts, errors, omissions, representations, or negligence of any third-party suppliers</li>
                    <li>Personal injury, property damage, or other losses resulting from activities undertaken during travel</li>
                    <li>Delays, cancellations, or changes made by third-party suppliers</li>
                    <li>Force majeure events including natural disasters, health crises, political instability, or other circumstances beyond our control</li>
                  </ul>
                  
                  <h2>Traveler Conduct</h2>
                  <p>
                    You agree to comply with all local laws and regulations during your travel. We reserve the right to terminate services if your conduct is deemed inappropriate, illegal, or disruptive to others. No refunds will be provided in such cases.
                  </p>

                  <h2>Intellectual Property</h2>
                  <p>
                    All content on our website, including text, graphics, logos, images, and software, is the property of Indic Journeys or our content suppliers and is protected by copyright laws. You may not reproduce, distribute, or create derivative works from this content without explicit permission.
                  </p>

                  <h2>Dispute Resolution</h2>
                  <p>
                    Any disputes arising from these terms or our services shall be resolved through good-faith negotiations. If negotiations fail, disputes will be subject to the exclusive jurisdiction of the courts in Pune, Maharashtra, India.
                  </p>

                  <h2>Modifications to Terms</h2>
                  <p>
                    We reserve the right to modify these terms at any time. Changes will be effective immediately upon posting on our website. Your continued use of our services after changes constitutes acceptance of the modified terms.
                  </p>

                  <h2>Contact Us</h2>
                  <p>
                    If you have any questions about these Terms of Service, please contact us at:
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
