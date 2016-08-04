/**
 * Autor: Jean Carvajal
 * App que se conecta con intranet para obtener el perfil y el informe curricular del alumno.
 * Creado para el ramo "Taller de programación de dispositivos móviles"
 *  UBB 2016-1
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
} from 'react-native';

//importamos las clases que ocupa la app
var SplashScreen=require('./src/SplashScreen');
var LoginScreen=require('./src/LoginScreen');
var MenuScreen=require('./src/MenuScreen');
var PerfilScreen=require('./src/PerfilScreen');
var InformeScreen=require('./src/InformeScreen');

//definimos estas variables globales para ocuparlas en cualquier clase
//se inician en LoginScreen
global.alumno; 
global.infoCurricular;
global.infoCarreras;

var proyecto1=React.createClass ({
  renderScene: function(route, navigator){
    if(route.name=='SplashScreen'){
      return <SplashScreen navigator={navigator}/>
    }
    if(route.name=='LoginScreen'){
      return <LoginScreen navigator={navigator}/>
    }
    if(route.name=='MenuScreen'){
      return <MenuScreen navigator={navigator}/>
    }
    if(route.name=='PerfilScreen'){
      return <PerfilScreen navigator={navigator}/>
    }
    if(route.name=='InformeScreen'){
      return <InformeScreen navigator={navigator}/>
    }
  },

  render: function() {
    return( 
       	<Navigator
				ref="navigatorComp"
				initialRoute={{name: 'SplashScreen'}}
				renderScene={this.renderScene} 
				configureScene={(route, routeStack) =>Navigator.SceneConfigs.FloatFromBottomAndroid  } 
			/>
    );
  },
});

AppRegistry.registerComponent('proyecto1', () => proyecto1);
