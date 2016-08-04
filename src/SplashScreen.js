import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Image,
} from 'react-native';

var SplashScreen = React.createClass({
	//Llama a la funcion cambiaPagina luego de 2000 milisegundos
	componentWillMount: function(){
		setTimeout(this.cambiaPagina, 2000); //
	},
	
    //cambiamos la vista al login
	cambiaPagina: function(){
		this.props.navigator.push({name: 'LoginScreen',});
	},
	
	render: function(){
		return(
		  <View style={styles.splashContainer}>
			<Image style={styles.fotoSplash} source={require('./../img/escudo.png')}/>
		  </View>
		);
	}
});

const styles = StyleSheet.create({
   splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#222a2d',
  },
  fotoSplash:{
      width:400,
      height:400,
  }
});

module.exports=SplashScreen;