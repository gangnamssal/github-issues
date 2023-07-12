import { combineReducers, createStore } from 'redux';

const reducer = combineReducers({});

// root reducer를 통해서 store 생성
export const store = createStore(reducer);
