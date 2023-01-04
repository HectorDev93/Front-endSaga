import React from 'react';
import Spiner from 'react-bootstrap/Spinner'
const Spinner = (props) => {
  return props.show?(<Spiner animation="border" variant="success" role="status">
  <span className="visually-hidden"></span>
</Spiner>
  ):null;
};

export default Spinner;