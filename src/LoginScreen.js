import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight, 
  TextInput,
  ToastAndroid
} from 'react-native';

var lib = require('./../intranet.class'); //Incluyo el archivo js
 var InetUBB = new lib.InetUBB(); //La instancia de la clase debe ser global para que pueda ser utilizada por todas las pantallas

var LoginScreen=React.createClass({
  //valores iniciales de rut y password
   getInitialState: function() {
        return {
            rut: 0,
            password: "",
        };
	},
  
   clickTest: async function(){
        //muestro un mensaje mientras espero que se conecte
         ToastAndroid.show('Conectando...', ToastAndroid.SHORT);

        var resp = await InetUBB.doLogin(parseInt(this.state.rut),this.state.password); // Cuando se llama una funcion de la clase se debe llamar con "await", retorna true si el usuario/password son correcto, false si no lo son
        
        if(resp){
          // Estas son los 3 metodos que tiene la clase
          // Se deben usar solo luego de que doLogin retorne true
          // De lo contrario retonrnaran false
          
           infoCurricular	= await InetUBB.getInformeCurricular(); //Obtiene un objeto con los datos de las asignaturas
           infoCarreras	= await InetUBB.getCarreras(); //Obtiene un objeto con las carreras que ha cursado el alumno
           alumno		= await InetUBB.getDatosAlumno(); //Obtiene un objeto con los datos del alumno
          
          console.log(infoCurricular);
          console.log(infoCarreras);
          console.log(alumno);
         //luego de hacer el login y obtener los objetos, cambiamos la vista a MenuScreen
          this.props.navigator.push({name: 'MenuScreen',});
        }else{
            //mostramos mensaje si es que no se pudo conectar
          ToastAndroid.show('Error de conexión', ToastAndroid.SHORT);
        }
  },

  render: function(){
    return(
       <View style={styles.loginContainer}>
        <Image style={styles.fotoLogin} source={require('./../img/escudo.png')}/>

        <TextInput
         keyboardType='numeric'
          onChangeText={ (text)=> this.setState({rut: text}) }
          style={styles.input} placeholder="Ingrese su rut (ej:11222333)"
          placeholderTextColor='#ff892a90'>
        </TextInput>

        <TextInput
          onChangeText={ (text)=> this.setState({password: text}) }
          style={styles.input}
          placeholder="Ingrese su clave"
          placeholderTextColor='#ff892a90'
          secureTextEntry={true}>
        </TextInput>

        <TouchableHighlight onPress={this.clickTest} style={styles.button}>
          <Text style={styles.buttonText2}>
            Ingresar
          </Text>
        </TouchableHighlight>

      </View>
    );
  },

});


const styles = StyleSheet.create({
  loginContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 50,
    backgroundColor: '#222a2d',
  },
    input: {
    height: 50,
    width:300,
    marginTop: 20,
    padding: 4,
    color:'#a8b1bc',
    fontSize: 16,
    backgroundColor:'#141a1b',
  },
   button: {
    height: 50,
    backgroundColor: '#181e21',
    alignSelf: 'stretch',
    marginTop: 80,
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
  fotoLogin:{
    width:230,
    height:230    
  }
});

module.exports=LoginScreen;