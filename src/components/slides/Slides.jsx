import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import { useBanners } from "../../hooks/useBanner";
import BannerSkeleton from "../skeleton/BannerSkeleton";
import "swiper/swiper-bundle.css";

export default function Slides({ lang = "ru" }) {
  const { images, loading } = useBanners(lang);
  const [showLoading, setShowLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      const timer = setTimeout(() => {
        setShowLoading(false);
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [loading]);

  if (showLoading) {
    return <BannerSkeleton />;
  }

  return (
    <div className="container">
      <Swiper
        modules={[Autoplay, Pagination]}
        slidesPerView={1}
        autoplay={{
          delay: 1000,
          disableOnInteraction: false,
        }}
        loop
        pagination={{ clickable: true }}
        className="slide"
        style={{
          "--swiper-pagination-color": "#10355B",
          "--swiper-pagination-bullet-inactive-color": "#FFFFFF",
          "--swiper-pagination-bullet-inactive-opacity": "1",
          "--swiper-pagination-bullet-size": "12px",
          "--swiper-pagination-bullet-horizontal-gap": "10px",
        }}
      >
        {images.map((item, index) => (
          <SwiperSlide key={index}>
            <a href="/products" className="block h-full">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover"
              />
            </a>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
