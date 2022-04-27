import React from "react";
import img from "./../../helpers/img.jpg";
const Landing = () => {
  return (
    <div style={{ height: "85vh", display: "flex", flexDirection: "column" }}>
      <h1
        style={{
          textAlign: "center",
          marginBottom: "10px",
          backgroundColor: "#212529",
          color: "aliceblue",
          padding: "10px 0",
          textTransform: "capitalize",
          fontStyle: "italic",
        }}
      >
        welcome to fintech gold
      </h1>
      <div
        style={{
          backgroundImage: `url(${img})`,
          flex: "1",
          backgroundPosition: "top",
          backgroundSize: "cover",
        }}
      ></div>
    </div>
  );
};
export default Landing;
