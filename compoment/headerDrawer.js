import { StyleSheet, Text, View, Image, FlatList } from 'react-native'
import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'


const CustomDrawerHeder = () => {
    return (
        <View style={{
            height: 100, backgroundColor: "gray",
            flexDirection:"row", alignItems:"center", marginBottom:20
        }}>
            <Image style={{
                width: 50, height: 50, borderRadius: 25, marginLeft: 10
            }} source={require("../Image/avatar.png")} />
            <View style={{
                marginLeft:10
            }}>
                <Text style={{fontWeight:"bold",color:"white"}}>Admin</Text>
                <Text style={{color:"white"}}>Admin@gmail.com</Text>
            </View>

        </View>
    )
}
export default CustomDrawerHeder