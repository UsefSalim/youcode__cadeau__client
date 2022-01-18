import React from 'react';
import CustomSlid from './Slider/Slider';
import { StepButton } from '@laazyry/sobrus-design-system';
import './home.css';
const Home = () => {
  return (
    <>
      <CustomSlid />
      <div className='Home_container'>
        <div className='home__steps'>
          <div className='home__step'>
            <StepButton
              stepNum='1'
              desc='Ajoutez des produits à votre panier, entrez vos coordonnées et validez'
              title='PANIER'
            />
          </div>
          <div className='home__step'>
            <StepButton stepNum='2' desc='lorem ' title='CONNEXION' />
          </div>
          <div className='home__step'>
            <StepButton stepNum='3' desc='lorem ' title='LIVRAISON' />
          </div>
          <div className='home__step'>
            <StepButton stepNum='4' desc='lorem ' title='PAIEMENT' />
          </div>
        </div>
      </div>
    </>
  );
};
export default Home;
