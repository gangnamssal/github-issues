import { combineReducers } from 'redux';

import homeStore from './homeStore';

const rootReducer = combineReducers({ homeStore });

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;
