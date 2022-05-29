import React, { PureComponent } from 'react';
import { Image, View } from 'react-native';
import { Button } from 'react-native-elements';
import EStyleSheet from 'react-native-extended-stylesheet';

import HorizSpacer from '../components/HorizSpacer';
import { displayFontStyles } from '../helpers/fonts';

class Home extends PureComponent {
  onHealthAlert = () => {
    this.props.navigation.navigate('HealthAlert');
  }

  onSecurityAlert = () => {
    this.props.navigation.navigate('SecurityAlert');
  }

  render = () => (
    <View style={{
      flex: 1,
      alignItems: 'center'
    }}>
      <View style={{
        flex: 1,
        justifyContent: 'center'
      }}>
        <Image
          source={require('../../assets/images/aura-primary-logo.png')}
          resizeMode="contain"
          style={styles.logo}
        />
      </View>
      <View style={styles.buttonGroup}>
        <Button
          containerStyle={buttonStyles.container}
          buttonStyle={{
            ...buttonStyles.button,
            backgroundColor: EStyleSheet.value('$secondaryColor')
          }}
          title="Security Alert"
          titleStyle={buttonStyles.title}
          onPress={this.onSecurityAlert}
        />
        <HorizSpacer width={20} />
        <Button
          containerStyle={buttonStyles.container}
          buttonStyle={{
            ...buttonStyles.button,
            backgroundColor: EStyleSheet.value('$primaryColor')
          }}
          title="Health Alert"
          titleStyle={buttonStyles.title}
          onPress={this.onHealthAlert}
        />
      </View>
    </View>
  )
}

const styles = EStyleSheet.create({
  logo: {
    width: '200rem',
    height: '200rem'
  },
  buttonGroup: {
    paddingTop: '25rem',
    paddingBottom: '50rem',
    flexDirection: 'row'
  }
});

const buttonStyles = EStyleSheet.create({
  container: {
    marginTop: '16rem',
    borderRadius: '20rem',
    justifyContent: 'flex-start'
  },
  button: {
    paddingHorizontal: '15rem',
    paddingTop: '11rem',
    paddingBottom: '13rem',
    maxWidth: '291rem'
  },
  title: {
    color: 'white',
    ...displayFontStyles.regular,
    fontSize: '16rem',
    lineHeight: '20rem'
  }
});

export default Home;