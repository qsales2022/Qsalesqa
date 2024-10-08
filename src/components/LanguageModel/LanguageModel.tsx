/* eslint-disable react-native/no-inline-styles */
import {View, Text, Modal, Image, TouchableOpacity} from 'react-native';
import React, {FC, useState} from 'react';
import Colors from '../../Theme/Colors';
import {getHeight, getWidth} from '../../Theme/Constants';
import Translation from '../../assets/i18n/Translation';
import icons from '../../assets/icons';
import strings from '../../assets/i18n/strings';
import i18next from 'i18next';
import {useDispatch, useSelector} from 'react-redux';
import {updateLanguage} from '../../redux/reducers/AuthReducer';
import {RootState} from '../../redux/store';
interface languageModalInterface {
  visible: boolean;
  onClose: any;
}
const LanguageModel: FC<languageModalInterface> = ({
  visible = false,
  onClose,
}) => {
  const {language} = useSelector((state: RootState) => state.AuthReducer);
  const dispatch = useDispatch();
  const [selectedLanguage, setLanguage] = useState(language);
  const handleLanguageChange = (languageSelected: string) => {
    i18next.changeLanguage(languageSelected);
    dispatch(updateLanguage(languageSelected));
    onClose();
  };
  return (
    <Modal
      animationType="slide"
      onRequestClose={() => onClose()}
      transparent={true}
      visible={visible}>
      <View
        style={{
          flex: 1,
          backgroundColor: Colors.transparentBlack,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            flex: 0.5,
            backgroundColor: Colors.white,
            borderTopLeftRadius: 15,
            borderTopRightRadius: 15,
          }}>
          <View
            style={{
              height: getHeight(10),
              borderTopLeftRadius: 15,
              borderTopRightRadius: 15,
              borderBottomWidth: 0.5,
              borderBottomColor: Colors.primary,
              flexDirection: 'row',
            }}>
            <View
              style={{
                flex: 4,
                justifyContent: 'center',
                padding: getHeight(45),
              }}>
              <Text
                style={{
                  fontSize: getHeight(45),
                  fontWeight: '500',
                  color: Colors.black,
                }}>
                <Translation textKey={'changeLanguage'} />
              </Text>
            </View>
            <TouchableOpacity
              onPress={() => onClose()}
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Image
                style={{
                  height: getHeight(55),
                  width: getHeight(55),
                }}
                source={icons.close}
              />
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: getHeight(15),
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <Image
              style={{
                height: getHeight(45),
                width: getHeight(45),
                marginRight: getHeight(65),
              }}
              source={icons.info}
            />
            <Text
              style={{fontSize: getHeight(65), color: Colors.placeholderColor}}>
              <Translation textKey={'languageInfo'} />
            </Text>
          </View>
          <View
            style={{
              height: getHeight(5),
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              onPress={() => setLanguage('en')}
              style={{
                height: getHeight(18),
                width: getWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  selectedLanguage === 'en' ? '#FDF5FF' : Colors.white,
                marginBottom: getHeight(45),
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: Colors.primary,
              }}>
              <Text style={{color: Colors.black, fontSize: getHeight(55)}}>
                English
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => setLanguage('ar')}
              style={{
                height: getHeight(18),
                width: getWidth(3),
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor:
                  selectedLanguage !== 'en' ? '#FDF5FF' : Colors.white,
                borderRadius: 10,
                borderWidth: 0.5,
                borderColor: Colors.primary,
              }}>
              <Text style={{color: Colors.black, fontSize: getHeight(55)}}>
                عربي
              </Text>
            </TouchableOpacity>
          </View>
          <View
            style={{
              height: getHeight(10),
              flexDirection: 'row',
              justifyContent: 'center',
            }}>
            <TouchableOpacity
              onPress={() => onClose()}
              style={{
                height: getHeight(15),
                width: getWidth(2.5),
                borderRadius: 25,
                borderWidth: 1,
                borderColor: Colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{fontSize: getHeight(45), color: Colors.black}}>
                <Translation textKey={strings.cancel} />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => handleLanguageChange(selectedLanguage)}
              style={{
                height: getHeight(15),
                width: getWidth(2.5),
                backgroundColor: Colors.primary,
                justifyContent: 'center',
                alignItems: 'center',
                marginLeft: getHeight(45),
                borderRadius: 25,
              }}>
              <Text style={{fontSize: getHeight(45), color: Colors.white}}>
                <Translation textKey={strings.apply} />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default LanguageModel;
