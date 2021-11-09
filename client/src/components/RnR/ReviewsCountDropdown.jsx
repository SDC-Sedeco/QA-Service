import React from 'react';
import './Reviews.css';


class ReviewsCountDropdown extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: ''
    };
  }

  render() {
    let nightShift = this.props.nightShift;

    /*BELOW IS HOW REVIEW COUNT IS CALCULATED USING THE META DATA*/
    // let reviewsCount = this.props.reviewsMeta.ratings;
    // let reviewsTotal = Object.values(reviewsCount);
    // if (reviewsTotal.length) {
    //   reviewsCount = reviewsTotal.reduce((prev, cur) => Number(prev) + Number(cur));
    // } else { reviewsCount = 0; }

    /*BELOW IS HOW REVIEW COUNT IS CALCULATED USING THE REVIEW DATA*/
    let reviewsTotal = this.props.reviews.results.length;

    return (
      <React.Fragment>
        <div id="reviewCountHeading">
          {reviewsTotal ? reviewsTotal : 0} reviews, Sort On
          <select id={nightShift === 'nightShiftOff' ? 'dropdown' : 'dropdownDark'} onChange={this.props.sortOnHandler}>
            <option value="Relevant">Relevant</option>
            <option value="Helpful">Helpful</option>
            <option value="Newest">Newest</option>
          </select>
        </div>
      </React.Fragment>
    );
  }
}

export default ReviewsCountDropdown;