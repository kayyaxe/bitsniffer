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
        width: 300,
        height: 300,
        textAlign: "center",
        boxShadow: 3,
        padding: 2,
        backgroundColor: "transparent",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "center",
        transition: "transform 0.2s", // Smooth hover effect
        "&:hover": {
          transform: "scale(1.05)", // Slight zoom on hover
        },
      }}
    >
      <img
        src={news.image}
        alt={news.title}
        style={{
          width: "100%",
          height: "150px",
          objectFit: "cover",
          borderRadius: "5px",
        }}
      />
      <CardContent sx={{ flexGrow: 1, padding: 1 }}>
        <Typography
          variant="h6"
          sx={{
            fontSize: "17px",
            overflow: "hidden",
            display: "-webkit-box",
            WebkitLineClamp: 3,
            WebkitBoxOrient: "vertical",
            textAlign: "center",
            color: "white", // Text color
            fontFamily: "Roboto, sans-serif", // Set font to Roboto
          }}
        >
          {news.title}
        </Typography>
      </CardContent>
    </Card>
  );
}

export default NewsCard;
