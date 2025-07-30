declare module 'expo-radio-button' {
  import { ReactNode } from 'react';
  import { TextStyle, ViewStyle } from 'react-native';

  interface RadioButtonGroupProps {
    children: ReactNode;
    selected: any;
    onSelected: (value: any) => void;
    containerStyle?: ViewStyle;
    containerOptionStyle?: ViewStyle;
    radioStyle?: ViewStyle;
    labelStyle?: TextStyle;
    radioBackground?: string;
    size?: number;
  }

  interface RadioButtonItemProps {
    value: any;
    label: string | ReactNode;
    style?: ViewStyle;
    selected?: any;
    size?: number;
    containerOptionStyle?: ViewStyle;
    radioStyle?: ViewStyle;
    radioBackground?: string;
    labelStyle?: TextStyle;
  }

  export function RadioButtonGroup(props: RadioButtonGroupProps): JSX.Element;
  export function RadioButtonItem(props: RadioButtonItemProps): JSX.Element;
  export default RadioButtonGroup;
}