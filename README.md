# BitSniffer

> A cryptocurrency tracker built with **React.js** & **Vite**.

## Description

BitSniffer is a **React.js** web app that provides real-time cryptocurrency data, including **price, volume, and market cap**.  
It fetches data from the **CoinGecko API** for market data and **GNews** for cryptocurrency news.

---

## Pages & Features

### Home Page

![Home page](/public/bitsniffer_home.png)

- Auto-playing carousel of the **Top 10 Cryptocurrencies** by market cap
- Displays the **Top 3 Crypto News** articles
- Quick navigation buttons to **All Coins** & **All News**

---

### All Coins Page

![All Coins page](/public/bitsniffer_allcoins.png)

- Table displaying cryptocurrencies ranked by **market cap**
- Clicking on a coin redirects to the **Coin Details page**

---

### Coin Details Page

![Coin Details page](/public/bitsniffer_coindetails1.png)  
![Coin Details page](/public/bitsniffer_coindetails2.png)

- **Comprehensive details card** with coin information
- Switchable "Relevant Links" section
- **Price Change %** over different timeframes
- **Interactive price chart** (24H, 30D, 90D)

---

### All News Page

![All News page](/public/bitsniffer_allnews.png)

- Displays **10 latest cryptocurrency news articles**

---

| Technology                                   | Function                                  |
| -------------------------------------------- | ----------------------------------------- |
| [**React.js**](https://react.dev/)           | Frontend UI library                       |
| [**Vite**](https://vitejs.dev/)              | Fast development build tool               |
| [**Tailwind CSS**](https://tailwindcss.com/) | Utility-first CSS framework               |
| [**MUI**](https://mui.com/)                  | UI component library (Chips, Cards, etc.) |
| [**Chart.js**](https://www.chartjs.org/)     | Data visualization/charting tool          |
| [**Swiper.js**](https://swiperjs.com/)       | Modern slider/carousel library            |
| [**Vercel**](https://vercel.com/)            | Hosting platform for frontend             |

---

## What I Learned

- How to use **component libraries like MUI** for aesthetics and efficiency
- Writing **inline CSS** with **Tailwind CSS**
- Fetching & displaying data from **external APIs**
- Using **`.env` files** to keep API keys private
- Optimizing **API calls** to reduce redundant requests

---

## APIs Used

| Source                                            | Data Provided                                                 | Rate Limit                                             |
| ------------------------------------------------- | ------------------------------------------------------------- | ------------------------------------------------------ |
| [**CoinGecko**](https://www.coingecko.com/en/api) | Cryptocurrency market data (prices, volume, market cap, etc.) | **10,000 API calls/month** <br> **30 requests/minute** |
| [**GNews**](https://gnews.io/docs/)               | Latest cryptocurrency news                                    | **100 API calls/month**                                |
