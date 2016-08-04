import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight, 
  BackAndroid
} from 'react-native';

var MenuScreen=React.createClass({

//funciones segun los botones
  verPerfil:function () {
    this.props.navigator.push({name:'PerfilScreen'});
  },
   verInforme:function () {
    this.props.navigator.push({name:'InformeScreen'});
  },
  salir:function(){
      BackAndroid.exitApp();
  },

  render: function () {
     return(
       <View style={styles.menuContainer}>

        <Text style={styles.headingMenu}>Menú Principal</Text>

        <TouchableHighlight onPress={this.verPerfil} style={styles.menuButton}>
          <Text style={styles.buttonText2}>
            Perfil Alumno
          </Text>
        </TouchableHighlight>

        <TouchableHighlight onPress={this.verInforme} style={styles.menuButton}>
          <Text style={styles.buttonText2}>
            Informe Curricular
          </Text>
        </TouchableHighlight>

         <TouchableHighlight onPress={this.salir} style={styles.salirButton}>
          <Text style={styles.buttonText2}>
            Salir
          </Text>
        </TouchableHighlight>

      </View>
    );
  }
});


const styles = StyleSheet.create({
 
   menuContainer: {
    flex: 1,
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#222a2d',
  },
    menuButton: {
    height: 70,
    backgroundColor: '#181e21',
    alignSelf: 'stretch',
    marginTop: 30,
    justifyContent: 'center',
    borderWidth:1,
    borderColor: '#4d96c6',
    borderRadius:1
  },
    salirButton: {
   height: 50,
    backgroundColor: '#181e21',
    alignSelf: 'stretch',
    marginTop: 110,
    justifyContent: 'center',
    borderWidth:1,
    borderColor: '#ff892a',
    borderRadius:6
  },

   buttonText2: {
    fontSize: 22,
    color: '#a8b1bc',
    alignSelf: 'center'
  },
  headingMenu: {
    fontSize: 30,
    alignSelf:'center',
    color:'#659ac1',
    marginBottom:80,
  },
});

module.exports=MenuScreen;