import { MainLayout } from "@/components/main-layout"
import { Card, CardContent } from "@/components/ui/card"
import { Calendar, Info, AlertCircle, Clock, Check, X } from "lucide-react"

export default function CancellationPolicyPage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-16 lg:py-24 bg-gradient-to-r from-red-500 to-red-600">
        <div className="absolute top-20 left-20 w-72 h-72 bg-yellow-400/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-orange-500/10 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative z-10 text-center text-white">
          <div className="inline-flex items-center justify-center px-4 py-1.5 mb-6 text-sm font-semibold bg-yellow-400 text-red-800 rounded-full">
            <Calendar className="h-4 w-4 mr-2" />
            <span>Legal Information</span>
          </div>
          <h1 className="text-5xl lg:text-7xl font-bold mb-6">
            Cancellation Policy
          </h1>
          <p className="text-xl max-w-3xl mx-auto">
            Our policies regarding trip cancellations, refunds, and rebooking options.
          </p>
        </div>
        
        <div className="absolute bottom-0 left-0 right-0">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100" className="w-full">
            <path fill="#ffffff" fillOpacity="1" d="M0,32L80,42.7C160,53,320,75,480,74.7C640,75,800,53,960,42.7C1120,32,1280,32,1440,37.3L1440,100L1360,100C1280,100,1120,100,960,100C800,100,640,100,480,100C320,100,160,100,80,100L0,100Z"></path>
          </svg>
        </div>
      </section>

      {/* Cancellation Policy Content */}
      <section className="py-16 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <Card className="shadow-lg border-0 overflow-hidden mb-12">
              <div className="bg-gradient-to-r from-red-50 to-orange-50 px-6 py-4 border-b">
                <h2 className="text-2xl font-bold text-gray-800 flex items-center">
                  <Calendar className="mr-2 h-6 w-6 text-red-600" />
                  Last Updated: June 15, 2025
                </h2>
              </div>
              <CardContent className="p-6 lg:p-8">
                <div className="prose prose-lg max-w-none prose-headings:font-bold prose-headings:text-gray-800 prose-p:text-gray-600 prose-li:text-gray-600">
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <Info className="h-5 w-5 text-yellow-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-yellow-700">
                          <strong>Important:</strong> Please review this cancellation policy carefully before making a booking. By confirming your reservation, you agree to these cancellation terms.
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  <h2>Cancellation Policy Overview</h2>
                  <p>
                    We understand that travel plans can change. Our cancellation policy is designed to be fair while covering our commitments to travel partners and service providers. Different tour types have different cancellation terms, as detailed below.
                  </p>

                  <h2>Fixed Departure Tours</h2>
                  <div className="overflow-x-auto mt-6 mb-6">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Clock className="inline-block mr-1 h-4 w-4" /> Days Before Departure
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cancellation Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">60+ days</td>
                          <td className="px-6 py-4 whitespace-nowrap">25% of total tour price</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">45-59 days</td>
                          <td className="px-6 py-4 whitespace-nowrap">50% of total tour price</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">30-44 days</td>
                          <td className="px-6 py-4 whitespace-nowrap">75% of total tour price</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">Less than 30 days</td>
                          <td className="px-6 py-4 whitespace-nowrap">100% of total tour price</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">No-show</td>
                          <td className="px-6 py-4 whitespace-nowrap">100% of total tour price</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2>Customized Holidays</h2>
                  <p>
                    For customized holidays, our cancellation policies consider the specific terms from our travel partners for your itinerary. Generally, these terms apply:
                  </p>
                  <div className="overflow-x-auto mt-6 mb-6">
                    <table className="min-w-full border border-gray-200 rounded-lg">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            <Clock className="inline-block mr-1 h-4 w-4" /> Days Before Departure
                          </th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                            Cancellation Fee
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">90+ days</td>
                          <td className="px-6 py-4 whitespace-nowrap">Initial deposit (non-refundable)</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">60-89 days</td>
                          <td className="px-6 py-4 whitespace-nowrap">35% of total tour price</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">30-59 days</td>
                          <td className="px-6 py-4 whitespace-nowrap">65% of total tour price</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap">Less than 30 days</td>
                          <td className="px-6 py-4 whitespace-nowrap">100% of total tour price</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>

                  <h2>Heritage Walks</h2>
                  <div className="grid sm:grid-cols-2 gap-6 mt-6 mb-6">
                    {[
                      {
                        title: "48+ Hours Notice",
                        description:
                          "Full refund minus administrative fee of ₹500 per person",
                        icon: <Check className="h-5 w-5 text-green-600" />,
                      },
                      {
                        title: "24-48 Hours Notice",
                        description:
                          "50% refund of total booking amount",
                        icon: <Check className="h-5 w-5 text-yellow-600" />,
                      },
                      {
                        title: "Less than 24 Hours Notice",
                        description:
                          "No refund available",
                        icon: <X className="h-5 w-5 text-red-600" />,
                      },
                      {
                        title: "No-Show",
                        description:
                          "No refund available",
                        icon: <X className="h-5 w-5 text-red-600" />,
                      },
                    ].map((item, index) => (
                      <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                        <h4 className="font-semibold text-gray-800 mb-2 flex items-center">
                          {item.icon}
                          <span className="ml-2">{item.title}</span>
                        </h4>
                        <p className="text-gray-600 text-sm">{item.description}</p>
                      </div>
                    ))}
                  </div>

                  <h2>Date Changes and Tour Transfers</h2>
                  <p>
                    Requests to change travel dates or transfer to a different tour are subject to availability and may incur additional charges:
                  </p>
                  <ul>
                    <li><strong>60+ days before departure:</strong> Administrative fee of ₹5,000 per person</li>
                    <li><strong>30-59 days before departure:</strong> Administrative fee of ₹10,000 per person</li>
                    <li><strong>Less than 30 days before departure:</strong> Treated as a cancellation and new booking</li>
                  </ul>

                  <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 mt-6">
                    <div className="flex">
                      <div className="flex-shrink-0">
                        <AlertCircle className="h-5 w-5 text-red-600" />
                      </div>
                      <div className="ml-3">
                        <p className="text-sm text-red-700">
                          <strong>Please Note:</strong> Any airline tickets, train tickets, or other transportation bookings are subject to the cancellation policies of the respective companies, which may be different from our policy.
                        </p>
                      </div>
                    </div>
                  </div>

                  <h2>Cancellations by Indic Journeys</h2>
                  <p>
                    We reserve the right to cancel any tour for reasons including but not limited to insufficient participation, force majeure events, or safety concerns. In such cases:
                  </p>
                  <ul>
                    <li>You will receive a full refund of the amount paid to us</li>
                    <li>Or, you may choose to transfer to another available tour or receive a credit for future travel</li>
                    <li>We are not responsible for additional expenses incurred by participants in preparing for the tour (e.g., non-refundable airline tickets, visa fees, gear, or medical expenses)</li>
                  </ul>

                  <h2>Travel Insurance</h2>
                  <p>
                    We strongly recommend purchasing comprehensive travel insurance that includes trip cancellation coverage. This can protect your investment if you need to cancel for covered reasons such as illness, injury, or other unforeseen circumstances.
                  </p>

                  <h2>How to Request a Cancellation</h2>
                  <p>
                    All cancellation requests must be submitted in writing to indicjourneys@gmail.com. The date of receipt of the email will be used to calculate any applicable cancellation fees.
                  </p>

                  <h2>Refund Processing</h2>
                  <p>
                    Eligible refunds will be processed within 30 business days of receiving your cancellation request. Refunds will be issued using the original payment method when possible.
                  </p>

                  <h2>Contact Us</h2>
                  <p>
                    If you have questions about our cancellation policy, please contact us at:
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
