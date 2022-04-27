import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  card: {
    height: "400px",
    display: "flex",
    flexDirection: "column",
  },
  media: {
    height: "70%",
  },
  cardDetail: {
    flex: "1",
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    // backgroundColor: "grey",
    height: "350px",
  },

  cardAction: {
    height: "50px",
    display: "flex",
    justifyContent: "space-between",
    backgroundColor: "#212529",
  },
  button: {},
}));
