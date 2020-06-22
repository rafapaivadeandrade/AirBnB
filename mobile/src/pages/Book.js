import React , {useState} from 'react';
import {Text, SafeAreaView, StyleSheet, TextInput, TouchableOpacity, AsyncStorage,Alert} from 'react-native';
import api from '../services/api';

export default function Book({navigation}){
    const [date,setDate] = useState('');
    const id = navigation.getParam('id');

   async function handleSubmit(){
        const user_id = await AsyncStorage.getItem('user');
        console.log(user_id)

      const response =  await api.post(`/spots/${id}/booking`,{    
            date : date
        },{
            headers:{user_id}
        })
        Alert.alert('Booking request sent.');
        navigation.navigate('List');


    }
    function handleCancel(){
        navigation.navigate('List');
    }

    return (
        <SafeAreaView style = {styles.container}>
        <Text style = {styles.label}>Date of Interest *</Text>
        <TextInput
            style = {styles.input}
            placeholder = "What date do you want to book?"
            placeholderTextColor = "#999"
            autoCapitalize = "words"
            value = {date}
            onChangeText = {text=>setDate(text)}
        />

    <TouchableOpacity onPress={handleSubmit} style = {styles.button}>
        <Text  style={styles.buttonText} >Request Booking</Text>
    </TouchableOpacity>

    <TouchableOpacity onPress={handleCancel} style = {[styles.button,styles.cancel]}>
        <Text  style={styles.buttonText} >Cancel Booking</Text>
    </TouchableOpacity>
        
    </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        margin: 30,
        marginTop: 50
    },
    label : {
        fontWeight : 'bold',
        color: '#444',
        marginBottom : 8 
    },
    form: {
        alignSelf : "stretch",
        paddingHorizontal : 30,
        marginTop : 30
    },
    input : {
        borderWidth : 1,
        borderColor : '#ddd',
        paddingHorizontal : 20,
        fontSize : 16,
        color : '#444',
        height:44,
        marginBottom :28,
        borderRadius :2
    },
    button: {
        height: 42,
        backgroundColor : '#7a7a7a',
        justifyContent: 'center',
        alignItems : 'center',
        borderRadius:2,
    },
    buttonText: {
        color : '#fff',
        fontWeight:'bold',
        fontSize : 16
    },
    cancel:{
        backgroundColor : '#ccc',
        marginTop: 10
    }
})