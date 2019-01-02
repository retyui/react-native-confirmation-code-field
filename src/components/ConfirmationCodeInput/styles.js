// @flow
import { StyleSheet, Platform } from 'react-native';

import { concatStyles } from '../../styles';

import type { Props } from './types';

export const styles = StyleSheet.create({
  maskInput: {
    // Invisible TextInput on top of all container component
    ...StyleSheet.absoluteFillObject,
    opacity: 0.01,
    // By clicking the cursor was always placed at the end of TextInput
    fontSize: 1,
  },
});

const positionMap = {
  center: 'center',
  left: 'flex-start',
  right: 'flex-end',
  'full-width': 'space-between',
};

export const getContainerStyle = ({ inputPosition, containerProps }: Props) =>
  concatStyles(
    {
      flex: 1,
      flexDirection: 'row',
      justifyContent: positionMap[inputPosition],
    },
    containerProps && containerProps.style,
  );

const getBorderWidthStyle = ({ cellBorderWidth, variant }: Props) => {
  switch (variant) {
    case 'clear':
      return { borderWidth: 0 };
    case 'border-b':
      return {
        borderBottomWidth: cellBorderWidth,
      };
    default:
      return { borderWidth: cellBorderWidth };
  }
};

export const getInputSpaceStyle = ({ inputPosition, space }: Props) => {
  switch (inputPosition) {
    case 'left':
      return {
        marginRight: space,
      };
    case 'center':
      return {
        marginRight: space / 2,
        marginLeft: space / 2,
      };
    case 'right':
      return {
        marginLeft: space,
      };
    default:
      return {
        marginRight: 0,
        marginLeft: 0,
      };
  }
};

export const findCellHeight = (size: number, customStyle: any) => {
  if (Array.isArray(customStyle)) {
    const revertedStyles = customStyle.slice().reverse();

    for (const style of revertedStyles) {
      const result = findCellHeight(size, style);

      if (result !== size) {
        return result;
      }
    }
  }

  if (customStyle && typeof customStyle === 'object' && customStyle.height) {
    return customStyle.height;
  }

  return size;
};

export const getCellStyle = (
  props: Props,
  { isActive, customStyle }: Object,
) => {
  const { size, inactiveColor, activeColor, variant } = props;

  return {
    color: activeColor,
    fontSize: Math.max(14, 0.5 * size),
    textAlign: 'center',
    ...Platform.select({
      android: {
        textAlignVertical: 'center',
      },
      ios: {
        lineHeight: findCellHeight(size, customStyle),
      },
    }),
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',

    borderColor: isActive ? activeColor : inactiveColor,
    borderRadius: variant === 'border-circle' ? size / 2 : 0,

    width: size,
    height: size,

    ...getBorderWidthStyle(props),
    ...getInputSpaceStyle(props),
  };
};
