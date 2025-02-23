import { Card, CardContent, Typography } from "@mui/joy";

function NewsCard({ news }) {
  return (
    <Card
      component="a"
      href={news.url}
      target="_blank"
      rel="noopener noreferrer"
      variant="outlined"
      sx={{
        width: 320,
        height: 360,
        textAlign: "center",
        boxShadow: 4,
        padding: 2,
        backgroundColor: "rgba(255, 255, 255, 0.05)", // Subtle transparent background
        borderRadius: "12px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "transform 0.3s, box-shadow 0.3s", // Smooth hover effect
        "&:hover": {
          transform: "scale(1.05)", // Slight zoom on hover
          boxShadow: "0px 8px 20px rgba(255, 255, 255, 0.2)", // Softer hover effect
        },
      }}
    >
      <div
        style={{
          position: "relative",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <img
          src={news.image}
          alt={news.title}
          style={{
            objectFit: "cover",
          }}
        />
        {/* Gradient Overlay */}
      </div>

      <CardContent sx={{ flexGrow: 1, padding: "16px" }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "23px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textAlign: "center",
            color: "white",
            fontWeight: "bold",
            fontFamily: "Roboto, sans-serif",
          }}
        >
          {news.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
