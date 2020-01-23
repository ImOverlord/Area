import { Platform, StatusBar } from 'react-native'

const Theme = {};

Theme.font = {
  book: {

  },
  bold: {
    fontFamily: 'bold',
  },
  heavy: {
    fontFamily: 'heavy',
  },
  regular: {
    fontFamily: 'regular',
  }
};

Theme.spacing = {
  xTiny: 4,
  tiny: 8,
  small: 12,
  base: 16,
  large: 32,
  xLarge: 48
};



Theme.colors = {
  accent: '#FF2540',
  light_grey: '#c0c0c0',
  dark_grey: '#4f4f51',
  orange: '#ff9c00',
  green: '#5eff85',
  white: '#fff',
  blue: '#0091FF'
}

export default Theme;
