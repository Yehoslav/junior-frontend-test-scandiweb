import {
  createBrowserRouter,
} from "react-router-dom";

import {
  action as indexAction,
  ErrorPage
} from '.';

import CartView from "../cart-view";
import ProductView from "../product-view";
import StoreView from "../store-view";
import App from "../app/App";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, 
        loader: indexAction,
        element: <h1>Loading all categories.</h1>
      },
      {
        path: "store/:category",
        element: <StoreView />
      },
      {
        path: "product/:productId",
        element: <ProductView />
      },
      {
        path: "cart",
        element: <CartView />
      },
    ],
  }
])

export default router;
