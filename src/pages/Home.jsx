import CoinSection from "../components/CoinSection";
import NewsSection from "../components/NewsSection";
import HeroSection from "../components/HeroSection";

function Home({ news, loading, error }) {
  return (
    <div>
      <div className="">
        <HeroSection />
      </div>

      {/* Coin Section Card */}
      <div className=" shadow-lg rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4"></h2>
        <CoinSection />
      </div>

      {/* News Section Card */}
      <div className="bg-gray-1000 shadow-lg rounded-lg p-4 mb-6">
        <h2 className="text-xl font-bold mb-4"> </h2>
        <NewsSection news={news} loading={loading} error={error} />
      </div>
    </div>
  );
}

export default Home;
