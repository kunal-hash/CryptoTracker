import React, { useState } from "react";
import "./styles.css";

function CoinInfo({ heading, desc }) {
  const shortDesc =
    desc.slice(0, 300) + "<p style='color:var(--grey)'> Read More...</p>";
  const longDesc =
    desc + "<p style='color:var(--grey)'> Read Less...</p>";
    const [flag, setFlag] = useState(false);
    
    

  return (
    <div className="grey-wrapper compare-coin-info">
      {desc && (
        <>
          {" "}
          <h2 className="coininfo-coin-name">{heading}</h2>
          {desc.length > 200 ? (
            <p
              onClick={() => setFlag(!flag)} //use arrow function to get rid of infinite loop.
              className="coininfo-coin-desc"
              dangerouslySetInnerHTML={{ __html: !flag ? shortDesc : longDesc }}
            ></p>
          ) : (
            <p dangerouslySetInnerHTML={{__html: desc }}></p>
          )}
        </>
      )}
    </div>
  );
}

export default CoinInfo;


{/* <div className="grey-wrapper" onClick={() => setFlag(!flag)}>
  {name}
  {description.length > 300 ? (
    <p
      className="coin-desc"
      dangerouslySetInnerHTML={{ __html: flag ? shortdesc : longdesc }}
    ></p>
  ) : (
    <p
      className="coin-desc"
      dangerouslySetInnerHTML={{ __html: description }}
    ></p>
  )}
</div>; */}