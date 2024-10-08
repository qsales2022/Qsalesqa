import { View, Text, Touchable, TouchableOpacity } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'

const Test = ({navigation,route}:any) => {
  const {id} = route.params
  return (
    <SafeAreaView>
      <Text>{id}</Text>
      <TouchableOpacity onPress={()=>{
         navigation.push("SPLASH")
      }}>
        <Text>click</Text>
      </TouchableOpacity>
    </SafeAreaView>
  )
}

export default Test