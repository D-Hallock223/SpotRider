import React from 'react';
import { StyleSheet, Text, View, TextInput, Image, Switch, Modal, Picker,TouchableOpacity, Button, TouchableHighlight } from 'react-native';
import { ButtonGroup, Overlay } from 'react-native-elements';
import { MapView, Location, Permissions, Constants } from 'expo';
import {StackNavigator} from 'react-navigation';
import Profile from './Profile'
import Spot from './Spot'
// import mapStyle from './MapStyle'

class Map extends React.Component {
    
  constructor(props){
    super(props)
    this.state = {
      latitude: null,
      longitude : null,
      errorMessage: null,
      selectedIndex: 0,
      isVisible: false,
      switchValue: false,
      type: 'Skatepark',
      activite: 'Activités',
      renderbottomButton: false,
      showBottomButtonIndex:0,
      markers: [{latlng:{latitude: 48.866667, longitude: 2.333333},title:'title', description: 'description'},
      {latlng:{latitude: 50.996667, longitude: 2.783333},title:'title', description: 'description'}]
        
      }
    this.updateIndex = this.updateIndex.bind(this)
  }


  updateIndex (selectedIndex) {
    this.setState({selectedIndex})
    if(selectedIndex === 2){
      this.setState({
      isVisible: true
    })
    if(this.state.isVisible === true){
      this.setState({
        isVisible: false
      })
    }
    } else {
      this.setState({
        isVisible: false
      })
    }
    
  }

  componentWillMount() {
      this._getLocationAsync();
  }

  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }

    let location = await Location.getCurrentPositionAsync({});
    this.setState({
       latitude: location.coords.latitude,
       longitude: location.coords.longitude,
      });
      this.forceUpdate()
  };



  componentSearch = () => <Image style={{width: 16, height:18.5}} source={require('./img/search.png')} />

  showButton = () => {
    if(this.state.showBottomButtonIndex === 1){
      this.setState({showBottomButton: false,showBottomButtonIndex: 0})
    } else {
      this.setState({showBottomButton: true, showBottomButtonIndex: 1})
    }
  }

  render() {
    // Modal lors du click sur un boutton
    const showModal = <View style={{
      paddingLeft: 20,
      paddingRight: 20,
      flex: 1,
      flexDirection: 'column',
      marginRight: 30,
      marginLeft: 30,
      marginTop: 100,
      width: 300,
      position: 'absolute',
      zIndex:2147483647,
      backgroundColor:'#f0f0f0',
      height: 300}}>

      <Text >Type</Text>
      <Picker
        selectedValue={this.state.type}
        onValueChange={(itemValue, itemIndex) => this.setState({type: itemValue})}>
        <Picker.Item label="Skatepark" value="Skatepark" />
        <Picker.Item label="Outdoor" value="Outdoor" />
        </Picker>

      {/*  <Picker
        selectedValue={this.state.activite}
        onValueChange={(itemValue, itemIndex) => this.setState({activite: itemValue})}>
        <Picker.Item label="Skateboard" value="Skateboard" />
        <Picker.Item label="Ride" value="Ride" />
        </Picker>*/}

      <Text >Couvert</Text>
      <Switch value={this.state.switchValue}
      onValueChange={(value) => this.setState({switchValue: value}) }
       style={{ marginTop: 10, height: 5, width: 20 }}
        onTintColor='#f44336'/></View>

    const showBottomButton = 
        <View style={{
      borderColor:'rgba(0,0,0,0.2)',
      alignItems:'center',
      justifyContent:'center',
      width: 240,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.4,
      shadowRadius: 2,
       height: 130,
       bottom: 0,
       borderTopLeftRadius: 120,
       borderTopRightRadius: 120,
       position:'absolute', // Remove the absolute position
      backgroundColor:'#f6f6f6',      
    }}>
    <TouchableHighlight onPress={() => this.props.navigation.navigate('Profile')}>
    <Image style={{width: 26, height: 26,position:'absolute',zIndex:2147483647,right: 17, bottom: 14}}  source={require('./img/profile.png')} />
</TouchableHighlight>
    
    </View>
    

  //<Image style={{width: 240, height: 130,bottom: 0,position:'absolute'}}  source={require('./img/bottomButtonCircle.png')} />
       
      
      
  
    const buttons = ['Spots', 'Riders',{element: this.componentSearch}]
    const {selectedIndex} = this.state
    console.log(this.state.isVisible)
    return (
      <View style={styles.container}>
     
      <MapView
        style={ styles.map }
        onPress={() => this.setState({isVisible: false})}
        initialRegion={{
          latitude: 48.866667, //this.state.latitude,
          longitude: 2.333333, //this.state.longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
         // customMapStyle={mapStyle}
        }}
      >
      {this.state.markers.map(marker => (
    <MapView.Marker
        onPress= {() => this.props.navigation.navigate('Spot')}
      coordinate={marker.latlng}
      title={marker.title}
      description={marker.description}
    />
  ))}
  </MapView>
      <ButtonGroup
          onPress={this.updateIndex}
          selectedIndex= {selectedIndex}
          buttons={buttons}
          containerStyle={styles.buttons}
          selectedTextStyle={{color: '#f44336'}}
          textStyle={{fontSize: 13}}
      />
      
    {/*   <Button
       icon={require('./img/search.png')} />
      />
     <Modal 
      transparent={false}
      visible={this.state.isVisible}
     // style={styles.modal}
    //  animationType={'slide'}
      >*/}
     
     
     

      
  {/*  </Modal> */} 
  {this.state.isVisible ? showModal : null}
  <View style={{flex:1,bottom: 0,zIndex:2147483647,position: 'absolute',alignItems: 'center',justifyContent:'center' }}>
  {/*<Image style={{width: 250, height: 130,bottom: 0}}  source={require('./img/bottomButtonCircle.png')} />*/}
  {this.state.showBottomButton ? showBottomButton : null}
  <TouchableOpacity activeOpacity={0.6} onPress={() => this.showButton()} >
      <Image
          source={require('./img/bottomButton.png')}
          style={{height:69, width: 115, bottom:0}}
        />
        </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
    flex: 1
  },
  container:{
    flex: 1,
    alignItems: 'center'
  },
  buttons:{
    height: 40,
    borderWidth: 0.5,
    zIndex:2147483647,
    marginRight: 30,
    marginLeft: 30,
    marginTop: 60,
    backgroundColor:'#fafafa',
    position: 'absolute',
    width: 300
  },
  modal:{
    marginRight: 30,
        marginLeft: 30,
        marginTop: 100,
        width: 300,
        height: 10
  }
});

export default StackNavigator(
  {
  HomeScreen: {
    screen: Map},
    Profile: {
      screen: Profile,
      mode: 'modal'
  },
  Spot: {
    screen: Spot,
    mode: 'modal'
  }
},{ headerMode: 'none',
    mode: 'modal',
     }
);