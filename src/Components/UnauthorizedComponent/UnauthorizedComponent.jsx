import React from 'react';
// import Image from '../../Assets/error_salim.0d46c2fb.png';
import './workspace__unauthorized.css';
const UnauthorizedComponent = () => {
  return (
    <div className='workspace__unauthorized'>
      <div>
        <div>
          <img src={Image} alt='' />
        </div>
        <br />
        <p>Vous n'ètes pas autorisés à accéder à cette page</p>
      </div>
    </div>
  );
};

export default UnauthorizedComponent;
