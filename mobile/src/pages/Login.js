import React, {useState, useEffect} from 'react';
import {View, Text , Image , StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, AsyncStorage} from 'react-native'
import logo from '../../assets/logo.png';
import api from '../services/api';

export default function Login({navigation}){
    const [email,setEmail] = useState('');
    const [beds,setBeds] = useState('');

    useEffect(() => {
        AsyncStorage.getItem('user').then(user => {
            if(user){

            }
        })
    },[])

    async function handleSubmit(){
       const response = await api.post('/sessions',{
           email
       })
       const {_id} = response.data;
      await AsyncStorage.setItem('user',_id);
      await AsyncStorage.setItem('beds',beds);
      navigation.navigate('List')

    }
    return (
        <KeyboardAvoidingView  enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
            <Image source = {logo}/>

            <View style={styles.form}>
            <Text style = {styles.label}>
            Your E-MAIL
            </Text>
            <TextInput
            style={styles.input}
            placeholder = 'Your e-mail'
            placeholderTextColor = "#999"
            keyboardType= "email-address"
            autoCapitalize= "none"
            autoCorrect={false}
            value={email}
            onChangeText = {text => setEmail(text)}
            />
            <Text style = {styles.label}>
            Beds *
            </Text>
            <TextInput
            style={styles.input}
            placeholder = 'Bed type'
            placeholderTextColor = "#999"
            autoCapitalize= "words"
            autoCorrect={false}
            value={beds}
            onChangeText={text => setBeds(text)}
            />
            <TouchableOpacity  onPress={handleSubmit} style={styles.button}>
                <Text style={styles.buttonText}>Find Hostels</Text>
            </TouchableOpacity>
           
            </View>
            </KeyboardAvoidingView>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex:1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30
    },
    label: {
        fontWeight: 'bold',
        color : '#444',
        marginBottom: 8
    },
    input: {
        borderWidth: 1,
        borderColor: '#ddd',
        paddingHorizontal: 20,
        fontSize:16,
        color: '#444',
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    button: {
        height: 42,
        backgroundColor: '#7a7a7a',
        justifyContent: 'center',
        alignItems: 'center',
        color: '#ddd',
        fontSize: 20
    },
    buttonText:{
        color:'#FFF',
        fontWeight: 'bold',
        fontSize:16
    }
})