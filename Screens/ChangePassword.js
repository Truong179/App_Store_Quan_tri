import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { TextInput } from 'react-native'
import { TouchableOpacity } from 'react-native'

const ChangePassword = () => {
  return (
    <View style={styles.container}>
      <TextInput 
      style={{
        borderBottomWidth:1, height:40, marginTop:50
      }}
      placeholder='Mật khẩu mới'/>
      <TextInput 
      style={{
        borderBottomWidth:1, height:40, marginTop:50
      }}
      placeholder='Xác nhận mật khẩu'/>
      <TouchableOpacity style={{
        width:"100%",
        backgroundColor:"black",
        height:40, justifyContent:"center", alignItems:"center",
        borderRadius:10,marginTop:40
      }}>
        <Text style={{
          color:"white",
      }}>Xác nhận</Text>
      </TouchableOpacity>
    </View>
  )
}

export default ChangePassword

const styles = StyleSheet.create({
  container:{
    flex:1, paddingHorizontal:20
  }
})