import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight, 
  ScrollView, 
  ListView,
} from 'react-native';

var PerfilScreen=React.createClass({

  volverAtras: function () {
    this.props.navigator.push({name:'MenuScreen'});
  },

  render:function(){
    return(
     <View style={styles.perfilContainer}>

        <Text style={styles.heading}>Perfil Alumno</Text>

        <View style={{backgroundColor:'white',justifyContent:'center', alignSelf:'center', borderWidth:1, borderColor:'#ff892a'}}>
          <Image style={styles.fotoPerfil} source={{uri: alumno.foto}} />
        </View>

        <Image style={{alignSelf:'center',justifyContent:'center',alignItems:'center',height:20,margin:10}} source={require('./../img/barra.png')}>
           <Text style={{fontSize:16, color:'#cdf7f9',}}>{alumno.rut_string}</Text>
        </Image>

          <ScrollView style={styles.datosPerfil}>

             <Text style={styles.datosText}>
                 {"       "}Nombres: 
             </Text>
             <Text style={styles.datosText2}>
                 {alumno.nombres}
             </Text>    

             <Text style={styles.datosText}>
                {"       "}Apellidos: 
             </Text> 
             <Text style={styles.datosText2}>
              {alumno.apellidos}
             </Text> 

             <Text style={styles.datosText}>
              {"       "}Fecha de Nacimiento: 
             </Text> 
             <Text style={styles.datosText2}>
              {alumno.fechaN}
             </Text> 

              <Text style={styles.datosText}>
                 {"       "} Estado Civil: 
              </Text> 
              <Text style={styles.datosText2}>
                 {alumno.estadoCivil}
              </Text> 

              <Text style={styles.datosText}>
                {"       "}Nacionalidad:
              </Text> 
              <Text style={styles.datosText2}> 
                 {alumno.nacionalidad}
              </Text> 

             <Text style={styles.datosText}>
              {"       "} Sexo: 
            </Text>  
            <Text style={styles.datosText2}>
             {alumno.sexo}
            </Text> 

            <Text style={styles.datosText}>
             {"       "} Email:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.correo}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Colegio Procedencia:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.colegio}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Grupo Dependencia:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.grupoDep}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Año Egreso:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.yearEgreso}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Email Opcional:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.mailOpcional}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Dirección Académica:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.direccionA}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Ubicación:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.ubicacionA}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Quintil Inicial:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.quintilI}
            </Text>

            <Text style={styles.datosText}>
              {"       "}Quintil Actual:
            </Text> 
            <Text style={styles.datosText2}> 
             {alumno.quintilA}
            </Text>

             <Text style={styles.datosText}>
              {"       "}Gratuidad:
             </Text> 
             <Text style={styles.datosText2}> 
                 {alumno.gratuidad}
             </Text>

        </ScrollView>
        
        <TouchableHighlight onPress={this.volverAtras} style={styles.volverButton}>
          <Text style={styles.buttonText2}>
           Volver
          </Text> 
        </TouchableHighlight>
      
      </View>
    );
  }
});

const styles = StyleSheet.create({
   buttonText2: {
    fontSize: 22,
    color: '#a8b1bc',
    alignSelf: 'center'
  },
    heading: {
    fontSize: 30,
    alignSelf:'center',
    color:'#659ac1',
    marginBottom:10,
  },
   perfilContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#222a2d',
  },
   fotoPerfil:{
    width:120,
    height:120   ,
    alignSelf: 'center',
    alignItems: 'center',
  },
  datosPerfil:{
    backgroundColor:'#222a2d',
   padding:5,
    borderWidth:5,
  },
  datosText:{
    alignSelf:'stretch',
    alignItems:'center',
    fontSize:12,
    padding:4,
    backgroundColor:'#141a1b',
    color:'#527e7e',
    fontWeight:'bold'
  },
   datosText2:{
    backgroundColor:'#222a2d',
    padding:4,
    fontSize:12,
    color:'#e1e1e1',
    marginLeft:40,
  },
     volverButton: {
   height: 35,
    backgroundColor: '#181e21',
    alignSelf: 'stretch',
    margin:12,
    justifyContent: 'center',
    borderWidth:1,
    borderColor: '#ff892a',
    borderRadius:6
  },
});

module.exports=PerfilScreen;