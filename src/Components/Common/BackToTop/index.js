import React, { useEffect } from "react";
import "./styles.css";
import ArrowUpwardRoundedIcon from "@mui/icons-material/ArrowUpwardRounded";

function BackToTop() {
   useEffect(() => {
     let mybutton = document.getElementById("myBtn");

     window.onscroll = () => {
       scrollFunction();
     };

     function scrollFunction() {
       if (
         document.body.scrollTop > 20 ||
         document.documentElement.scrollTop > 20
       ) {
         mybutton.style.display = "flex";
       } else {
         mybutton.style.display = "none";
       }
     }
   }, []);

  // When the user clicks on the button, scroll to the top of the document
  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
  return (
    <div className="back-top" id="myBtn" onClick={() => topFunction()}>
      <ArrowUpwardRoundedIcon />
    </div>
  );
}

export default BackToTop;
