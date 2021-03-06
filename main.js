import "babel-polyfill";

import React from "react";
import ReactDOM from "react-dom";
import { createStore, applyMiddleware } from "redux";
import createSagaMiddleware from "redux-saga";

import Counter from "./Counter";
import reducer from "./reducers";
import rootSaga, { helloSaga } from "./sagas";

// create a middleware using the factory function
// createSagaMiddleware exported by the redux-saga library
const sagaMiddleware = createSagaMiddleware();

// connect our middleware to the Store using applyMiddleware.
const store = createStore(reducer, applyMiddleware(sagaMiddleware));

// Then we can start our Saga.
sagaMiddleware.run(rootSaga);

const action = (type) => store.dispatch({ type });

function render() {
  ReactDOM.render(
    <Counter
      value={store.getState()}
      onIncrement={() => action("INCREMENT")}
      onDecrement={() => action("DECREMENT")}
      onIncrementAsync={() => action("INCREMENT_ASYNC")}
    />,
    document.getElementById("root")
  );
}

render();
store.subscribe(render);
