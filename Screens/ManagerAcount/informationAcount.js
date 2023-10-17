import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { useIsFocused, useNavigation } from '@react-navigation/native'
const InformationAcount = () => {
    const nav = useNavigation()
    const status = useIsFocused()
    if (status) {
        nav.setOptions({
            
        })
    }
    return (
        <View>
            <Text>this is a screen information acount</Text>
        </View>
    )
}

export default InformationAcount;

const styles = StyleSheet.create({

})