import {Platform, StyleSheet} from 'react-native';
import Colors from './Colors';
import {getHeight, getWidth} from './Constants';

const CommonStyles = StyleSheet.create({
  appTitle: {
    fontSize: getWidth(14),
    fontWeight: '700',
    paddingBottom: 8,
    letterSpacing: 0.5,
    color: Colors.black,
    fontFamily: 'Inter',
  },
  titleText: {
    fontSize: getHeight(22),
    fontWeight: '700',
    color: Colors.black,
    fontFamily: 'Inter',
  },
  appNameTitle: {
    fontSize: getHeight(35),
    fontWeight: '700',
    color: Colors.black,
    fontFamily: 'Inter',
  },
  subTitle: {
    fontSize: getWidth(28),
    fontWeight: '500',
    color: Colors.subtitleTxt,
    textAlign: 'center',
    fontFamily: 'Inter',
  },
  mainContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    padding: getWidth(18),
    minHeight: getHeight(1),
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  containerFlex1: {
    flex: 1,
    
  },
  font45bold: {
    fontSize: getHeight(45),
    fontWeight: '700',
    fontFamily: 'Inter',
    color: Colors.black,
  },
  errorText: {
    marginTop: getHeight(190),
    color: Colors.errorColor,
  },
  flexRowContainer: {flexDirection: 'row'},
  warningAlert: {
    backgroundColor: '#FFFFFF',
    color: '#000000',
  },
  warningButton: {
    color: '#000000',
  },
  linkTextContainer: {
    alignItems: 'flex-end',
  },
  formContainer: {
    flex: 1,
    paddingBottom: getHeight(Platform.OS === 'ios' ? 7 : 9),
  },
  shadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  font16: {
    fontSize: getHeight(16),
    fontWeight: '400',
    fontFamily: 'Inter',
    color: Colors.black,
  },
  formTitle: {
    fontSize: getHeight(45),
    fontFamily: 'Inter',
    fontWeight: Platform.OS === 'ios' ? '600' : '700',
    color: Colors.black,
  },
  contentCenter: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});
export default CommonStyles;
