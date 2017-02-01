const SHOW = 'zhide/commodity/editor/SHOW';
const HIDE = 'zhide/commodity/editor/HIDE'
const SAVE = 'zhide/commodity/editor/SAVE'
const SAVE_SUCCESS = 'zhide/commodity/editor/SAVE_SUCCESS';
const SAVE_FAIL = 'zhide/commodity/editor/SAVE_FAIL';

const initialState = {
  visible: false,
  title: "添加商品",
  loading: false,
  
  id: null,
  name: "",
  sliders: [],
};

export default function commodity(state = initialState, action = {}) {
  switch (action.type) {
    case SHOW:
      return {
        ...state,
        visible: true
      };
    case HIDE:
      return {
        ...state,
        visible: false
      };
    case SAVE:
      return {
        ...state,
        loading: true
      };
    case SAVE_SUCCESS:
      return {
        ...state,
        loading: false,
        visible: false
      };
    case SAVE_FAIL:
      return {
        ...state,
        loading: false,
        visible: false
      };
    default:
      return state;
  }
}

export function save(params) {
  return {
    types: [SAVE, SAVE_SUCCESS, SAVE_FAIL],
    promise: (client) => client.post('/commodity/save', {
        data: params
    })
  };
}

export function toggle(visible) {
    return {
        type: visible ? SHOW : HIDE
    }
}
