import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Button, Card, SpinnerLoading } from '@laazyry/sobrus-design-system';
import { CustomInput } from 'Components';
import { useAuth } from 'Hooks';

const Login = () => {
  const { login, loading } = useAuth();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required('ce champs ne doit pas etre vide'),
      password: Yup.string().required('ce champs ne doit pas etre vide'),
    }),
    onSubmit: (values) => {
      login(values);
    },
  });
  console.log(loading);
  return (
    <div className='c_register_container'>
      <form id='formRegister' onSubmit={formik.handleSubmit}>
        <Card style={{ width: '450px', padding: '2rem' }}>
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
          {false ? (
            <SpinnerLoading loading={true} color='#785ea8' title='' />
          ) : (
            <Button
              style={{ backgroundColor: '#785ea8', margin: 0, width: '100%' }}
              color='primary'
              type='submit'
              form='formRegister'
            >
              Se Connecter
            </Button>
          )}
        </Card>
      </form>
    </div>
  );
};

export default Login;
