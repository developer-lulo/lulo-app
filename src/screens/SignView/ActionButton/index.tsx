import React, {useCallback} from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import {BACK_ICON, NEXT_ICON} from '../../../constants';

interface ActionButtonProps {
  onPress?: Function;
  type: 'next' | 'back';
  disabled?: boolean;
}

const ActionButton = (props: ActionButtonProps) => {
  const _onPress = () => {
    if (props.onPress) {
      props.onPress(props);
    }
  };

  const getImage = useCallback(() => {
    let image: ImageSourcePropType | undefined;
    switch (props.type) {
      case 'next':
        image = NEXT_ICON;
        break;
      case 'back':
        image = BACK_ICON;
        break;
    }

    return image;
  }, [props.type]);

  const getStyle = useCallback(() => {
    let style: StyleProp<ImageStyle> = {};
    switch (props.type) {
      case 'next':
        style = {
          tintColor: '#05F500',
        };
        break;
      case 'back':
        style = {
          tintColor: 'red',
        };
        break;
    }

    return style;
  }, [props.type]);

  return (
    <TouchableOpacity
      onPress={_onPress}
      style={[styles.container, props.disabled ? {opacity: 0.3} : null]}
      disabled={props.disabled}>
      <Image source={getImage()} style={getStyle()} />
    </TouchableOpacity>
  );
};

export default ActionButton;
