import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {
  BottomSheetModal,
  BottomSheetView,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {getHeight, getWidth} from '../../../Theme/Constants';
import {TextInput} from 'react-native-gesture-handler';
import Colors from '../../../Theme/Colors';
import Svg, {Path} from 'react-native-svg';
import OrderStatus from './OrderStatus';
import {useGetOrderStatus} from '../../../Api/hooks/useGetOrderStatus';

const BottomSheetOrderTrack = ({bottomSheetModalRef}: any) => {
  const [snapPoints, setSnapPoints] = useState(['10%', '15%']);
  const [status, setStatus] = useState<boolean>(false);
  const {data, findOrderStatus, loading}: any = useGetOrderStatus();
  const [orderNo, setOrderNo] = useState<any>('');

  const handleFocus = () => {
    setSnapPoints(['10%', '60%']);
    setStatus(true);

    bottomSheetModalRef?.current?.expand();
  };

  // const handleBlur = () => {
  //   setSnapPoints(['10%', '15%']);
  //   // setStatus(false);
  //   // bottomSheetModalRef?.current?.expand();
  // };

  const handleSearch =async  () => {
    
    await findOrderStatus(orderNo);
  };

  return (
    <BottomSheetModalProvider>
      {/* Blur the background conditionally */}

      <BottomSheetModal
        ref={bottomSheetModalRef}
        index={1}
        snapPoints={snapPoints}
        style={{width: getWidth(1)}}>
        <BottomSheetView style={{flex: 1, alignItems: 'center'}}>
          <View style={styles.container}>
            <View
              style={{
                width: getWidth(1),
                display: 'flex',
                justifyContent: 'space-around',
                flexDirection: 'row',
              }}>
              <TextInput
                style={[styles.input, {color: 'black'}]}
                placeholder="Enter Order NO EX-W1111"
                placeholderTextColor="#808080"
                onFocus={handleFocus}
                onChangeText={(text) => setOrderNo(text)} 
                // onBlur={handleBlur}
              />
              <TouchableOpacity
                style={{
                  backgroundColor: Colors.primary,
                  display: 'flex',
                  justifyContent: 'center',
                  width: getWidth(7.5),
                  alignItems: 'center',
                  height: 40,
                  margin: 12,
                  borderRadius: 10,
                }}
                onPress={handleSearch}>
                <Svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  {!loading ? (
                    <Path
                      d="M21 21l-4.35-4.35M10.5 17c3.74 0 6.75-3.01 6.75-6.75S14.24 4.5 10.5 4.5 3.75 7.51 3.75 10.5 6.76 17 10.5 17z"
                      stroke="#FFFFFF"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  ) : (
                    <ActivityIndicator size="small" color="#FFFFFF" />
                  )}
                </Svg>
              </TouchableOpacity>
            </View>
            {status && <OrderStatus />}
          </View>
        </BottomSheetView>
      </BottomSheetModal>
    </BottomSheetModalProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    width: getWidth(1),
    // display: 'flex',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 10,
    borderColor: Colors.primary,
    width: getWidth(1.4),
  },
});

export default BottomSheetOrderTrack;
