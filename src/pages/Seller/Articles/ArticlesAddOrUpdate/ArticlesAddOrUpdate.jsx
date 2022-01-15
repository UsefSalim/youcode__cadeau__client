import React, { useState, useEffect, useContext } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomBreadcrumb, CustomInput, CustomInputSelect } from 'Components';
import { Button, Card, CardTitle, Row, Col } from '@laazyry/sobrus-design-system';
import { useCrud, useGetOne, useOptions } from 'Hooks';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'Context';

const ArticleAddOrUpdate = () => {
  const { user } = useContext(AuthContext);
  console.log(user);
  const { Add } = useCrud();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
    prix: '',
    description: '',
    image: '',
    brand: '',
    countInStock: '',
    category: '',
  });
  const { data, loading } = useGetOne(`/categories/${id}`);
  useEffect(() => {
    !loading &&
      Object.keys(data).length > 0 &&
      setInitialValues({
        name: data?.name,
      });
  }, [loading, data]);
  console.log(id);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: Yup.object({
      name: Yup.string().required('ce champs ne doit pas etre vide'),
      prix: Yup.number().required('ce champs ne doit pas etre vide'),
      countInStock: Yup.string().required('ce champs ne doit pas etre vide'),
      categorie: Yup.string().required('ce champs ne doit pas etre vide'),
    }),
    onSubmit: (values) => {
      Add('/articles/add', { ...values, user: user?._id }, '', '/admin/articles');
    },
  });
  const categoriesOptions = useOptions('/categories', ['_id', 'name'], 'get', 'data');
  return (
    <div className='Home_container'>
      <CustomBreadcrumb
        title='Tableau de bord'
        body={[
          { el: 'Categories' },
          { el: id ? 'Modifier une categorie' : 'Ajouter une categorie' },
        ]}
      >
        <div>
          <Button
            type='submit'
            form='formAddCategorie'
            style={{ backgroundColor: '#785ea8', marginRight: 0 }}
            color='primary'
          >
            {id ? 'Modifier' : 'Ajouter'}
          </Button>
        </div>
      </CustomBreadcrumb>
      <form id='formAddCategorie' onSubmit={formik.handleSubmit}>
        <Card style={{ margin: 0, padding: '2rem' }}>
          <CardTitle>Formulaire {id ? 'de modification' : "d'ajout"}</CardTitle>
          <Row>
            <Col xs='6'>
              <CustomInput
                formik={formik}
                name='name'
                placeholder="Nom de l'article *"
                validations
              />
            </Col>
            <Col xs='6'>
              <CustomInput
                formik={formik}
                type='number'
                name='prix'
                placeholder='Prix *'
                validations
              />
            </Col>
          </Row>
          <Row>
            <Col xs='12'>
              <CustomInput
                formik={formik}
                type='textarea'
                name='description'
                placeholder='Description'
              />
            </Col>
          </Row>
          <Row>
            <Col xs='4'>
              <CustomInput
                formik={formik}
                type='number'
                name='countInStock'
                placeholder='Nombre en stock *'
                validations
              />
            </Col>
            <Col xs='4'>
              <CustomInput formik={formik} name='brand' placeholder='Marque' validations />
            </Col>
            <Col xs='4'>
              <CustomInputSelect
                formik={formik}
                name='categorie'
                placeholder='Categorie *'
                options={categoriesOptions}
                validations
              />
            </Col>
          </Row>
        </Card>
      </form>
    </div>
  );
};

export default ArticleAddOrUpdate;
