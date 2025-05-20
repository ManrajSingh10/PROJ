import React from 'react';

function LoadingComponent() {
  return (
    <div className="absolute inset-0 flex justify-center items-center bg-white bg-opacity-50 z-50">
      <iframe
        src="https://lottie.host/embed/33181684-1843-4d9e-a049-7dc105440de7/derTvlOFxE.lottie"
        className="w-32 h-32"
        title="Loading Animation"
      ></iframe>
    </div>
  );
}

export default LoadingComponent;
