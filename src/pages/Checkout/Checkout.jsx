import React, { useContext, useState, useEffect } from 'react';
import { PanierContext } from 'Context';
import { CustomBreadcrumb } from 'Components';
import {
  Card,
  CardBody,
  CardTitle,
  Col,
  Row,
  CardItem,
  CardItemTitle,
  CardItemValue,
  Button,
} from '@laazyry/sobrus-design-system';

const Checkout = () => {
  const { panier, setPanier, expedition, setExpedition, setCode, code, adress, setAdress } =
    useContext(PanierContext);
  console.log({ panier, setPanier, expedition, setExpedition, setCode, code, adress, setAdress });
  const [totalPrice, setTotalPrice] = useState(0);
  const [remise, setRemise] = useState(0);
  useEffect(() => {
    if (code === 'COCOONING(1)' && totalPrice > 50) setRemise((totalPrice * 15) / 100);
  }, [code, totalPrice]);
  useEffect(() => {
    const copyData = [...panier];
    var totalPrice = 0;
    copyData.map((p) => {
      totalPrice += p.prix * p.nbr;
    });
    setTotalPrice(totalPrice);
  }, [panier]);
  return (
    <div className='HomePage_contianer'>
      <CustomBreadcrumb back title='Checkout' body={[{ to: '', el: 'Validation de la commande' }]}>
        <div>
          <Button
            type='submit'
            form='formAddCategorie'
            style={{ backgroundColor: '#785ea8', marginRight: 0 }}
            color='primary'
          >
            Valider la commande
          </Button>
        </div>
      </CustomBreadcrumb>
      <Row>
        <Card style={{ padding: '1rem' }}>
          <CardTitle>Details</CardTitle>
          <CardBody label='Adress details'>
            <Row>
              <Col>
                <CardItem>
                  <CardItemTitle>Adress</CardItemTitle>
                  <CardItemValue>{adress.adress}</CardItemValue>
                </CardItem>
              </Col>
              <Col>
                <CardItem>
                  <CardItemTitle>Code Postal</CardItemTitle>
                  <CardItemValue>{adress.zip}</CardItemValue>
                </CardItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <CardItem>
                  <CardItemTitle>Ville</CardItemTitle>
                  <CardItemValue>{adress.ville}</CardItemValue>
                </CardItem>
              </Col>
              <Col>
                <CardItem>
                  <CardItemTitle>Numéro du telephone</CardItemTitle>
                  <CardItemValue>{adress.telNumber}</CardItemValue>
                </CardItem>
              </Col>
            </Row>
          </CardBody>
          <CardBody label='Order details'>
            <Row>
              <Col>
                <CardItem>
                  <CardItemTitle>Prix des article</CardItemTitle>
                  <CardItemValue>{totalPrice}</CardItemValue>
                </CardItem>
              </Col>
              <Col>
                <CardItem>
                  <CardItemTitle>Prix d'expedition</CardItemTitle>
                  <CardItemValue>{expedition}</CardItemValue>
                </CardItem>
              </Col>
              <Col>
                <CardItem>
                  <CardItemTitle>Code Promo</CardItemTitle>
                  <CardItemValue>{code}</CardItemValue>
                </CardItem>
              </Col>
            </Row>
            <Row>
              <Col>
                <CardItem>
                  <CardItemTitle>Remise </CardItemTitle>
                  <CardItemValue>-{remise}</CardItemValue>
                </CardItem>
              </Col>
              <Col>
                <CardItem>
                  <CardItemTitle>Prix d'expedition</CardItemTitle>
                  <CardItemValue>{expedition}.00 MAD</CardItemValue>
                </CardItem>
              </Col>
              <Col>
                <CardItem>
                  <CardItemTitle>Total PRIX</CardItemTitle>
                  <CardItemValue>{totalPrice + expedition - remise} MAD</CardItemValue>
                </CardItem>
              </Col>
            </Row>
          </CardBody>
          {panier.map((a) => (
            <>
              <CardBody label='Article Details'>
                <Row>
                  <Col>
                    <CardItem>
                      <CardItemTitle>Prix</CardItemTitle>
                      <CardItemValue>{a.prix}</CardItemValue>
                    </CardItem>
                  </Col>
                  <Col>
                    <CardItem>
                      <CardItemTitle>Nom de l'article</CardItemTitle>
                      <CardItemValue>{a.name}</CardItemValue>
                    </CardItem>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <CardItem>
                      <CardItemTitle>Prix</CardItemTitle>
                      <CardItemValue>{a.prix}.00 MAD</CardItemValue>
                    </CardItem>
                  </Col>
                  <Col>
                    <CardItem>
                      <CardItemTitle>Nombre d'element </CardItemTitle>
                      <CardItemValue>{a.nbr}</CardItemValue>
                    </CardItem>
                  </Col>
                </Row>
                {/* <hr/> */}
              </CardBody>
            </>
          ))}
        </Card>
      </Row>
    </div>
  );
};

export default Checkout;
