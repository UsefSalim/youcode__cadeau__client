import React, { useContext, useEffect, useState } from 'react';
import {
  Row,
  Col,
  AuditCard,
  AuditCardHeader,
  AuditCardHeaderIcon,
  AuditCardTitle,
  AuditCardBody,
  IconButton,
  CheckBox,
  Label,
  AccordionCard,
} from '@laazyry/sobrus-design-system';
import './categories.css';
import { MdLocationSearching, CgGift } from 'react-icons/all';
import { useCrud } from 'Hooks';
import { NavLink, useParams } from 'react-router-dom';
import { sliceText } from './../../Services/functionHelpers';
import { PanierContext } from 'Context';
const Categories = () => {
  const { panier, setPanier } = useContext(PanierContext);
  const { id } = useParams();
  const initialQueryState = {
    page: 1,
    limit: 20,
    order: 'DESC',
    orderBy: 'id',
  };
  const initialQueryStateArticle = {
    page: 1,
    limit: 20,
    order: 'DESC',
    orderBy: 'id',
    categorie: id,
  };
  const [categoriesInitialState] = useState(initialQueryState);
  const [articleInitialState, setArticleInitialState] = useState(initialQueryStateArticle);
  const { data, FetchGet } = useCrud('/categories', 'data', categoriesInitialState);
  const { data: articles, FetchGet: FetchGetArticles } = useCrud(
    '/articles',
    'data',
    articleInitialState
  );
  useEffect(() => FetchGet(), [FetchGet]);
  useEffect(() => FetchGetArticles(), [FetchGetArticles]);
  const handelAddToCard = (article) => {
    if (panier.length === 0 || !panier.some((a) => a?._id === article?._id))
      setPanier((prev) => [...prev, { ...article, nbr: 1 }]);
  };
  return (
    <>
      <div className='categories__pub'>
        <span> -15% </span>
        dès 50€ d'achats avec le code COCOONING(1)
      </div>
      <div className='Home_container'>
        <Row>
          <Col xs='3'>
            <AuditCard>
              <div className='header__card'>
                <IconButton>
                  <MdLocationSearching size={20} />
                </IconButton>
                <AuditCardTitle>Filtrer vos achats</AuditCardTitle>
              </div>
              <AuditCardBody>
                <AccordionCard tagNum={data?.length} headerTitle='Categories'>
                  {data?.map((d) => (
                    <NavLink to={`/categorie/${d?._id}`}>
                      <Label
                        onClick={() =>
                          setArticleInitialState((prev) => ({ ...prev, categorie: d?._id }))
                        }
                        style={{ display: 'flex', alignItems: 'center' }}
                        for={d?._id}
                      >
                        <CheckBox id={d?._id} checked={d?._id === id}></CheckBox>{' '}
                        <span>{d?.name}</span>
                      </Label>{' '}
                    </NavLink>
                  ))}
                </AccordionCard>
              </AuditCardBody>
            </AuditCard>
          </Col>
          <Col xs='9'>
            <AuditCard>
              <AuditCardHeader>
                <AuditCardHeaderIcon />
                <AuditCardTitle>Articles</AuditCardTitle>
              </AuditCardHeader>
              <AuditCardBody>
                <div className='card__articles'>
                  {articles?.map((a) => (
                    <div className='card__article'>
                      <h3>{a?.name}</h3>
                      <div className='images__container'>
                        <img
                          src={`http://localhost:5000/api/${a?.images[0]?.path}`}
                          alt={a?.images[0]?.path}
                        />
                      </div>
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <div>
                          <p className='article__description'>{sliceText(a?.description, 40)}</p>
                          <p className='article__prix'>{a?.prix}.00 MAD</p>
                        </div>
                        <IconButton
                          style={{
                            margin: '0 1rem',
                            lineHeight: 1,
                            backgroundColor: 'red',
                            color: '#fafafa',
                          }}
                          title='Ajouter au panier'
                          onClick={() => handelAddToCard(a)}
                          color='red'
                        >
                          <CgGift size={20} />
                        </IconButton>
                      </div>
                    </div>
                  ))}
                </div>
              </AuditCardBody>
            </AuditCard>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default Categories;
