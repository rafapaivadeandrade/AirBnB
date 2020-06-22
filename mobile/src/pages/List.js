import React, {useState, useEffect} from 'react';
import {View, Text , Image ,ScrollView, StyleSheet, TextInput, TouchableOpacity, AsyncStorage, Alert} from 'react-native'
import socketio from 'socket.io-client'
import logo from '../../assets/logo.png';
import Spotlist from '../components/Spotlist';

export default function List(){
    const[beds,setBeds] = useState([]);

    useEffect(()=> {
        AsyncStorage.getItem('user').then(user_id=> {
            const socket = socketio('http://192.168.1.68:3333',{
                query: {user_id}
            })

            socket.on('booking_response', booking => {
                Alert.alert(`Your reservation in ${booking.spot.hostel} on ${booking.date} was ${booking.approved ? 'Approved' : 'Rejected'}`)
            })
        })
    },[])

    useEffect(() => {
        AsyncStorage.getItem('beds').then(Storagedbeds => {
            const bedsArray = Storagedbeds.split(',').map(bed => bed.trim());

            setBeds(bedsArray);
        })
    })

    return (
        <View style = {styles.container}>
            <Image source={logo}  style = {styles.logo}  />
        <ScrollView>
        {beds.map(bed=> <Spotlist key={bed} bed={bed}/>)  }
        </ScrollView>
        </View>
    )
}

const styles =  StyleSheet.create({
    container: {
        flex:1,
    },
    logo : {
        alignSelf: 'center',
        marginTop: 60,
        resizeMode: "contain",
        height: 32
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
        backgroundColor: '#999',
        justifyContent: 'center',
        color: '#ddd',
        fontSize: 20
    },
    buttonText:{
        color:'#FFF',
        fontWeight: 'bold',
        fontSize:16
    }
})