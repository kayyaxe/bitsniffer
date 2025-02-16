import React, { useState, useEffect } from "react";
import axios from "axios";
import { Card, CardContent, Typography, Avatar } from "@mui/joy";

function NewsSection() {
  const [topNews, setTopNews] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://gnews.io/api/v4/search?q=crypto&apikey=${
          import.meta.env.VITE_NEWS_API_KEY
        }&lang=en&max=3`
      )
      .then((response) => {
        setTopNews(response.data.articles || []);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []); // Dependency array should be here

  useEffect(() => {
    console.log(topNews);
  }, [topNews]);

  return (
    <>
      <h1 className="mb-10">Top 3 Cryptocurrency News! 🗞️</h1>

      <div
        className="news-container"
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {topNews.map((news) => (
          <Card
            component="a"
            href={news.url} // Navigate to the news URL
            target="_blank" // Opens in a new tab
            rel="noopener noreferrer" // Security best practice
            key={news.title + news.publishedAt}
            variant="outlined"
            sx={{
              width: 300,
              height: 300, // Keeps it square
              textAlign: "center",
              boxShadow: 3,
              padding: 2,
              backgroundColor: "transparent",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <img
              src={news.image}
              alt={news.title}
              style={{
                width: "100%",
                height: "140px", // Keeps image size balanced
                objectFit: "cover",
                borderRadius: "5px",
              }}
            />
            <CardContent sx={{ flexGrow: 1, padding: 1 }}>
              <Typography
                variant="h6"
                sx={{
                  fontSize: "15px",
                  fontWeight: "bold",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 3, // Restricts to 2 lines
                  WebkitBoxOrient: "vertical",
                  textAlign: "center",
                }}
              >
                {news.title}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
}

export default NewsSection;
