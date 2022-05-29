import { Platform, PermissionsAndroid } from 'react-native';

export const requestGeoPermission = () => new Promise((resolve, reject) => {
  if (Platform.OS === 'ios') {
    resolve(true);
  } else if (Platform.OS === 'android') {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
      title: 'Aura Panic App Location Permission',
      message: 'Aura Panic App needs access to your location so that you can share location.',
      buttonNeutral: 'Ask Me Later',
      buttonNegative: 'Cancel',
      buttonPositive: 'OK'
    }).then(granted => {
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use geolocation');
        resolve(true);
      } else {
        console.log('geolocation permission denied');
        resolve(false);
      }
    }).catch(error => {
      console.log('AccessLocation', error);
      reject(error);
    });
  } else {
    reject(Error('Only iOS/android allowed'));
  }
})