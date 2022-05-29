import Geolocation from '@react-native-community/geolocation';
import * as types from './types';

export const watchLocation = (onOff) => {
  return (dispatch, getState) => {
    if (onOff) {
      const watchId = Geolocation.watchPosition(
        (position) => {
          dispatch({
            type: types.UPDATE_LOCATION,
            payload: {
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        (error) => {
          console.log('watch location error', error.message);
        },
        { distanceFilter: 1 }
      );
      Geolocation.getCurrentPosition(
        (position) => {
          dispatch({
            type: types.TURN_ON_LOCATION,
            payload: {
              watchId,
              latitude: position.coords.latitude,
              longitude: position.coords.longitude
            }
          });
        },
        (error) => {
          console.log('get current location error', error.message);
        },
        { distanceFilter: 1 }
      );
    } else {
      const {
        socket: { location }
      } = getState();
      if (location) {
        Geolocation.clearWatch(location.watchId);
        dispatch({ type: types.TURN_OFF_LOCATION });
      }
    }
  }
}