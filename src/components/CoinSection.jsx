import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
// import Swiper and modules styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
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
        className=" h-[350px]"
        slidesPerView={3}
        spaceBetween={150}
        loop={true}
        loopAdditionalSlides={3}
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
            <Link to={`/coin/${coin.id}`} style={{ textDecoration: "none" }}>
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
                  <Typography
                    level="h3"
                    className="!mb-10 !text-gray-400 !text-3xl"
                  >
                    #{coin.market_cap_rank}
                  </Typography>
                  <Avatar
                    src={coin.image}
                    alt={coin.symbol.toUpperCase()}
                    sx={{ width: 80, height: 80, margin: "auto" }}
                  />
                  <Typography level="5" className="!text-white !mt-8 !text-3xl">
                    {coin.symbol.toUpperCase()}
                  </Typography>

                  <Typography
                    variant="h5"
                    className="!text-amber-500 !mt-3 !text-2xl"
                  >
                    ${coin.current_price.toFixed(2)}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* See All Coins Button */}
      <div className="text-center mb-2">
        <Link to="/coins">
          <button className="!bg-amber-700 !text-white !px-6 !py-3 !text-xl !font-semibold !rounded-lg hover:!bg-amber-800 !outline-none focus:!ring-0  focus:!ring-transparent">
            SEE ALL COINS
          </button>
        </Link>
      </div>
    </>
  );
}

export default CoinSection;
