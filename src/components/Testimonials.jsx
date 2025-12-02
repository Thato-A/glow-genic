// src/components/Testimonials.jsx
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const testimonials = [
  {
    name: "Sarah M.",
    text: "Glow Genic completely transformed my skincare routine! My skin has never felt better.",
  },
  {
    name: "Jasmine L.",
    text: "The quiz was so accurate. The routine I got feels like it was made just for me!",
  },
  {
    name: "Amanda P.",
    text: "Love the personalized recommendations—my acne cleared in just 3 weeks.",
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 px-6 max-w-5xl mx-auto text-center">
      <h2 className="text-4xl font-semibold text-teal-700 mb-12">
        What Our Clients Say
      </h2>

      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{ delay: 4000 }}
        loop
        pagination={{ clickable: true }}
        slidesPerView={1}
        className="max-w-xl mx-auto"
      >
        {testimonials.map((t, i) => (
          <SwiperSlide key={i}>
            <div className="p-10 bg-white/90 rounded-3xl shadow-md border hover:shadow-lg transition">
              <p className="text-gray-700 text-lg italic mb-4">“{t.text}”</p>
              <h3 className="text-teal-600 font-semibold">{t.name}</h3>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
}
