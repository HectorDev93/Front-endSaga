import React, { useEffect, useState } from "react";

import { Link } from "react-router-dom";
//styling
//import './Count.css';

const Count = (props) => {
  // label of counter
  // number to increment to
  // duration of count in seconds
  const { countLabel, number, duration, to, styleBox, iconModel, label } = props.data;

  // number displayed by component
  const [count, setCount] = useState("0");

  useEffect(() => {
    let start = 0;
    // first three numbers from props
    const end = parseInt(number.substring(0, 3));
    // if zero, return
    if (start === end) return;

    // find duration per increment
    let totalMilSecDur = parseInt(duration);
    let incrementTime = (totalMilSecDur / end)*500;

    // timer increments start counter
    // then updates count
    // ends if start reaches end
    let timer = setInterval(() => {
      start += 1;
      setCount(String(start) + number.substring(3));
      if (start === end) clearInterval(timer);
    }, incrementTime);

    // dependency array
  }, [number, duration]);

  return (
    <div className="col-lg-3 col-md-4 col-xs-6">
      <div
        className={
          styleBox ? "small-box " + styleBox : "small-box bg-info"
        }
      >
        <div className="inner">
          <h3>{count}</h3>
          <p>{countLabel}{" "}{label?label:""}</p>
        </div>
        <div className="icon">
          <i className={iconModel}></i>
        </div>
        <Link to={to} className="small-box-footer">
          More info <i className="fa fa-arrow-circle-right"></i>
        </Link>
      </div>
    </div>
  );
};

export default Count;
