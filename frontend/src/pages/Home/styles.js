import { makeStyles } from "@mui/styles";

export default makeStyles({
  container: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    gap: 35,
  },
  rooms: {
    width: "100%",
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: 15,
  },
});

export const ListContainerStyles = makeStyles({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 20,
    padding: "40px 0px 20px 0",
  },
});
