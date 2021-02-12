import React from 'react';

const Try = ({ tryInfo }) => {
  //구조분해할당
  return (
    <li>
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;
