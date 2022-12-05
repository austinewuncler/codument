import React from 'react';
import { ClipLoader } from 'react-spinners';

const LoadingScreen = (): JSX.Element => {
  return (
    <div className="bg-white h-screen grid place-content-center">
      <div className="flex flex-col items-center gap-1">
        <ClipLoader />
        <p>Loading assets</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
