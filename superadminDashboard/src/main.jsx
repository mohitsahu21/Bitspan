// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App.jsx";
// import { BrowserRouter } from "react-router-dom";
// // import './index.css'
// import { persistor, store } from './redux/store.js'
// import { Provider } from 'react-redux';
// import { PersistGate } from 'redux-persist/integration/react';

// ReactDOM.createRoot(document.getElementById("root")).render(
//   // <React.StrictMode>
//     <BrowserRouter>

//       <Provider store={store}>
//         <PersistGate persistor={persistor} loading={null}>
//           <App />
//         </PersistGate>
//       </Provider>
//     </BrowserRouter>
//   // </React.StrictMode>
// );

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { createHashRouter, RouterProvider } from "react-router-dom";
import { persistor, store } from "./redux/store.js";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";

// Define your routes using createHashRouter
const router = createHashRouter([
  {
    path: "/*",
    element: <App />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <RouterProvider router={router} />
    </PersistGate>
  </Provider>
);
