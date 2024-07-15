import { createBrowserRouter } from "react-router-dom";
import Error from "../components/Error";
import Protect from "../routers/protected/protectedRoutes";
import Dash from "../components/Dash";
import App from "../App";
import Home from "../components/Home";
import Login from "../components/Login";
import SignUp from "../components/SignUp";
import Order from "../components/Order";
import UpdateOrder from "../components/UpdateOrder";

const appRouter = createBrowserRouter([
  {
    path: "/",
    element: (
      <Protect>
        <App />
      </Protect>
    ),
    errorElement: <Error/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/dash",
        element: <Dash/>,
      },
      {
        path: "/order",
        element: <Order/>,
      },
      {
        path: "/updateorder/:id",
        element: <UpdateOrder/>,
      },
   
    ],
  },
  {
    path: "/login",
    element: <Login/>,
  },
  {
    path: "/signup",
    element: <SignUp/>,
  },
  {
    path:'*',
    element:<Error message="Page Not Found" />
  },
]);

export default appRouter;
