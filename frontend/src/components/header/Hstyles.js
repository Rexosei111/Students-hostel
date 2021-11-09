import { makeStyles } from "@mui/styles";
import backgroundImage from "../../images/headerBg2.jpg";

export default makeStyles({
  bg: {
    // height: "85vh",
    width: "100%",
    // backgroundImage: `url(${backgroundImage})`,
    // backgroundSize: "cover",
    // backgroundPosition: "center",
    // backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
  },

  toolbar: {
    backgroundColor: "#D4D2D5",
  },

  hcontent: {
    padding: 25,
    backgroundColor: "rgba(5, 5, 4, 0.5)",
  },
});
