import {
  Modal,
  ModalBody,
  ModalHeader,
  Button,
  Card,
  SpinnerLoading,
  Row,
  Col,
} from '@laazyry/sobrus-design-system';
import React, { useContext, useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { CustomInput, CustomInputSelect } from 'Components';
import { useAuth } from 'Hooks';
import formLogo from 'assets/form.png';
import { AuthContext } from 'Context';
const AccountPage = ({ open, setOpen }) => {
  const { login, register } = useContext(AuthContext);
  const [toggle, setToggle] = useState(true);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: toggle
      ? {
          email: '',
          password: '',
        }
      : {
          email: '',
          password: '',
          name: '',
          role: '',
        },
    validationSchema: Yup.object(
      toggle
        ? {
            email: Yup.string().email().required('ce champs ne doit pas etre vide'),
            password: Yup.string().required('ce champs ne doit pas etre vide'),
          }
        : {
            name: Yup.string().required('le champs nom  ne doit pas etre vide'),
            email: Yup.string().email().required('ce champs ne doit pas etre vide'),
            password: Yup.string().required('ce champs ne doit pas etre vide'),
            role: Yup.string().required('Veiller choisir un role'),
          }
    ),
    onSubmit: (values) => {
      toggle ? login(values, setOpen) : register(values, setOpen);
    },
  });
  return (
    <div style={{ marginBottom: 30, width: '20%' }}>
      <Modal onClose={() => setOpen(false)} isOpen={open}>
        <ModalHeader onClose={() => {}} />
        <ModalBody
          style={{
            marginTop: '2rem',
            marginBottom: '4rem',
            position: 'relative',
          }}
        >
          <img style={{ marginTop: '-120px' }} src={formLogo} alt='' />
          <form id='formRegister' onSubmit={formik.handleSubmit}>
            <Card style={{ width: 'auto', marginTop: '-180px', padding: '2rem' }}>
              {!toggle && (
                <CustomInput
                  formik={formik}
                  name='name'
                  placeholder='Nom Complet *'
                  validations
                ></CustomInput>
              )}
              <CustomInput
                type='email'
                formik={formik}
                name='email'
                placeholder='Email *'
                validations
              ></CustomInput>
              <CustomInput
                type='password'
                formik={formik}
                name='password'
                placeholder='Password *'
                validations
              ></CustomInput>
              {!toggle && (
                <CustomInputSelect
                  formik={formik}
                  name='role'
                  placeholder='Type de compte *'
                  options={[
                    { value: 'Seller', label: 'Vendeur' },
                    { value: 'User', label: 'Acheteur' },
                  ]}
                  validations
                ></CustomInputSelect>
              )}
            </Card>
          </form>
          <Row style={{ paddingTop: '2rem' }}>
            <Col>
              {toggle ? (
                <Button
                  outline
                  style={{ margin: 0 }}
                  color='danger'
                  onClick={() => setToggle(!toggle)}
                >
                  Crée un compte
                </Button>
              ) : (
                <div
                  style={{ fontSize: 13, color: 'red', cursor: 'pointer' }}
                  onClick={() => setToggle(!toggle)}
                >
                  Vous avez déja un compte Se Connecter
                </div>
              )}
            </Col>
            <Col style={{ textAlign: 'right' }}>
              <Button
                style={{ backgroundColor: 'red', margin: 0 }}
                color='danger'
                type='submit'
                form='formRegister'
              >
                {toggle ? 'Se Connecter' : "S'enregistrer"}
              </Button>
            </Col>
          </Row>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default AccountPage;
