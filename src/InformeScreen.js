import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight, 
  ScrollView, 
  ListView,
} from 'react-native';

var InformeScreen=React.createClass({
 
   volverAtras:function () {
    this.props.navigator.push({name:'MenuScreen'});
    },

  render:function(){
    return(
   	  
         <View style={styles.perfilContainer}>
                
                <Text style={styles.heading}>
                    Informe Curricular  
                </Text>

               
                {infoCarreras.map((info, index) => (
                 <Text key={index} style={styles.informeText}>{info.nombre+"  ("+info.ingreso+")"}</Text>
                ))}

                

                <ScrollView style={styles.datosInforme}>

                        {infoCurricular.map((info, index) => (
                            <View key={index} style={styles.viewInforme}>
                                <Text key={info.codigo} style={styles.informeText}>{info.asignatura}</Text>
                            {info.notas.map((not)=>
                                <Text key={not.nota} style={styles.informeText2}>{not.nota}{"     "}{"("+not.year+"-"+not.semestre+")"}</Text>)}
                            </View>
                        )) }

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
  perfilContainer: {
    flex: 1,
    padding: 10,
    backgroundColor: '#222a2d',
  },
    heading: {
    fontSize: 30,
    alignSelf:'center',
    color:'#659ac1',
    marginBottom:10,
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

 datosInforme:{
     padding:1,
    borderWidth:3,
    borderColor:'black',
  },
 informeText:{
    alignSelf:'center',
    fontSize:13,
    padding:2,
    color:'#527e7e',
    fontWeight:'bold'
  },
   informeText2:{
    textAlign:'center',
    backgroundColor:'#222a2d',
    paddingBottom:15,
    fontSize:13,
    color:'#e1e1e1',
  },
  viewInforme:{
    backgroundColor:'#141a1b',
    borderWidth:1,
    borderRadius:1,
    borderColor:'#000000'
  },
   buttonText2: {
    fontSize: 22,
    color: '#a8b1bc',
    alignSelf: 'center'
  }

});

module.exports=InformeScreen;