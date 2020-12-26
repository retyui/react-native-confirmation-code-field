import React, {ComponentProps} from 'react';
import {View, Text} from 'react-native';
import {render, act} from '@testing-library/react-native';
import {CodeField} from '../CodeField';
import {styles} from '../CodeField.styles';

type Props = ComponentProps<typeof CodeField>;

const requiredProps: Props = {
  renderCell: () => null,
};

const renderCodeField = (props?: Partial<Props>) =>
  render(<CodeField {...requiredProps} {...props} />);

it('should use custom root component', () => {
  const id = 'custom-root';
  const RootComponent = (p: ComponentProps<typeof View>) => (
    <View {...p} testID={id} />
  );

  const {getByTestId} = renderCodeField({RootComponent});

  expect(getByTestId(id)).toBeTruthy();
});

it('should spread props to root component', () => {
  const id = 'root';
  const accessible = false;
  const RootProps = {testID: id, accessible};

  const {getByTestId} = renderCodeField({RootProps});

  expect(getByTestId(id).props.accessible).toEqual(accessible);
});

it('should extends root component style with passed rootStyle', () => {
  const id = 'root';
  const rootStyle = {backgroundColor: 'black'};
  const RootProps = {testID: id};

  const {getByTestId} = renderCodeField({RootProps, rootStyle});

  expect(getByTestId(id).props.style).toEqual([styles.root, rootStyle]);
});

it('should render 4 cells', () => {
  const cellCount = 4;
  const cellId = 'cell';
  const renderCell = ({index = 0}) => <Text key={index} testID={cellId} />;
  const {getAllByTestId} = renderCodeField({cellCount, renderCell});

  expect(getAllByTestId(cellId).length).toEqual(cellCount);
});

it('should invoke renderCell for third cell when isFocused and it empty', () => {
  const value = '12';
  const textInputTestId = 'textInput';
  const onFocusEvent = {};
  const renderCell = jest.fn().mockReturnValue(null);

  const {getByTestId} = renderCodeField({
    testID: textInputTestId,
    value,
    renderCell,
  });

  act(() => {
    // ignore initial render
    renderCell.mockReset();
    getByTestId(textInputTestId).props.onFocus(onFocusEvent);
  });

  /*
   * [1] [2] [|] []
   * --------^^ focus should be here
   */
  expect(renderCell.mock.calls).toEqual([
    [{index: 0, isFocused: false, symbol: '1'}],
    [{index: 1, isFocused: false, symbol: '2'}],
    [{index: 2, isFocused: true, symbol: ''}],
    [{index: 3, isFocused: false, symbol: ''}],
  ]);
});
