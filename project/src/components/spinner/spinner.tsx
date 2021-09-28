import React from 'react';

export default function Spinner(): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent:'center',
        alignItems:'center',
        minHeight:'100vh',
      }}
    >
      <img src='img/loading.svg' alt='loading' />
    </div>
  );
}
