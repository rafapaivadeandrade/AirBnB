import React, {useEffect,useState} from 'react';
import {Text , View, StyleSheet,FlatList,Image,TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import api from '../services/api';

function Spotlist({bed, navigation}){
    const [spots,setSpots] = useState('');

    useEffect(() => {
        async function loadSpots(){
            const response = await api.get('/spots',{
                params : {bed}
            })
            setSpots(response.data);
        }
        loadSpots();
    },[]);
    function requestBooking(id){
        navigation.navigate('Book',{id});
    }


    return (    
        <View style = {styles.container}>
            <Text style = {styles.title}>Hostels that use <Text style = {styles.bold}>{bed}</Text> bed(s)</Text>
            <FlatList
                style = {styles.list}
                data = {spots}
                keyExtractor = {spot => spot._id}
                horizontal
                showsHorizontalScrollIndicator = {false}
                renderItem={({item}) => (
                    <View style = {styles.listitem}>
                        <Image  style = {styles.thumbnail} source = {{  uri : item.thumbnail_url}}/>
                        <Text style = {styles.company}>{item.hostel}</Text>
                        <Text style = {styles.price}>{item.price? `$${item.price}/day` : 'Free'}</Text>
                        <TouchableOpacity onPress ={() => {
                            requestBooking(item._id)
                        }} style={styles.button}>
                <Text style = {styles.buttonText}>Request Reservation</Text>
            </TouchableOpacity>
                    </View>
                )}
                
            />
            
        </View>
        )
}

const styles = StyleSheet.create({
    container: {
        marginTop:30
    },
    title: {
        fontSize :20,
        color: '#444',
        paddingHorizontal:20,
        marginBottom : 15
    },
    bold:{
        fontWeight: 'bold'
    },
    list : {
        paddingHorizontal: 20
    },
    listitem:{
        marginRight:15
    },
    thumbnail:{
        width: 200,
        height:120,
        resizeMode: 'cover',
        borderRadius:2
    },
    company:{
        fontSize: 24,
        fontWeight : 'bold',
        color: '#333',
        marginTop : 10
    },
    price :{
        fontSize: 15,
        color: '#999',
        marginTop:5
    },
    button:{
        height:32,
        backgroundColor:'#7a7a7a',
        justifyContent:'center',
        alignItems : 'center',
        borderRadius: 2,
        marginTop:15,
        
    },
    buttonText:{
        color : '#fff',
        fontWeight: 'bold',
        fontSize : 15
    }
})
export default withNavigation(Spotlist);