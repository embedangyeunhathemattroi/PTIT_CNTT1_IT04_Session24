import React, { useEffect } from 'react';

 export default function B3() {
  useEffect(() => {
    console.log('Welcome component mounted!');
    alert('Welcome to our website!');
  }, []);

  return (
    <div>
      <h1>Hello!</h1>
    </div>
  );
}
