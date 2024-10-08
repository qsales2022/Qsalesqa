import { View, TextInput, Text } from 'react-native';
import React, { FC, useState } from 'react';
import { getHeight } from '../../Theme/Constants';
import Colors from '../../Theme/Colors';
interface TextInputBoxInterFace {
  placeHolder?: string;
  value?: string;
  onChange?: (text: string) => void;
  isInvalid?: boolean,
  invalidMessage?: string,
  inputMode?: any,
  keyboardType?: any
  editable?: boolean
}
const TextInputBox: FC<TextInputBoxInterFace> = ({
  placeHolder = 'Enter value',
  value,
  onChange,
  isInvalid = false,
  invalidMessage = '',
  inputMode,
  keyboardType,
  editable = true
}) => {

  return (
    <View style={{ marginBottom: 10, }}>
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          width: '98%',
          alignSelf: 'center',
          height: getHeight(15),
          borderWidth: 1,
          borderRadius: 8,
          justifyContent: 'center',
          borderColor: isInvalid ? Colors.primary : '#DCDCDC',
          paddingLeft: '5%',
          paddingRight: '5%',

        }}>
        <TextInput
          editable={editable}
          showSoftInputOnFocus={editable}
          value={value}
          style={{ fontSize: getHeight(60) }}
          onChangeText={(text: string) => onChange && onChange(text)}
          placeholder={placeHolder}
          inputMode={inputMode}
          keyboardType={keyboardType}
        />

      </View>
      {
        isInvalid && (
          <Text style={{
            width: '98%',
            color: Colors.primary,
            paddingLeft: '2%',
            paddingRight: '5%',
          }}>{invalidMessage}</Text>
        )
      }
    </View>
  );
};

export default TextInputBox;
