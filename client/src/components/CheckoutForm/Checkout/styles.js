import { makeStyles } from "@mui/styles";
export default makeStyles((theme) => ({
  appBar: {
    position: "relative",
  },
  toolbar: {},
  layout: {
    marginTop: "5%",
    width: "auto",
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    padding: "10px",
    alignItems: "center",
  },
  stepper: {
    //padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: "flex",
    justifyContent: "flex-end",
  },
  button: {
    // marginTop: theme.spacing(3),
    // marginLeft: theme.spacing(1),
  },
  divider: {
    margin: "20px 0",
  },
  spinner: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
}));
