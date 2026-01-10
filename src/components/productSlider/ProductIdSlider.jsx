import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import defaultImg from "../../assets/img/defaultImg.svg";
import "./Slider.css";

export default function ProductIdSlider({ info = [], onSelect }) {
  // Thumbnail swiper instansiyasini saqlash uchun state
  const [thumbsSwiper, setThumbsSwiper] = useState(null);

  return (
    <div className="slider-container">
      <div className="main-swiper-wrapper">
        <Swiper
          className="mySwiper2"
          loop={true}
          spaceBetween={10}
          navigation={true} // Navigation moduli yoqilgan
          thumbs={{
            swiper:
              thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
          }}
          modules={[FreeMode, Navigation, Thumbs]}
        >
          {info.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.original_image_url || defaultImg}
                alt={`slide-${index}`}
                style={{ cursor: "pointer" }}
                onClick={() => onSelect && onSelect(item)}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className="thumbs-swiper-wrapper">
        <Swiper
          onSwiper={setThumbsSwiper} // BU YERDA: pastki swiperni tepaga bog'laymiz
          spaceBetween={10}
          slidesPerView={4}
          freeMode={true}
          watchSlidesProgress={true}
          modules={[FreeMode, Navigation, Thumbs]}
          className="mySwiper"
        >
          {info?.map((item, index) => (
            <SwiperSlide key={index}>
              <img
                src={item.medium_image_url || defaultImg}
                alt={`thumb-${index}`}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
