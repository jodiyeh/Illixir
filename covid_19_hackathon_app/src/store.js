import { createStore, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from "./reducers"; // reducers take the current state of the tree and the action and return the next state

// initial state of store
const initialState = {};

// thunk - calls actions that are functions and returns values
const middleware = [thunk];

// store is a maintainer that has a few methods:
// getState() - returns current state
// dispatch(action) - dispatch an action to change state
// subscribe(listener) - listens to changes in state tree
// replaceReducer(nextReducer) - replaces reducer
const store = createStore(
  rootReducer,
  initialState,
  compose(
    applyMiddleware(...middleware),
    (window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ &&
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__()) ||
      compose
  )
);

export default store;
