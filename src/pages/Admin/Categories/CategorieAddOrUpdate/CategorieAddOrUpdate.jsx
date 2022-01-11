import React, { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomBreadcrumb, CustomInput } from 'Components';
import { Button, Card, CardTitle, Row, Col } from '@laazyry/sobrus-design-system';
import { useCrud, useGetOne } from 'Hooks';
import { useParams } from 'react-router-dom';

const CategorieAddOrUpdate = () => {
  const { Add } = useCrud();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
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
    }),
    onSubmit: (values) => {
      Add('/categories/add', values, '', '/admin/profile');
    },
  });
  console.log(formik.errors);
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
            <Col xs='12'>
              <CustomInput
                formik={formik}
                name='name'
                placeholder='Nom de la categorie *'
                validations
              />
            </Col>
          </Row>
        </Card>
      </form>
    </div>
  );
};

export default CategorieAddOrUpdate;
