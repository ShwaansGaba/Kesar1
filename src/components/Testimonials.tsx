import React from 'react';
import { motion } from 'motion/react';
import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    id: 1,
    name: "Aman S.",
    text: "Experienced the best authentic veg food at Kesar restaurant Ashok Vihar. It has a very nice ambience, quick services, a rich menu, and a warm family atmosphere.",
    rating: 5,
  },
  {
    id: 2,
    name: "Priya V.",
    text: "Their Dal Makhani is easily a 100/10—hands down the best Dal Makhani I have ever had in Delhi! The Paneer Butter Masala was a solid 10/10.",
    rating: 5,
  },
  {
    id: 3,
    name: "Rohit M.",
    text: "Best Navratri food I've ever had! Also, a huge 5/5 stars because the place willingly offers their entire expansive menu without Onion and Garlic if requested.",
    rating: 5,
  },
  {
    id: 4,
    name: "Sneha K.",
    text: "The seating was incredibly comfortable, and the portion sizes were very generous. Ultra-quick service made the dine-in experience even better. Worth visiting with extended family.",
    rating: 5,
  },
  {
    id: 5,
    name: "Vikram N.",
    text: "The food quality and taste are great, but the weekend crowd can make the ambiance feel a bit loud. Highly recommend booking tables early during festivals.",
    rating: 4,
  },
  {
    id: 6,
    name: "Neha T.",
    text: "Anything you order here to eat is very delicious. It literally tastes clean and comforting, almost like premium food cooked at home!",
    rating: 5,
  }
];

export function Testimonials() {
  return (
    <section id="reviews" className="py-24 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-saffron-dark tracking-[0.2em] uppercase text-sm font-semibold mb-4">
            Guest Experiences
          </h2>
          <h3 className="font-serif text-4xl md:text-5xl text-maroon mb-6">
            What Our Customers Say
          </h3>
          <div className="w-24 h-1 bg-saffron mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REVIEWS.map((review, i) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-white/60 backdrop-blur-md border border-saffron/20 p-8 rounded-2xl shadow-sm hover:shadow-md transition-all flex flex-col h-full"
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex gap-1 text-yellow-500">
                  {Array.from({ length: 5 }).map((_, idx) => (
                    <Star 
                      key={idx} 
                      size={16} 
                      fill={idx < review.rating ? "currentColor" : "none"} 
                      className={idx < review.rating ? "text-yellow-500" : "text-gray-300"} 
                    />
                  ))}
                </div>
                <Quote size={20} className="text-maroon/20" />
              </div>
              <p className="text-charcoal/80 text-sm leading-relaxed mb-6 flex-grow italic">
                "{review.text}"
              </p>
              <h4 className="font-semibold text-maroon text-sm tracking-wide">
                - {review.name}
              </h4>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
