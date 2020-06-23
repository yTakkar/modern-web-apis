import React, { Suspense } from "react";

const RouteLoader = Component => props => {
  return (
    <Suspense fallback='Loading..'>
      <Component {...props} />
    </Suspense>
  );
};

export default RouteLoader;