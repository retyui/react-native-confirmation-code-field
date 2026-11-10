import {ComponentProps, createRef, forwardRef} from 'react';
import {Text, TextInput, TextInputProps, View} from 'react-native';
import {act, render, screen} from '@testing-library/react-native';

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

  renderCodeField({RootComponent});

  expect(screen.getByTestId(id)).toBeTruthy();
});

it('should spread props to root component', () => {
  const id = 'root';
  const accessible = false;
  const RootProps = {testID: id, accessible};

  renderCodeField({RootProps});

  expect(screen.getByTestId(id).props.accessible).toEqual(accessible);
});

it('should extends root component style with passed rootStyle', () => {
  const id = 'root';
  const rootStyle = {backgroundColor: 'black'};
  const RootProps = {testID: id};

  renderCodeField({RootProps, rootStyle});

  expect(screen.getByTestId(id).props.style).toEqual([styles.root, rootStyle]);
});

it('should render 4 cells', () => {
  const cellCount = 4;
  const cellId = 'cell';
  const renderCell = ({index = 0}) => <Text key={index} testID={cellId} />;
  renderCodeField({cellCount, renderCell});

  expect(screen.getAllByTestId(cellId)).toHaveLength(cellCount);
});

const focusInput = (testID: string) =>
  act(() => {
    screen.getByTestId(testID).props.onFocus({});
  });

it('should invoke renderCell for third cell when isFocused and it empty', () => {
  const value = '12';
  const textInputTestId = 'textInput';
  const renderCell = jest.fn().mockReturnValue(null);

  renderCodeField({
    testID: textInputTestId,
    value,
    renderCell,
  });

  // ignore initial render
  renderCell.mockReset();
  focusInput(textInputTestId);

  /*
   * [1] [2] [|] []
   * --------^^ focus should be here
   */
  const common = {isFieldFocused: true};
  expect(renderCell.mock.calls).toEqual([
    [
      {
        ...common,
        index: 0,
        symbol: '1',
        isFocused: false,
        isFilled: true,
        isPrevFilled: true,
        isLast: false,
      },
    ],
    [
      {
        ...common,
        index: 1,
        symbol: '2',
        isFocused: false,
        isFilled: true,
        isPrevFilled: false,
        isLast: false,
      },
    ],
    [
      {
        ...common,
        index: 2,
        symbol: '',
        isFocused: true,
        isFilled: false,
        isPrevFilled: false,
        isLast: false,
      },
    ],
    [
      {
        ...common,
        index: 3,
        symbol: '',
        isFocused: false,
        isFilled: false,
        isPrevFilled: false,
        isLast: true,
      },
    ],
  ]);
});

it('should report isFieldFocused but no focused cell when the code is complete', () => {
  const textInputTestId = 'textInput';
  const renderCell = jest.fn().mockReturnValue(null);

  renderCodeField({testID: textInputTestId, value: '1234', renderCell});
  renderCell.mockReset();
  focusInput(textInputTestId);

  const options = renderCell.mock.calls.map(([o]) => o);
  expect(options.every((o) => o.isFieldFocused && !o.isFocused)).toBe(true);
});

describe('onChangeText', () => {
  const testID = 'textInput';
  const changeText = (text: string) =>
    act(() => {
      screen.getByTestId(testID).props.onChangeText(text);
    });

  it('should pass the text as is', () => {
    const onChangeText = jest.fn();
    renderCodeField({testID, onChangeText});

    changeText('12-3');

    expect(onChangeText).toHaveBeenCalledWith('12-3');
  });

  it('should limit the input to cellCount', () => {
    renderCodeField({testID, cellCount: 6});

    expect(screen.getByTestId(testID).props.maxLength).toBe(6);
  });
});

it('should forward ref to the input', () => {
  const ref = createRef<TextInput>();
  renderCodeField({ref});

  expect(ref.current).not.toBeNull();
});

{
  console.log(
    <CodeField
      renderCell={() => null}
      ref={(ref: TextInput | null) => {
        ref?.focus();
        ref?.blur();
      }}
    />,
  );

  console.log(
    <CodeField
      onChangeText={(text: string) => {
        console.log(text);
      }}
      renderCell={() => null}
      ref={(ref: TextInput | null) => {
        ref?.focus();
        ref?.blur();
      }}
    />,
  );

  console.log(
    <CodeField
      // @ts-expect-error - number is not function
      onChangeText={123}
      renderCell={() => null}
      ref={(ref: TextInput | null) => {
        ref?.focus();
        ref?.blur();
      }}
    />,
  );
}

{
  interface MyTextInputProps extends TextInputProps {
    myRequiredProps: string;
  }

  // eslint-disable-next-line react/display-name
  const MyTextInput = forwardRef<TextInput, MyTextInputProps>((props, ref) => (
    <View testID={props.myRequiredProps}>
      <TextInput ref={ref} />
    </View>
  ));

  console.log(
    <CodeField
      renderCell={() => null}
      myRequiredProps="my-required-props"
      InputComponent={MyTextInput}
    />,
  );

  console.log(
    // @ts-expect-error - `myRequiredProps` is required prop
    <CodeField<typeof MyTextInput>
      renderCell={() => null}
      InputComponent={MyTextInput}
    />,
  );

  console.log(
    // @ts-expect-error - `myRequiredProps` is required prop
    <CodeField renderCell={() => null} InputComponent={MyTextInput} />,
  );

  console.log(
    <CodeField
      renderCell={() => null}
      // @ts-expect-error - number is not string
      myRequiredProps={1}
      InputComponent={MyTextInput}
    />,
  );

  interface Focusable {
    focusMe(): void;
  }
  // eslint-disable-next-line react/display-name
  const MyFocusableInput = forwardRef<Focusable, TextInputProps>(() => null);

  console.log(
    <CodeField
      renderCell={() => null}
      InputComponent={MyFocusableInput}
      ref={(ref: Focusable | null) => ref?.focusMe()}
    />,
  );
}
