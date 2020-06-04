import { put, takeEvery, all, call } from "redux-saga/effects";

const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function* helloSaga() {
  console.log("Hello Sagas!");
}

// Our worker Saga: will perform the async increment task
export function* incrementAsync() {
  yield call(delay, 1000);

  // instructs the middleware to schedule
  // the dispatching of an action to the store.
  yield put({ type: "INCREMENT" });
}

// Our watcher Saga: spawn a new incrementAsync task on
// each INCREMENT_ASYNC
export function* watchIncrementAsync() {
  // takeEvery is a helper function provided by redux-saga,
  // to listen for dispatched INCREMENT_ASYNC actions
  // and run incrementAsync each time.
  yield takeEvery("INCREMENT_ASYNC", incrementAsync);
}

// notice how we now only export the rootSaga
// single entry point to start all Sagas at once
export default function* rootSaga() {
  yield all([helloSaga(), watchIncrementAsync()]);
}
