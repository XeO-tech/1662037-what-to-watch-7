import React from 'react';

export default function Spinner({
  isTopLeftAligned = false,
}: {
  isTopLeftAligned?: boolean;
}): JSX.Element {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: isTopLeftAligned ? 'start' : 'center',
        alignItems: isTopLeftAligned ? 'flex-start' : 'center',
        minHeight: '100vh',
      }}
    >
      <img src='img/loading.svg' alt='loading' />
    </div>
  );
}
