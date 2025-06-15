import QuoteForm from "@/components/quote-request-form"

export default function QuoteRequestPage() {
  return (
    <div className="container mx-auto px-4 py-12 md:py-24">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">Request a Quote</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Fill out the form below to get a customized quote for your perfect journey. Our team will get back to you within 24 hours with a detailed proposal.
          </p>
        </div>
        
        <QuoteForm />
        
        <div className="mt-12 text-center text-gray-500">
          <p>
            Have questions? Contact us directly at <a href="tel:+919XXXXXXXXX" className="text-blue-600 hover:underline">+91 9XXXXXXXXX</a> or <a href="mailto:info@yourdomain.com" className="text-blue-600 hover:underline">info@yourdomain.com</a>
          </p>
        </div>
      </div>
    </div>
  )
}
