import React, {useEffect, useRef, useState} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {getHeight, getWidth} from '../../../Theme/Constants';
import formateDate from '../../../Utils';

const OrderStatus = ({orderData}: any) => {
  const steps = ['Order Placed', 'Preparing', 'Shipped', 'Delivered'];
  const status: string[] = [
    'Expected One Day',
    'Order Prepared',
    'Expected ToDay',
    'completed',
  ];
  const currentStepIndex = status.indexOf(orderData[0]?.deliveryStatus);
  const upDate = orderData[0]?.updatedAt;
  const createdAt = orderData[0]?.createdAt;
  const deliverdDate = orderData[0]?.delverdDate;

  console.log(orderData[0], 'cheking date bro');
  const getStepStyle = (stepIndex: any) => {
    if (stepIndex <= currentStepIndex) {
      return styles.completedCircle;
    }

    if (stepIndex - currentStepIndex === 1) {
      return styles.currentCircle;
    }
    return styles.futureCircle;
  };

  const AnimatedHalfPoint = ({isActive}: any) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      if (isActive) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.5,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1,
              duration: 500,
              useNativeDriver: true,
            }),
          ]),
        ).start();
      }
    }, [isActive]);

    return (
      <Animated.View
        style={[
          styles.halfPoint,
          {transform: [{scale: isActive ? scaleAnim : 1}]},
        ]}
      />
    );
  };

  const renderConnectorLine = (index: any) => {
    return (
      <View style={styles.connectorLine}>
        {/* Completed Half Line */}
        <View
          style={[
            styles.lineHalf,
            index <= currentStepIndex
              ? styles.completedLine
              : styles.futureLine,
          ]}
        />
        {/* Small Circle with Animation at Half Line End */}
        {index === currentStepIndex && <AnimatedHalfPoint isActive={true} />}
        {/* Future Half Line */}
        <View
          style={[
            styles.lineHalf,
            index < currentStepIndex ? styles.completedLine : styles.futureLine,
          ]}
        />
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {steps.map((step, index) => (
        <React.Fragment key={index}>
          <View style={styles.stepContainer}>
            <View style={[styles.circle, getStepStyle(index)]}>
              {index <= currentStepIndex && (
                <Svg width="12" height="12" viewBox="0 0 24 24">
                  <Path
                    fill="#FFF"
                    d="M9 16.17L4.83 12l-1.42 1.41L9 19l12-12-1.41-1.41z"
                  />
                </Svg>
              )}
            </View>
            <View style={{flex: 1, flexDirection: 'column'}}>
              <Text style={styles?.stepLabel}>{step}</Text>
              {index == 0 && index <= currentStepIndex ? (
                <Text
                  style={[styles?.stepLabel, {fontSize: 7, fontWeight: '900'}]}>
                  {`${step.split(' ')[1]} :on ${formateDate(createdAt, index)}`}
                </Text>
              ) : index == 1 && index <= currentStepIndex ? (
                <Text
                  style={[styles?.stepLabel, {fontSize: 7, fontWeight: '900'}]}>
                  {`${step} :on ${formateDate(createdAt, index)}`}
                </Text>
              ) : index == 2 && index <= currentStepIndex ? (
                <Text
                  style={[styles?.stepLabel, {fontSize: 7, fontWeight: '900'}]}>
                  {`${step} :on ${formateDate(upDate, index)}`}
                </Text>
              ) : index == 3 || index <= currentStepIndex ? (
                <>
                  {index <= currentStepIndex ? (
                    <Text
                      style={[
                        styles?.stepLabel,
                        {fontSize: 7, fontWeight: '900'},
                      ]}>
                      {`${
                        step === 'Delivered' ? step : step.split(' ')[1]
                      } :on ${formateDate(deliverdDate, index)}`}
                    </Text>
                  ) : (
                    <Text
                      style={[
                        styles?.stepLabel,
                        {fontSize: 7, fontWeight: '900'},
                      ]}>
                      Estimated for today or tomorrow
                    </Text>
                  )}
                </>
              ) : (
                ''
              )}
            </View>
          </View>
          {index < steps?.length - 1 && renderConnectorLine(index)}
        </React.Fragment>
      ))}
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 3,
    marginLeft: getWidth(19),
    maxHeight: getHeight(29),
  },
  stepContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  connectorLine: {
    height: 70,
    width: 2,
    marginLeft: 12,
    position: 'relative',
  },
  lineHalf: {
    height: '50%',
    width: '100%',
  },
  halfPoint: {
    position: 'absolute',
    top: '50%',
    left: -3,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#1D9E74',
    zIndex: 1,
  },
  completedLine: {
    backgroundColor: '#1D9E74',
  },
  futureLine: {
    backgroundColor: '#E0E0E0',
  },
  circle: {
    width: 24,
    height: 24,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  completedCircle: {
    backgroundColor: '#1D9E74',
  },
  currentCircle: {
    borderColor: '#1D9E74',
    borderWidth: 3,
    backgroundColor: 'white',
  },
  futureCircle: {
    backgroundColor: '#E0E0E0',
  },
  stepLabel: {
    fontSize: 16,
    color: '#000',
  },
});
