import React from 'react';
import router from "./Routes/Routes"
import { RouterProvider } from 'react-router-dom';
import Login from './Pages/Login';
function App() {
  return (
    // <div>
    //   {/* <RouterProvider router={router}></RouterProvider> */}
    //   <Login/>
    // </div>
    <div>
      <RouterProvider router={router} />
    </div>

  );
}

export default App;

