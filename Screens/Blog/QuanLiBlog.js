import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import Colors from '../../src/Colors'
import EditBlog from './EditBlog'
import AddBlog from './AddBlog'
const QuanLiBlog = (props) => {
  const blog = [
    {
      id: "1",
      title: "Iphone 15 ra mắt với nhiều sự thay đổi mới",
      desc: "Ngày 13/9 seri iphone 15 chính thức được ra mắt với nhiều sự .....",
      image: "https://genk.mediacdn.vn/139269124445442048/2023/9/12/apple-iphone-15-lineup-color-lineup-230912bigjpglarge-1694545315217-1694545315299487491467-1694546410756-16945464109211179183412.jpg"
    },
    {
      id: "2",
      title: "Iphone 15 ra mắt với nhiều sự thay đổi mới",
      desc: "Ngày 13/9 seri iphone 15 chính thức được ra mắt với nhiều sự .....",
      image: "https://genk.mediacdn.vn/139269124445442048/2023/9/12/apple-iphone-15-lineup-color-lineup-230912bigjpglarge-1694545315217-1694545315299487491467-1694546410756-16945464109211179183412.jpg"
    },
    {
      id: "3",
      title: "Iphone 15 ra mắt với nhiều sự thay đổi mới",
      desc: "Ngày 13/9 seri iphone 15 chính thức được ra mắt với nhiều sự .....",
      image: "https://genk.mediacdn.vn/139269124445442048/2023/9/12/apple-iphone-15-lineup-color-lineup-230912bigjpglarge-1694545315217-1694545315299487491467-1694546410756-16945464109211179183412.jpg"
    },
    {
      id: "4",
      title: "Iphone 15 ra mắt với nhiều sự thay đổi mới",
      desc: "Ngày 13/9 seri iphone 15 chính thức được ra mắt với nhiều sự .....",
      image: "https://genk.mediacdn.vn/139269124445442048/2023/9/12/apple-iphone-15-lineup-color-lineup-230912bigjpglarge-1694545315217-1694545315299487491467-1694546410756-16945464109211179183412.jpg"
    },
    {
      id: "5",
      title: "Iphone 15 ra mắt với nhiều sự thay đổi mới",
      desc: "Ngày 13/9 seri iphone 15 chính thức được ra mắt với nhiều sự .....",
      image: "https://genk.mediacdn.vn/139269124445442048/2023/9/12/apple-iphone-15-lineup-color-lineup-230912bigjpglarge-1694545315217-1694545315299487491467-1694546410756-16945464109211179183412.jpg"
    },
  ]
  const item = ({ item }) => {
    return (
      <TouchableOpacity

      >
        
        <View style={{flexDirection:'column',backgroundColor:Colors.grey,marginBottom:2,marginTop:10}}>
        
        <View style={{ flexDirection: 'row', margin: 10 }}>
          <View style={{ width: "30%", backgroundColor: Colors.grey, marginRight: 5 }}>
            <Image style={{ height: 75, width: "100%" }} source={{ uri: item.image }} />

          </View>

          <View style={{ flexDirection: 'column', width: "69%" }}>
            <Text style={{ fontSize: 18, fontWeight: 'bold' }}>{item.title}</Text>
            <Text>{item.desc}</Text>
          </View>
        </View>
        <View style={{flexDirection:'row',alignSelf:'flex-end'}}>
          <EditBlog item={item}/>
          <TouchableOpacity >
                <Image style={{ height: 30, width: 30, alignSelf: 'flex-end', margin: 10 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3687/3687412.png" }} />
            </TouchableOpacity>
        </View>
        </View>
      </TouchableOpacity>

    )
  }
  return (
    <View style={{ flex: 1, backgroundColor: Colors.wwhite }}>
      <AddBlog/>


      <FlatList
        data={blog}
        keyExtractor={(item) => {
          return item.id
        }}
        renderItem={item}
      ></FlatList>
    </View>
  )
}

export default QuanLiBlog

const styles = StyleSheet.create({})