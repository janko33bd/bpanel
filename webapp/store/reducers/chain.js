import Immutable from 'seamless-immutable';

import { SET_CHAIN_TIP } from '../constants/chain';
import { decorateReducer } from '../../plugins/plugins';

const initialState = Immutable({
  height: 0,
  progress: 0
});

const chainState = (state = initialState, action) => {
  let newState = { ...state };
  switch (action.type) {
    case SET_CHAIN_TIP: {
      const { progress, height, time, tip } = action.payload;
      return state.merge(action.payload);
    }

    default:
      return state;
  }
};

export default decorateReducer(chainState, 'chainReducer');