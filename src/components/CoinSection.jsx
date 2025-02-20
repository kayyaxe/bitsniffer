import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "./CoinSection.css";
import axios from "axios";
import { Card, CardContent, Typography, Avatar } from "@mui/joy";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

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
      <h2 className="mb-15 text-3xl">Top 10 Cryptocurrency by Market Cap 🚀</h2>
      <Swiper
        modules={[Autoplay, Navigation]}
        className="w-[800px] h-[400px]"
        slidesPerView={3}
        spaceBetween={10}
        loop={true}
        pagination={{
          clickable: true,
        }}
        autoplay={{ delay: 1000, disableOnInteraction: false }}
        speed={1300}
      >
        {topCoins.map((coin) => (
          <SwiperSlide
            key={coin.id}
            className="flex justify-center items-center text-lg"
          >
            <Card
              variant="plain"
              sx={{
                textAlign: "center",
                padding: 2,
                backgroundColor: "transparent",
              }}
            >
              <CardContent>
                {/* Ranking and Symbol */}
                <Typography level="h3" className="!mb-10 !text-gray-400">
                  #{coin.market_cap_rank}
                </Typography>
                <Avatar
                  src={coin.image}
                  alt={coin.symbol.toUpperCase()}
                  sx={{ width: 100, height: 100, margin: "auto" }}
                />
                <Typography level="5" className="!text-white !mt-10 !text-2xl">
                  {coin.symbol.toUpperCase()}
                </Typography>

                <Typography
                  variant="h5"
                  className="!text-amber-500 !mt-5 !text-2xl"
                >
                  ${coin.current_price.toFixed(2)}
                </Typography>
              </CardContent>
            </Card>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* See All Coins Button */}
      <div className="text-center mt-3">
        <Link to="/coins">
          <button className="!bg-amber-700 text-white !text-2x1 rounded hover:bg-amber-800">
            SEE ALL COINS
          </button>
        </Link>
      </div>
    </>
  );
}

export default CoinSection;
