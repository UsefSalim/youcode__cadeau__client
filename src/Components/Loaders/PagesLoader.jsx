import { SpinnerLoading } from '@laazyry/sobrus-design-system';
import React from 'react';

const PagesLoader = () => (
  <div
    style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <SpinnerLoading color='rgb(120, 94, 168)' title='Sobrus - Workspace' loading />
  </div>
);

export default PagesLoader;
