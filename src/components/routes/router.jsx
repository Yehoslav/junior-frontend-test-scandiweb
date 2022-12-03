import {
  createBrowserRouter,
  useRouteError 
} from "react-router-dom";

import {action as indexAction} from '.';

import CartView from "../cart-view";
import ProductView from "../product-view";
import StoreView from "../store-view";
import App from "../app/App";

function ErrorPage() {
  const error = useRouteError();
  console.error(error);

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      width: '100%',
    }}>
      <h1>Oops!</h1>
      <p>Sorry, an unexpected error has occurred.</p>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
}

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
