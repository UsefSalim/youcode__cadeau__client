import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card } from '@laazyry/sobrus-design-system';
import { CustomInput, CustomInputSelect } from 'Components';
import { useAuth } from 'Hooks';

const Register = () => {
  const { user, register, error, setError, loading } = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: '',
      email: '',
      password: '',
      role: '',
    },
    validationSchema: Yup.object({
      name: Yup.string().required('le champs nom  ne doit pas etre vide'),
      email: Yup.string()
        .email('email non valide')
        .required('le champs email ne doit pas etre vide'),
      password: Yup.string().required('Veiller choisir un mot de passe'),
      role: Yup.string().required('Veiller choisir un role'),
    }),
    onSubmit: (values) => {
      const valid = values.role === 'Seller' ? false : true;
      register({ ...values, valid });
    },
  });
  console.log(formik.errors);
  return (
    <div className='c_register_container'>
      <form id='formRegister' onSubmit={formik.handleSubmit}>
        <Card style={{ width: '450px', padding: '2rem' }}>
          <CustomInput
            formik={formik}
            name='name'
            placeholder='Nom Complet *'
            validations
          ></CustomInput>
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
          <Button
            style={{ backgroundColor: '#785ea8', margin: 0, width: '100%' }}
            color='primary'
            type='submit'
            form='formRegister'
          >
            Crée un compte
          </Button>
        </Card>
      </form>
    </div>
  );
};

export default Register;
