import React from "react";
import ReactDOM from "react-dom";
import App from "./App.js";
import "./index.css";
import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "./store/reducers/rootReducer";
import { Provider } from "react-redux";
import thunk from "redux-thunk";
import { reduxFirestore, getFirestore } from "redux-firestore";
import { reactReduxFirebase, getFirebase } from "react-redux-firebase";
import firebaseConfig from "./config/firebaseConfig";

const store = createStore(
  rootReducer,
  compose(
    applyMiddleware(thunk.withExtraArgument({ getFirebase, getFirestore })),
    reduxFirestore(firebaseConfig),
    reactReduxFirebase(firebaseConfig, {attachAuthIsReady: true})
  )
);
store.firebaseAuthIsReady.then(() => {
  const rootElement = document.getElementById("root");
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    rootElement
  );
});
