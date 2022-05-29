import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class HorizSpacer extends PureComponent {
  render = () => (
    <View style={{ width: EStyleSheet.value(`${this.props.width}rem`) }} />
  )
}