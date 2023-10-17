import { Image, Modal, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Colors from '../../src/Colors';

const EditBlog = (props) => {
    const [showDialog, setshowDialog] = useState(false);
    const [title, settitle] = useState(props.item.title);
    const [desc, setdesc] = useState(props.item.desc);
    const [image, setimage] = useState(props.item.image);
    return (
        <View>
            <Modal visible={showDialog}
                transparent={true}
                animationType="fade"
                onRequestClose={() => { setshowDialog(false); }}>
                <View style={{ backgroundColor: Colors.wwhite, width: "80%", alignSelf: 'center', height: "80%" }}>


                    <TouchableOpacity
                        style={styles.andialog}
                        onPress={() => { setshowDialog(false) }}>
                        <Text style={{ color: 'red', fontWeight: "bold", textAlign: 'right', marginRight: 20, fontSize: 20, marginTop: 10 }}>{'X'}</Text>
                    </TouchableOpacity>
                    <Text style={{ textAlign: 'center', marginTop: 15, fontSize: 24, fontWeight: 'bold', color: Colors.black }}>Edit blog</Text>
                    <View style={{ margin: 10 }}>
                        <Text style={styles.title}>Tiêu đề</Text>
                        <TextInput placeholder="Tiêu đề" style={styles.input} onChangeText={(txt) => { settitle(txt) }} value={title} />
                        <Text style={styles.title}>Nội dung</Text>

                        <TextInput placeholder="Nội dung bài viết"
                            style={styles.input}
                            value={desc}
                        />
                        <Text style={styles.title}>Ảnh</Text>
                        <Image source={{ uri: image }} style={{ width: 200, height: 200, marginTop: 5, marginLeft: 10, borderWidth: 1, borderColor: Colors.grey,alignSelf:'center' }} />

                    </View>


                    
                        <TouchableOpacity
                            style={{backgroundColor:Colors.black,width:100,height:40,justifyContent:'center',alignItems:'center',borderRadius:10,alignSelf:'flex-end',margin:10}}
                        >
                            <Text style={{ color: Colors.wwhite, fontWeight: "bold", fontSize: 18 }}>{'Save'}</Text>
                        </TouchableOpacity>

                </View>
            </Modal>
            <TouchableOpacity onPress={() => setshowDialog(true)}>
                <Image style={{ height: 30, width: 30, margin: 10 }} source={{ uri: "https://cdn-icons-png.flaticon.com/512/3597/3597075.png" }} />
            </TouchableOpacity>
        </View>
    )
}

export default EditBlog

const styles = StyleSheet.create({
    title: {
        fontSize: 17,
        fontWeight: 'bold'
    },
    input: {
         fontSize: 16, height: 50,  margin: 10
    }
})