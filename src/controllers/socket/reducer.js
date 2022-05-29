import * as types from './types';

const initialState = {
  location: null
};

export default socketReducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TURN_ON_LOCATION:
      return {
        ...state,
        location: {
          watchId: action.payload.watchId,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      };
    case types.TURN_OFF_LOCATION:
      return {
        ...state,
        location: null
      };
    case types.UPDATE_LOCATION:
      return {
        ...state,
        location: {
          ...state.location,
          latitude: action.payload.latitude,
          longitude: action.payload.longitude
        }
      };
    default:
      return state;
  }
}