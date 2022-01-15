import React, { useState, useEffect, useContext } from 'react';
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
  const { Add } = useCrud();
  const { id } = useParams();
  const [imagesData, setImagesData] = useState([]);
  const [initialImageState, setInitialImageState] = useState([]);
  const [initialValues, setInitialValues] = useState({
    name: '',
    prix: '',
    description: '',
    image: '',
    brand: '',
    countInStock: '',
    category: '',
    pictures: [],
  });
  // const { data, loading } = useGetOne(`/categories/${id}`);
  //   function toDataUrl(name, callback) {
  //   let url = `https://api.workspace.sobrus.ovh/images/hardwares/${name}`;
  //   var xhr = new XMLHttpRequest();
  //   xhr.onload = function () {
  //     var reader = new FileReader();
  //     reader.onloadend = function () {
  //       callback(reader.result);
  //     };
  //     reader.readAsDataURL(xhr.response);
  //   };
  //   xhr.open('GET', url);
  //   xhr.responseType = 'blob';
  //   xhr.send();
  // }
  // async function urltoFile(filename) {
  //   let url = `https://api.workspace.sobrus.ovh/images/hardwares/${filename}`;
  //   const mimeType = filename?.slice(filename?.lastIndexOf('.'));
  //   const res = await fetch(url);
  //   const buf = await res.arrayBuffer();
  //   const file = new File([buf], filename, { type: mimeType });
  //   toDataUrl(filename, function (myBase64) {
  //     setInitialImageState((prev) => [...prev, { done: false, source: myBase64, file }]);
  //   });
  // }
  //   useLayoutEffect(() => {
  //   !loading &&
  //     Object.keys(data).length > 0 &&
  //     setInitialState({
  //       type: { id: data?.hardwareType?.id },
  //       state: data?.state || '',
  //       brand: data?.brand || '',
  //       comment: data?.comment || '',
  //       durability: data?.durability || null,
  //       value: data?.value || '',
  //       reference: data?.reference || '',
  //     });
  // }, [data, loading]);
  // console.log(imagesData);
  // useEffect(() => {
  //   if (!loading && Object.keys(data).length > 0) {
  //     const pictures = [...data?.pictures];
  //     Promise.all(
  //       pictures?.map(async (p) => {
  //         await urltoFile(p?.pictureName);
  //       })
  //     );
  //   }
  // }, [data, loading]);

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
      Add('/articles/add', { ...values, user: user?._id }, '', '/shope/article');
    },
  });
  const categoriesOptions = useOptions('/categories', ['_id', 'name'], 'get', 'data');
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
      </Card>
    </div>
  );
};

export default SellerArticlesAddOrUpdate;
