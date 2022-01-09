/* eslint-disable consistent-return */
import React from 'react';
import { Redirect } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from 'Context/AuthContext';

const FailureComponent = () => {
  const { error } = useContext(AuthContext);
  const verifyError = () => {
    if (error === 'code1') {
      localStorage.clear();
      return <Redirect to='auth/login' />;
    }
    if (error === 'code2') {
      localStorage.clear();
      return <Redirect to='auth/login' />;
    }
    if (error === 'code3') {
      localStorage.clear();
      return <Redirect to='auth/login' />;
    }
    if (error === 'code5') {
      return (
        <Redirect
          to={{
            pathname: '/error',
            state: {
              message:
                'Votre compte Workspace semble être introuvable ou désactivé, si vous ignorez la raison de cette erreur vous pouvez contacter le service client contact@Workspace.store',
              codeError: 'code 5',
            },
          }}
        />
      );
    }
    if (error === 'code6') {
      return (
        <Redirect
          to={{
            pathname: '/error',
            state: {
              message:
                'Votre compte Workspace semble être introuvable ou désactivé, si vous ignorez la raison de cette erreur vous pouvez contacter le service client contact@Workspace.store',
              codeError: 'code 6',
            },
          }}
        />
      );
    }
    if (error === 'code7') {
      return (
        <Redirect
          to={{
            pathname: '/error',
            state: {
              message:
                'Votre compte Workspace semble être introuvable ou désactivé, si vous ignorez la raison de cette erreur vous pouvez contacter le service client contact@Workspace.store',
              codeError: 'code 7',
            },
          }}
        />
      );
    }
  };

  return verifyError();
};

export default FailureComponent;
