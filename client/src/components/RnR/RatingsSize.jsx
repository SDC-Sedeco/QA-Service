import React from 'react';
import './Ratings.css';

let RatingsSize = function(props) {
  let arrow = '▼';
  let charSize = props.size;

  if (charSize) {
    return (
      <React.Fragment>
        <div id="sizeChart">
          Size
          <div className="plot">
            <div className="plotBar">
              <div className="plotBar2">{charSize === 1.0 ? arrow : null}</div>
              <div className="plotBar2">{charSize === 1.5 ? arrow : null}</div>
              <div className="plotBar2">{charSize === 2.0 ? arrow : null}</div>
            </div>
            <div className="plotBar">
              <div className="plotBar2">{charSize === 2.5 ? arrow : null}</div>
              <div className="plotBar2">{charSize === 3.0 ? arrow : null}</div>
              <div className="plotBar2">{charSize === 3.5 ? arrow : null}</div>
            </div>
            <div className="plotBar">
              <div className="plotBar2">{charSize === 4.0 ? arrow : null}</div>
              <div className="plotBar2">{charSize === 4.5 ? arrow : null}</div>
              <div className="plotBar2">{charSize === 5.0 ? arrow : null}</div>
            </div>
          </div>
          <div id="sizeChars">
            <span className="arrowChart arrowRating1">Too Small</span>
            <span className="arrowChart arrowRating2">Perfect</span>
            <span className="arrowChart arrowRating3">Too Wide</span>
          </div>
        </div>
      </React.Fragment>
    );
  } else {
    return (
      <>
      </>
    );
  }
};

export default RatingsSize;