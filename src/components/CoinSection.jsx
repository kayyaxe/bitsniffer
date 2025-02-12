import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./Coinsection.css";
import axios from "axios";

function CoinSection() {
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?x-cg-demo-api-key=${
          import.meta.env.VITE_API_KEY
        }&vs_currency=usd&per_page=10`
      )
      .then((response) => {
        setTopCoins(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Dependency array should be here

  useEffect(() => {
    console.log(topCoins);
  }, [topCoins]);

  return (
    <>
      <h1 className="mb-10">Top 10 Cryptocurrency Coins! 🚀</h1>
      <Swiper
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        //   autoplay={{
        //     delay: 2000,
        //     disableOnInteraction: false,
        //   }}
      >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SwiperSlide>Slide 5</SwiperSlide>
        <SwiperSlide>Slide 6</SwiperSlide>
        <SwiperSlide>Slide 7</SwiperSlide>
        <SwiperSlide>Slide 8</SwiperSlide>
        <SwiperSlide>Slide 9</SwiperSlide>
      </Swiper>
    </>
  );
}

export default CoinSection;
