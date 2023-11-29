import Box from "@mui/material/Box";
import Card from "./Card/Card";
function ListCards() {
  return (
    <Box
      sx={{
        p: "0 5px",
        m: "0 5px",
        display: "flex",
        flexDirection: "column",
        gap: 1,
        overflowX: "hidden",
        overflowY: "auto",

        maxHeight: (theme) =>
          `calc(${theme.soTay.boardContentHeight} - ${theme.spacing(5)} - ${
            theme.soTay.columHeaderHeight
          } - ${theme.soTay.columFooterHeight})`,
        "&::-webkit-scrollbar-thumb": { backgroundColor: "#ced0da" },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "#bfc2cf",
        },
      }}
    >
      <Card />
      <Card tempoaryHideMedia />
      <Card tempoaryHideMedia />
      <Card tempoaryHideMedia />
      <Card tempoaryHideMedia />
      <Card tempoaryHideMedia />
      <Card tempoaryHideMedia />
    </Box>
  );
}

export default ListCards;
