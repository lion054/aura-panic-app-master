import React, { PureComponent } from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { Icon } from 'react-native-elements';
import MapView, { Marker } from 'react-native-maps';
import EStyleSheet from 'react-native-extended-stylesheet';
import { connect } from 'react-redux';

import { requestGeoPermission } from '../helpers/permissions';
import { watchLocation } from '../controllers/socket/actions';
import { apiRequest } from '../controllers/api/actions';

const Color = require('color');

class SecurityAlert extends PureComponent {
  state = {
    spots: []
  }

  componentDidMount() {
    requestGeoPermission().then(granted => {
      if (granted) {
        this.props.watchLocation(true);
      } else {
        this.props.navigation.goBack();
      }
    }).catch(e => {
      console.log('GeoPermission', e.message);
    });
  }

  componentWillUnmount() {
    if (this.props.location) {
      this.props.watchLocation(false);
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (!prevProps.location && this.props.location) {
      if (this.props.location.latitude !== undefined && this.props.location.longitude !== undefined) {
        this.props.apiRequest({
          url: '/nearby_security',
          method: 'POST',
          data: {
            latitude: this.props.location.latitude,
            longitude: this.props.location.longitude
          },
          onSuccess: (json) => {
            this.setState({ spots: json });
          }
        });
      }
    }
  }

  render = () => (
    <View style={{ flex: 1 }}>
      <MapView
        style={styles.map}
        initialRegion={this.props.location && {
          latitude: this.props.location.latitude,
          longitude: this.props.location.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421
        }}
      >
        {this.props.location && (
          <Marker
            coordinate={{
              latitude: this.props.location.latitude,
              longitude: this.props.location.longitude
            }}
            style={styles.locationMarker}
            anchor={{ x: 0.5, y: 0.5 }}
          >
            <View
              style={{
                ...styles.outerCircle,
                backgroundColor: Color(EStyleSheet.value('$primaryColor')).alpha(0.08).string()
              }}
            />
            <View
              style={{
                ...styles.innerCircle,
                backgroundColor: Color(EStyleSheet.value('$primaryColor')).alpha(0.12).string()
              }}
            />
            <Image
              source={require('../../assets/images/map-marker-blue.png')}
              style={styles.blueMarker}
            />
          </Marker>
        )}
        {this.state.spots.map((spot, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: spot.latitude,
              longitude: spot.longitude
            }}
          >
            <Image
              source={require('../../assets/images/map-marker-pink.png')}
              style={styles.redMarker}
            />
          </Marker>
        ))}
      </MapView>
      <Icon
        name="arrow-back"
        type="ionicon"
        containerStyle={styles.backWrapper}
        style={styles.back}
        Component={TouchableOpacity}
        onPress={() => this.props.navigation.goBack()}
      />
    </View>
  )
}

const styles = EStyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  },
  locationMarker: {
    width: '120rem',
    height: '120rem'
  },
  outerCircle: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '120rem',
    height: '120rem',
    borderRadius: '60rem'
  },
  innerCircle: {
    position: 'absolute',
    left: '32rem',
    top: '32rem',
    width: '56rem',
    height: '56rem',
    borderRadius: '28rem'
  },
  blueMarker: {
    width: '24rem',
    height: '28rem',
    top: '32rem',
    left: '48rem'
  },
  redMarker: {
    width: '24rem',
    height: '28rem'
  },
  backWrapper: {
    position: 'absolute',
    top: '20rem',
    left: '20rem'
  },
  back: {
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    borderRadius: '20rem'
  }
});

const mapStateToProps = ({
  socket: { location }
}) => ({
  location
});

const mapDispatchToProps = (dispatch) => ({
  watchLocation: (onOff) => dispatch(watchLocation(onOff)),
  apiRequest: (params) => dispatch(apiRequest(params))
});

export default connect(mapStateToProps, mapDispatchToProps)(SecurityAlert);