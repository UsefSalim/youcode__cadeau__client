import React, { useState, useEffect, useContext, useLayoutEffect } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomBreadcrumb, CustomInput, CustomInputSelect } from 'Components';
import { Button, Card, CardTitle, Row, Col, CardBody } from '@laazyry/sobrus-design-system';
import { useCrud, useGetOne, useOptions } from 'Hooks';
import { useParams } from 'react-router-dom';
import { AuthContext } from 'Context';
import { MultiImagePicker } from 'Components/ImagePicker/multiImagePicker';

const SellerArticlesAddOrUpdate = () => {
  const { user } = useContext(AuthContext);
  const { Add, PutUpdate } = useCrud();
  const { id } = useParams();
  const [imagesData, setImagesData] = useState([]);
  const [initialImageState, setInitialImageState] = useState([]);
  const [LoadingImageUpload, setLoadingImageUpload] = useState(true);
  const [initialValues, setInitialValues] = useState({
    name: '',
    prix: '',
    description: '',
    brand: '',
    countInStock: '',
    categorie: '',
  });
  const { data, loading } = useGetOne(`/articles/one/${id}`);
  function toDataUrl(name, callback) {
    let url = `http://localhost:5000/api/${name}`;
    var xhr = new XMLHttpRequest();
    xhr.onload = function () {
      var reader = new FileReader();
      reader.onloadend = function () {
        callback(reader.result);
      };
      reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.responseType = 'blob';
    xhr.send();
  }
  async function urltoFile(filename) {
    let url = `http://localhost:5000/api/${filename}`;
    const mimeType = filename?.slice(filename?.lastIndexOf('.'));
    const res = await fetch(url);
    const buf = await res.arrayBuffer();
    const file = new File([buf], filename, { type: mimeType });
    toDataUrl(filename, function (myBase64) {
      setInitialImageState((prev) => [...prev, { done: false, source: myBase64, file }]);
    });
  }
  useLayoutEffect(() => {
    !loading &&
      Object.keys(data).length > 0 &&
      setInitialValues({
        name: data?.name,
        prix: data?.prix,
        description: data?.description,
        brand: data?.brand,
        countInStock: data?.countInStock,
        categorie: data?.categorie,
      });
  }, [data, loading]);

  useEffect(() => {
    if (!loading && Object.keys(data).length > 0) {
      const images = [...data?.images];
      Promise.all(
        images?.map(async (p) => {
          await urltoFile(p?.path);
        })
      );
    }
  }, [data, loading]);
  useEffect(() => {
    if (!loading && Object.keys(data).length > 0) {
      data?.images?.length === initialImageState?.length && setLoadingImageUpload(false);
    }
  }, [initialImageState, data, loading]);
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
      const formData = new FormData();
      for (const [key, value] of Object.entries({ ...values, user: user?._id })) {
        if (typeof value === 'object') {
          formData.append([key], JSON.stringify(value));
        } else {
          formData.append([key], value);
        }
      }
      for (let i = 0; i < imagesData.length; i++) {
        formData.append('images', imagesData[i].file);
      }
      id
        ? PutUpdate(`/articles/${id}`, formData, '', '/shope/article')
        : Add('/articles/add', formData, '', '/shope/article');
    },
  });
  const categoriesOptions = useOptions('/categories', ['_id', 'name'], 'get', 'data');
  console.log(imagesData);
  return (
    <div className='Home_container'>
      <CustomBreadcrumb
        back
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
      <Card style={{ margin: 0, padding: '2rem' }}>
        <form id='formAddCategorie' onSubmit={formik.handleSubmit}>
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
        </form>
        {(!LoadingImageUpload || !id) && (
          <CardBody label="Photos d'article">
            <Row>
              <Col>
                <MultiImagePicker
                  initialState={initialImageState}
                  setImagesData={setImagesData}
                  imagesData={imagesData}
                  onRemove={() => {}}
                  selectOptions={[{ value: 'value1', label: 'label1' }]}
                  selectProps={{}}
                  inputProps={{
                    placeholder: 'test option ',
                  }}
                />
              </Col>
            </Row>
          </CardBody>
        )}
      </Card>
    </div>
  );
};

export default SellerArticlesAddOrUpdate;
