import React, { PureComponent } from 'react';
import { View } from 'react-native';
import EStyleSheet from 'react-native-extended-stylesheet';

export default class VertSpacer extends PureComponent {
  render = () => (
    <View style={{ height: EStyleSheet.value(`${this.props.height}rem`) }} />
  )
}