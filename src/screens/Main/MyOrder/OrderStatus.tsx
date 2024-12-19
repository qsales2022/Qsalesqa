// import React from 'react';
// import {View, Text, StyleSheet} from 'react-native';
// import Svg, {Path} from 'react-native-svg';
// import {getWidth} from '../../../Theme/Constants';

// const OrderStatus = () => {
//   const steps = [
//     'Order Placed',
//     'Order Shipped',
//     'Delivered',
//     'Today Delivered',
//   ];
//   const deliveryStatus = 'Order Shipped';

//   const currentStepIndex = steps.indexOf(deliveryStatus);

//   //   1 currentStepIndex

//   const getStepStyle = (stepIndex: any) => {
//     if (stepIndex <= currentStepIndex) {
//       return styles.completedCircle;
//     }

//     if (stepIndex - currentStepIndex === 1) {
//       return styles.currentCircle;
//     }
//     return styles.futureCircle;
//   };

//   const renderConnectorLine = (index: any) => {
//     if (index < currentStepIndex) {
//       return <View style={[styles.connectorLine, styles.completedLine]} />;
//     } else if (index === currentStepIndex) {
//       return (
//         <View style={styles.connectorLine}>
//           <View style={[styles.lineHalf, styles.completedLine]} />
//           <View style={[styles.lineHalf, styles.futureLine]} />
//         </View>
//       );
//     } else {
//       return <View style={[styles.connectorLine, styles.futureLine]} />;
//     }
//   };

//   return (
//     <View style={styles.container}>
//       {steps.map((step, index) => (
//         <React.Fragment key={index}>
//           {/* Step Circle */}
//           <View style={styles.stepContainer}>
//             <View style={[styles.circle, getStepStyle(index)]}>
//               {/* Checkmark for completed steps */}
//               {index <= currentStepIndex && (
//                 <Svg width="12" height="12" viewBox="0 0 24 24">
//                   <Path
//                     fill="#FFF"
//                     d="M9 16.17L4.83 12l-1.42 1.41L9 19l12-12-1.41-1.41z"
//                   />
//                 </Svg>
//               )}
//             </View>
//             <Text style={styles.stepLabel}>{step}</Text>
//           </View>
//           {/* Connector Line */}
//           {index < steps.length - 1 && renderConnectorLine(index)}
//         </React.Fragment>
//       ))}
//     </View>
//   );
// };

// export default OrderStatus;

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: 'column',
//     paddingVertical: 20,
//     marginLeft: getWidth(19),
//   },
//   stepContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   connectorLine: {
//     height: 40,
//     width: 2,
//     marginLeft: 12,
//     overflow: 'hidden',
//   },
//   lineHalf: {
//     height: '50%',
//     width: '100%',
//   },
//   completedLine: {
//     backgroundColor: '#1D9E74',
//   },
//   futureLine: {
//     backgroundColor: '#E0E0E0',
//   },
//   circle: {
//     width: 24,
//     height: 24,
//     borderRadius: 12,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginRight: 10,
//   },
//   completedCircle: {
//     backgroundColor: '#1D9E74',
//   },
//   currentCircle: {
//     borderColor: '#1D9E74',
//     borderWidth: 3,
//     backgroundColor: 'white',
//   },
//   futureCircle: {
//     backgroundColor: '#E0E0E0',
//   },
//   stepLabel: {
//     fontSize: 16,
//     color: '#000',
//   },
// });
import React, {useEffect, useRef} from 'react';
import {View, Text, StyleSheet, Animated} from 'react-native';
import Svg, {Path} from 'react-native-svg';
import {getWidth} from '../../../Theme/Constants';

const OrderStatus = () => {
  const steps = [
    'Order Placed',
    'Order Shipped',
    'Delivered',
    'Today Delivered',
  ];
  const deliveryStatus = 'Delivered';

  const currentStepIndex = steps.indexOf(deliveryStatus);

  const getStepStyle = (stepIndex:any) => {
    if (stepIndex <= currentStepIndex) {
      return styles.completedCircle;
    }

    if (stepIndex - currentStepIndex === 1) {
      return styles.currentCircle;
    }
    return styles.futureCircle;
  };

  const AnimatedHalfPoint = ({isActive}:any) => {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
      if (isActive) {
        Animated.loop(
          Animated.sequence([
            Animated.timing(scaleAnim, {
              toValue: 1.5, // Scale up
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(scaleAnim, {
              toValue: 1, // Scale back to normal
              duration: 500,
              useNativeDriver: true,
            }),
          ])
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

  const renderConnectorLine = (index:any) => {
    return (
      <View style={styles.connectorLine}>
        {/* Completed Half Line */}
        <View
          style={[
            styles.lineHalf,
            index <= currentStepIndex ? styles.completedLine : styles.futureLine,
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
            <Text style={styles.stepLabel}>{step}</Text>
          </View>
          {index < steps.length - 1 && renderConnectorLine(index)}
        </React.Fragment>
      ))}
    </View>
  );
};

export default OrderStatus;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    paddingVertical: 20,
    marginLeft: getWidth(19),
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

