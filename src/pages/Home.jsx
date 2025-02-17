import CoinSection from "../components/CoinSection";
import NavBar from "../components/NavBar";
import NewsSection from "../components/NewsSection";

function Home() {
  return (
    <>
      <div className="my-20">
        <CoinSection></CoinSection>
      </div>

      <NewsSection></NewsSection>
    </>
  );
}

export default Home;
