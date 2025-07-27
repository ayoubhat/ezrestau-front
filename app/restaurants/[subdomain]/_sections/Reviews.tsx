import { Star } from "lucide-react";
import React from "react";

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

const Reviews = () => {
  const reviews: Review[] = [
    {
      id: 1,
      name: "Marie Dubois",
      rating: 5,
      comment:
        "Excellent restaurant ! La pizza était délicieuse et le service impeccable. Je recommande vivement !",
      date: "Il y a 2 semaines",
    },
    {
      id: 2,
      name: "Pierre Martin",
      rating: 4,
      comment:
        "Très bon rapport qualité-prix. Les sandwichs sont généreux et les ingrédients de qualité.",
      date: "Il y a 1 mois",
    },
    {
      id: 3,
      name: "Sophie Leroy",
      rating: 5,
      comment:
        "Livraison rapide et plats toujours chauds. Mon restaurant préféré pour commander !",
      date: "Il y a 3 semaines",
    },
  ];
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Avis Google
          </h2>
          <p className="text-xl text-gray-600">
            Ce que nos clients disent de nous
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-gray-50 p-6 rounded-lg">
              <div className="flex items-center mb-4">
                <div className="flex text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < review.rating ? "fill-current" : ""
                      }`}
                    />
                  ))}
                </div>
                <span className="ml-2 text-sm text-gray-600">
                  {review.date}
                </span>
              </div>
              <p className="text-gray-700 mb-4">{review.comment}</p>
              <p className="font-semibold text-gray-900">{review.name}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Reviews;
