export default function ReviewsPage() {
  return (
    <div className="pt-16 lg:pt-24 min-h-screen bg-black">
      <div className="container mx-auto px-4 py-16 text-center">
        <h1 className="text-4xl md:text-6xl font-outfit font-bold text-white mb-6">Client Reviews</h1>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg mb-12">
          Read what our satisfied customers have to say about their journey with us.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto text-left">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="bg-neutral-900 border border-white/10 p-6 rounded-2xl">
              <div className="flex text-amber-500 mb-3">★★★★★</div>
              <p className="text-gray-300 italic mb-4">"Absolutely fantastic experience. The driver was punctual, polite, and the car was in pristine condition. Highly recommend for any travel needs."</p>
              <h4 className="text-white font-bold">- Happy Customer {i}</h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
