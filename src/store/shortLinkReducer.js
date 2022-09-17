const defaultState = { links: [] };

const ADD_LINK_ASYNC = 'ADD_LINK';

export const ShortLinkReducer = (state = defaultState, action) => {
  switch (action.type) {
    case ADD_LINK_ASYNC:
      return { ...state, links: [...state.links, action.payload] };
    default:
      return state;
  }
};

export const addLinkAsyncAction = (payload) => ({
  type: ADD_LINK_ASYNC,
  payload,
});
