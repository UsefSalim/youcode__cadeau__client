import React from 'react';
import Slider from 'react-animated-slider';
import 'react-animated-slider/build/horizontal.css';
import { content } from 'Values/slidData';
import { Button } from '@laazyry/sobrus-design-system';

const CustomSlid = () => {
  return (
    <Slider autoplay={6000}>
      {content.map((item, index) => (
        <div key={index} style={{ background: `url('${item.image}') no-repeat center center` }}>
          <div className='center'>
            <h1>{item.title}</h1>
            <p>{item.description}</p>
            <Button color='danger' outline>
              {item.button}
            </Button>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default CustomSlid;
