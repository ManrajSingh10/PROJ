import { createBrowserRouter } from 'react-router-dom';
import Layout from '../Layout';
import Home from '../Pages/Home';
import Login from '../Pages/Login';
import Register from '../Pages/Register';
import Profile from '../Pages/Profile';
import ListProperty from '../Pages/ListProperty';
import PropertyDetail from '../Pages/PropertyDetail';
import UserRentedProperties from "../Pages/UserRentedProperties"
import UserSaleProperties from "../Pages/UserSaleProperties"
import Edit from '../Pages/Edit';
import Favourite from '../Pages/Favourite';
import Inbox from '../Pages/Inbox';
import Request from '../Pages/Request';

const router = createBrowserRouter([
  {
    path: "",
    element: <Layout />, 
    children: [
      {
        path: "/",
        element: <Home />, 
      },
      {
        path:"/login",
        element:<Login/>
      },
      {
        path:"/register",
        element:<Register/>
      },
      {
        path:"/profile",
        element:<Profile/>
      },
      {
        path:"/list-property",
        element:<ListProperty/>,
      },
      {
        path:"/property/:propertyId",
        element : <PropertyDetail/>
      },
      {
        path:"/listRent",
        element:<UserRentedProperties/>
      },
      {
        path:"/listSale",
        element:<UserSaleProperties/>
      },
      {
        path:"/edit/:propertyId",
        element:<Edit/>
      },
      {
        path:"/favourites",
        element:<Favourite/>
      },
      {
        path:"/inbox",
        element:<Inbox/>
      },
      {
        path : "/request",
        element:<Request/>
      }
    ],
  },
]);

export default router;
