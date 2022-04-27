import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  card: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: "260px",
    objectPosition: "top",
  },
  cardContent: {
    flex: "1",
    display: "flex",
    flexDirection: "column",
  },
  cardAction: {
    display: "flex",
    flexDirection: "column",
  },
}));
