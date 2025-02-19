import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CoinSection.css";
import axios from "axios";
import { Card, CardContent, Typography, Avatar } from "@mui/joy";

function CoinSection() {
  const [topCoins, setTopCoins] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://api.coingecko.com/api/v3/coins/markets?x-cg-demo-api-key=${
          import.meta.env.VITE_COINS_API_KEY
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
        autoplay={{ delay: 3000, disableOnInteraction: false }}
      >
        {topCoins.map((coin) => (
          <SwiperSlide key={coin.id}>
            <Card
              variant="plain"
              sx={{
                maxWidth: 250,
                margin: "auto",
                textAlign: "center",
                boxShadow: 3,
                padding: 2,
                backgroundColor: "transparent",
              }}
            >
              <CardContent>
                <Avatar
                  src={coin.image}
                  alt={coin.symbol.toUpperCase()}
                  sx={{ width: 60, height: 60, margin: "auto" }}
                />
                <Typography variant="h6" sx={{ mt: 2 }}>
                  {coin.symbol.toUpperCase()}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  ${coin.current_price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
}

export default CoinSection;
