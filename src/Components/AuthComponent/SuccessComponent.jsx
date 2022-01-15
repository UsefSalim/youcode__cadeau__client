import { AuthContext } from 'Context';
import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import { PagesLoader } from 'Components';

const SuccessComponent = () => {
  const { loading } = useContext(AuthContext);
  return <>{loading ? <PagesLoader /> : <Redirect to='/' />}</>;
};

export default SuccessComponent;
