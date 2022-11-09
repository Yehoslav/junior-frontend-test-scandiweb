import {
  createBrowserRouter,
  Route
} from "react-router-dom";



import {action as indexAction} from '.';
import App from "../app/App";
import ProductView from "../product-view/ProductView";
import StoreView from "../store-view";

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    // FIXME: ADD error element :)
    children: [
      {
        index: true, 
        // loader: storeLoader,
        loader: indexAction,
        element: <h1> Loading the page </h1>
      },
      {
        path: "store/:category",
        // loader: storeLoader,
        element: <StoreView />
      },
      {
        path: "product/:productId",
        // loader: storeLoader,
        element: <ProductView />
      },
    ],
  }
])

export default router;
