const LOAD = 'zhide/commodity/LOAD';
const LOAD_SUCCESS = 'zhide/commodity/LOAD_SUCCESS';
const LOAD_FAIL = 'zhide/commodity/LOAD_FAIL';

const initialState = {
  loaded: false
};

export default function commodity(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        data: action.result
      };
    case LOAD_FAIL:
      console.log(action)
      return {
        ...state,
        loading: false,
        loaded: false,
        error: action.error
      };
    default:
      return state;
  }
}

export function isLoaded(globalState) {
  return globalState.commodity && globalState.commodity.loaded;
}

export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/loadCommodity')
  };
}
