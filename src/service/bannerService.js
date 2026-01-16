import api from "../api/axios";

export const getCarouselImages = async (lang = "ru") => {
  try {
    const response = await api.get("/theme/customizations");

    const list = response?.data?.data;
    if (!Array.isArray(list)) return [];

    const carousel = list.find(
      (item) => item?.type === "image_carousel"
    );
    if (!carousel) return [];

    const translations = Array.isArray(carousel.translations)
      ? carousel.translations
      : [];

    const translation = translations.find(
      (t) => t?.locale === lang
    );

    const images =
      translation?.options?.images ??
      carousel?.options?.images ??
      [];

    if (!Array.isArray(images)) return [];

    return images.map((img) => ({
      ...img,
      image: `https://shop.milliybiz.uz/${img.image}`,
    }));
  } catch (error) {
    console.error("Carousel error:", error);
    return [];
  }
};
