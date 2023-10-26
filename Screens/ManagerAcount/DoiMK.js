import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../src/Colors'

const DoiMK = () => {
  return (
    <View style={{alignItems:'center'}}>
      <View style={{marginTop:50}}>
      <TextInput style={styles.textInput} placeholder='Mật khẩu mới'></TextInput>
      <TextInput style={styles.textInput} placeholder='Xác nhận mật khẩu'></TextInput>
      </View>
      <TouchableOpacity
                    style={{
                        backgroundColor: Colors.black,
                        borderRadius: 5,
                        height: 38,
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 330,
                        margin: 10,

                    }}
                >
                    <Text style={{ color: Colors.wwhite }}>Xác nhận</Text>
                </TouchableOpacity>

    </View>
  )
}

export default DoiMK

const styles = StyleSheet.create({
    textInput:{
        backgroundColor:Colors.wwhite,
        height:55,
        width:330,
        borderBottomWidth:1,
        borderBottomColor:Colors.black,
        marginBottom:20,
    }
})