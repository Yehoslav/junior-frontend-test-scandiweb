import React from 'react';
import ReactDOM from 'react-dom/client';

import {
  createBrowserRouter,
  RouterProvider,
  Route
} from "react-router-dom";

import './index.scss';
import App from './components/app/App';
import reportWebVitals from './reportWebVitals';

const router = createBrowserRouter ([
  {
    path: "/",
    element: <App />,
    // FIXME: ADD error element :)
    children: [
      {
        index: true, 
        // loader: storeLoader,
        element: <h1> Loading the page </h1>
      },

    ],
  }
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
