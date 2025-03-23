import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';

const Test = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <TouchableOpacity onPress={() => console.log('Tapped!')}>
        <View style={{ backgroundColor: '#6200ea', padding: 15, borderRadius: 30, alignItems: 'center' }}>
          <Text style={{ color: 'white' }}>Tap Me</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Test;
