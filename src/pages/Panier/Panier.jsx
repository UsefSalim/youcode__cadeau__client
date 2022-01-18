import React, { useContext, useEffect, useState } from 'react';
import {
  AuditCard,
  AuditCardBody,
  AuditCardTitle,
  Button,
  IconButton,
  Label,
} from '@laazyry/sobrus-design-system';
import { AuthContext, PanierContext, PopupContext } from 'Context';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './panier.css';
import { CustomBreadcrumb, CustomInput, CustomInputSelect } from 'Components';
import { IoCloseSharp } from 'react-icons/io5';
import { useHistory } from 'react-router-dom';
import { Steps, useSteps } from 'react-step-builder';
const Panier = () => {
  const [totalPrice, setTotalPrice] = useState(0);
  const { open, setOpen } = useContext(PopupContext);
  const history = useHistory();
  const { user } = useContext(AuthContext);
  const [remise, setRemise] = useState(0);
  const { panier, setPanier, setExpedition, expedition, setCode, code, setAdress, adress } =
    useContext(PanierContext);
  console.log(adress);
  const handelClick = (a, action) => {
    setPanier((prev) =>
      prev.map((p) => {
        if (p._id === a._id) {
          if (p.nbr > 1) {
            if (action === '+') {
              a.countInStock > p.nbr && (p.nbr = p.nbr + 1);
            } else p.nbr = p.nbr - 1;
            return p;
          } else if (a.countInStock > p.nbr) {
            if (action === '+') p.nbr = p.nbr + 1;
            return p;
          }
        }
        return p;
      })
    );
  };
  const handelDelete = (a) => {
    setPanier((prev) => prev.filter((p) => p._id !== a._id));
  };
  const { prev, next, jump, total, current, progress } = useSteps();
  const handelPay = () => {
    Object.keys(user).length > 0 ? next() : setOpen('checkout');
  };
  useEffect(() => {
    const copyData = [...panier];
    var totalPrice = 0;
    copyData.map((p) => {
      totalPrice += p.prix * p.nbr;
    });
    setTotalPrice(totalPrice);
  }, [panier]);
  const expeditionOptions = [
    { value: 100, label: 'Express' },
    { value: 10, label: 'Standard' },
  ];
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      totalPrice: totalPrice,
      expedition,
      code,
      adress: adress.adress,
      zip: adress.zip,
      ville: adress.ville,
      telNumber: adress.telNumber,
    },
    validationSchema: Yup.object(
      current == 1
        ? {
            expedition: Yup.string().required('ce champs ne doit pas etre vide'),
          }
        : {
            // expedition: Yup.string().required('ce champs ne doit pas etre vide'),
            adress: Yup.string().required('ce champs ne doit pas etre vide'),
            zip: Yup.string().required('ce champs ne doit pas etre vide'),
            ville: Yup.string().required('ce champs ne doit pas etre vide'),
            telNumber: Yup.string().required('ce champs ne doit pas etre vide'),
          }
    ),
    onSubmit: (values) => {
      console.log(current);
      console.log(formik.errors);
      current == 1 ? handelPay() : history.push('/checkout');
    },
  });
  useEffect(
    () => setExpedition(formik.values.expedition),
    [formik.values.expedition, setExpedition]
  );
  useEffect(
    () =>
      setAdress({
        adress: formik.values.adress,
        zip: formik.values.zip,
        ville: formik.values.ville,
        telNumber: formik.values.telNumber,
      }),
    [formik.values, setAdress]
  );
  useEffect(() => setCode(formik.values.code), [formik.values.code, setCode]);
  useEffect(() => {
    if (code === 'COCOONING(1)' && totalPrice > 50) setRemise((totalPrice * 15) / 100);
  }, [code, totalPrice]);

  //steppe
  return (
    <>
      <div className='categories__pub'>
        <span> -15% </span>
        dès 50€ d'achats avec le code COCOONING(1)
      </div>
      <div className='Home_container'>
        <CustomBreadcrumb
          back
          title='Checkout'
          body={[{ to: '', el: `Panier` }]}
        ></CustomBreadcrumb>
        <AuditCard>
          <div
            className='header__card'
            style={{ display: 'flex', justifyContent: 'space-between' }}
          >
            <AuditCardTitle style={{ fontWeight: 300, fontSize: 24 }}>Votre Cadeau </AuditCardTitle>
            <span style={{ marginRight: '1rem', color: 'gray' }}>
              {panier.length} article{panier.length > 1 && 's'}
            </span>
          </div>
          <AuditCardBody>
            <div className='panier__articles'>
              <div className='panier__articles__part1'>
                {panier?.map((a) => (
                  <div>
                    <hr />
                    <div className='row'>
                      <div className='image'>
                        <img src={`http://localhost:5000/api/${a?.images[0]?.path}`} alt='' />
                      </div>
                      <div className='info'>
                        <p>{a.name}</p>
                        <p>{a.prix}.00 MAD</p>
                        <p>{a.description}</p>
                      </div>
                      <div className='nombre_article'>
                        <span
                          className='actions'
                          onClick={() => current == 1 && handelClick(a, '-')}
                        >
                          -
                        </span>
                        <span className='nbr'>{a.nbr}</span>
                        <span
                          className='actions'
                          onClick={() => current == 1 && handelClick(a, '+')}
                        >
                          +
                        </span>
                      </div>
                      <div>{a.prix * a.nbr}.00 MAD</div>
                      <div>
                        <IconButton
                          style={{
                            margin: '0 4px',
                            lineHeight: 1,
                          }}
                          onClick={() => current == 1 && handelDelete(a)}
                          color='danger'
                          title='supprimer'
                        >
                          <IoCloseSharp size={20} />
                        </IconButton>
                      </div>
                    </div>
                  </div>
                ))}
                <hr />
              </div>
              <form
                style={{ width: '30%' }}
                onSubmit={formik.handleSubmit}
                className='step'
                id='formPay'
              >
                {panier?.length > 0 && (
                  <div className='panier__articles__part2 steps_wrapper'>
                    <Steps>
                      <div className='step'>
                        <div style={{ fontWeight: 300, fontSize: 18 }}>Résumé</div>
                        <hr />
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '1rem',
                          }}
                        >
                          <span style={{ marginRight: '1rem', color: 'gray' }}>
                            {panier.length} article{panier.length > 1 && 's'}
                          </span>
                          <div style={{ fontWeight: 300 }}>+ {totalPrice} MAD</div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '1rem',
                          }}
                        >
                          <span style={{ marginRight: '1rem', color: 'gray' }}>
                            <CustomInputSelect
                              options={expeditionOptions}
                              name='expedition'
                              placeholder='choisisez votre expediteur'
                              formik={formik}
                              validations
                              isClearable={false}
                            />
                          </span>
                          <div style={{ fontWeight: 300 }}>
                            expédition : +{' '}
                            {formik.values.expedition ? formik.values.expedition + ' MAD' : ''}
                          </div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '1rem',
                          }}
                        >
                          <span style={{ marginRight: '1rem', color: 'gray' }}>
                            <CustomInput
                              name='code'
                              placeholder='Code promo ?'
                              formik={formik}
                              validations
                            />
                          </span>
                          <div style={{ fontWeight: 300 }}>- {remise} MAD</div>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            margin: '1rem',
                          }}
                        >
                          <div style={{ marginRight: '1rem', color: 'gray' }}>Total prix :</div>
                          <div style={{ fontWeight: 300 }}>
                            + {totalPrice + expedition - remise} MAD
                          </div>
                        </div>
                        <div style={{ display: 'flex', justifyContent: 'center' }}>
                          <Button
                            type='submit'
                            form='formPay'
                            style={{ width: '90%' }}
                            color='success'
                          >
                            Confirmé votre commande
                          </Button>
                        </div>
                        <div>
                          Etap : {current} / {total}
                        </div>
                      </div>
                      <div className='step'>
                        <form action=''>
                          <Label>Adress :</Label>
                          <CustomInput
                            name='adress'
                            placeholder='Adresse *'
                            validations
                            formik={formik}
                          />
                          <Label>Code Postal :</Label>
                          <CustomInput
                            name='zip'
                            placeholder='Code Postal *'
                            validations
                            formik={formik}
                          />
                          <Label>Ville :</Label>
                          <CustomInput
                            name='ville'
                            placeholder='Ville *'
                            validations
                            formik={formik}
                          />
                          <Label>N Telephone :</Label>
                          <CustomInput
                            name='telNumber'
                            placeholder='N Telephone *'
                            validations
                            formik={formik}
                          />
                        </form>
                        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                          <Button onClick={prev} color='danger'>
                            Precedent
                          </Button>
                          <Button color='success' type='submit' form='formPay'>
                            Confirmé votre commande
                          </Button>
                        </div>
                        <div>
                          Etap : {current} / {total}
                        </div>
                      </div>
                    </Steps>
                  </div>
                )}
              </form>
            </div>
          </AuditCardBody>
        </AuditCard>
      </div>
    </>
  );
};

export default Panier;
