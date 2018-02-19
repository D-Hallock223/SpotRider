import React, {Component}  from 'react';
import { StyleSheet, Text, View, TextInput, Image, Switch, Modal, Picker } from 'react-native';
import { ButtonGroup, Overlay, Button } from 'react-native-elements';
import { MapView, Location, Permissions, Constants } from 'expo';
import Mapv from './Map.js'
import {StackNavigator} from 'react-navigation';
import * as firebase from 'firebase';


class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            email: '',
            password: ''
        }
    }


    loginAction() {
        let that =this/*
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(function(user){
          that.props.navigation.navigate('screenMap')  
        }).catch(error => {
            console.log(error.code)
            this.setState({
                error: error.code
            })
        })*/
        that.props.navigation.navigate('screenMap') 

    }

    render(){

        return (
            <View style={{flex: 1, flexDirection: 'column', backgroundColor:'#fafafa', alignItems:'center'}} >
                 <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1,marginTop: 50,borderRadius:3,
            marginTop:250, marginLeft:20,marginRight:20,width:310}}
                onChangeText={(email) => this.setState({email})}
                value={this.state.email}
                underlineColorAndroid='transparent'
            />

                <TextInput
                style={{height: 40, borderColor: 'gray', borderWidth: 1,marginTop: 10,marginBottom: 10,borderRadius:3,
            marginTop:10, marginLeft:20,marginRight:20,width:310}}
                onChangeText={(password) => this.setState({password})}
                value={this.state.password}
                secureTextEntry={true}
                underlineColorAndroid='transparent'
            />

            <Text style={{marginBottom:10,marginTop:10,color:'#f0f0f0'}}> {this.state.error} </Text>
            
                <Button title="Login"
                style={{width:200}}
                buttonStyle={{borderRadius: 3}}
                    onPress={this.loginAction.bind(this)}
                    />
            </View>
        )
    }
}

export default StackNavigator(
    {
    HomeScreen: {
      screen: Login},
      screenMap: {
        screen: Mapv,
    }
},{ headerMode: 'none' }
  );
