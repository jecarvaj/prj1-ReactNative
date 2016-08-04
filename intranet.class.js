/**
 * Clase en JavaScript para obtener datos desde la intranet de la Universidad del Bio-Bio
 * solo ocupa peticiones web a https://intranet.ubiobio.cl para obtener la info
 *
 * Autor	: Carlos Felipe Araneda
 * Correo	: caarane@egresados.ubiobio.cl
 *
 */



exports.InetUBB = function() {
	var token = '';
		console.log("ingreso a intranet.class");
	var __construct = function() {
		console.log("INET");
	}()
	

	/**
	* Funcion para pedir paginas 
	*	->url		: string con la direccion a pedir
	*	->params	: parametros con los que se realizar� la peticion, sobreescriben los parametros por defecto
	*
	*	<- objeto con la respuesta a la peticion en caso de que se realizo de forma correcta
	*	<- objeto en blanco en caso de que no se pudo realizar la respuesta
	**/
	this.getPagina = async function(url,params) {
		console.log("estoy en get pagina");
		var fetchParamsDefault = {
			method: 'POST',
			headers: {
				"Referer"			: "https://intranet.ubiobio.cl/"+this.token+"/intranet/inicio.php",
				"User-Agent"		: "Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.103 Safari/537.36",
				"Accept"			: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
				"Accept-Encoding"	: "deflate, sdch",
				"Accept-Language"	: "es-ES,es;q=0.8,en;q=0.6,gl;q=0.4",
			},
			credentials: 'include',
		};
		
		var fetchParams = this.MergeRecursive(fetchParamsDefault,params);

		try {
			let response = await fetch(url,fetchParams);
			console.log(response);
			return response;
		} catch(error) {
			return {};
		}
	}
	

	/**
	* Funcion que genera el token de la $_SESSION de intranet
	* <- true si se pudo generar el token de forma correcta
	* <- false si no se pudo generar el token
	**/
	this.genToken = async function() {
		var url = 'https://intranet.ubiobio.cl/intranet/';
		var params = {method:'GET'};
		
		//Pide la pagina
		let response = await this.getPagina(url, params);
		
		// obtiene el token de la pagina
		var myRegexp = /https:\/\/intranet.ubiobio.cl\/([a-z0-9]{32})\/intranet\//g;
		var match = myRegexp.exec(response.url);
		console.log(response);
		console.log(this.token);
		if(match){
			this.token = match[1];
			return true;
		}else{
			return false;
		}
	}
	
	/**
	* Funcion que envia y valida los datos de ingreso a la intranet
	* -> rut		: rut del usuario. Numerico con el rut (sin puntos ni digito verificador)
	* -> password	: password del usuario
	* 
	* <- true si se pudo generar el token de forma correcta
	* <- false si no se pudo generar el token
	**/
	this.sendLogin = async function(rut,password) {		
		var dv 		= this.calculaDV(rut).toString().toLowerCase();
		var rutAux	= this.formatNumber(rut,0, 3, '.', ',');				
		var url		= 'https://intranet.ubiobio.cl/'+this.token+'/intranet/inicio.php';
		var body	= 'rut='+rut+'&dv='+dv+'&rut_aux='+rutAux+'-'+dv+'&clave='+password;		
		var headers = {
			"Referer"		: "https://intranet.ubiobio.cl/"+this.token+"/intranet/?",
			"Content-type"	: "application/x-www-form-urlencoded; charset=UTF-8",
		};
		var params = {method:'POST', body:body, headers:headers};
		
		//Pide la pagina
		let response = await this.getPagina(url, params);		
		setTimeout(() => null, 0);
		let responseText = await response.text();
		
		// Valida la respuesta de la pagina
		var myRegexp = /https:\/\/intranet.ubiobio.cl\/([a-z0-9]{32})\/intranet\/inicio.php/g;
		var match = myRegexp.exec(response.url);
				
		if(match && responseText.length>1000){
			return true;
		}else{
			return false;
		}
	}
	
	
	/**
	* Funcion que pide un token a la intranet y luego realiza el proceso de login
	* -> rut		: rut del usuario. Numerico con el rut (sin puntos ni digito verificador)
	* -> password	: password del usuario
	* 
	* <- true si el login se efectuo de forma correcta (usuario valido)
	* <- false si el login NO se efectuo de forma correcta (usuario incorrecto)
	**/
	this.doLogin = async function(rut,password) {
		await this.genToken();
		let res = await this.sendLogin(rut,password);
		return res;
	}
	
		
	/**
	* Funcion que pide el informe curricular del alumno	
	* <- objeto con los datos de las asignaturas de la carrera
	**/
	this.getInformeCurricular = async function() {
		var params = {method:'GET'};
		let response = await this.getPagina('https://intranet.ubiobio.cl/'+this.token+'/alumnos/alu_informe_curricular.php?acw=34', params);
		setTimeout(() => null, 0);
		let responseText = await response.text();
		
		return this.parseNotasCarrera(responseText);
	}
	
	
	/**
	* Funcion que pide las carreras que ha cursado el alumno
	* <- objeto con los datos de las carreras cursadas
	**/
	this.getCarreras = async function() {
		var params = {method:'GET'};
		let response = await this.getPagina('https://intranet.ubiobio.cl/'+this.token+'/alumnos/alu_informe_curricular.php?acw=34', params);
		setTimeout(() => null, 0);
		let responseText = await response.text();
		
		return this.parseCarreras(responseText);
	}
	
	
	/**
	* Funcion que pide los datos personales del alumno 
	* <- objeto con los datos personales del alumno
	**/
	this.getDatosAlumno = async function() {
		var params = {method:'GET'};
		let response = await this.getPagina('https://intranet.ubiobio.cl/'+this.token+'/jefe_carrera/consulta_antecedentes_estudiante_detalle.php?acw=42', params);
		setTimeout(() => null, 0);
		let responseText = await response.text();
		
		return this.parseDatosAlumno(responseText);
	}
		
	
	
	/**
	* Funciones Auxiliares para el rut
	**/
	
	this.calculaDV = function(rut) {
		// type check
		if(typeof rut !== 'string'){
			rut = rut.toString();
		}
		
		if (!rut || !rut.length ) {
			return -1;
		}
		// serie numerica
		var secuencia = [2,3,4,5,6,7,2,3];
		var sum = 0;
		//
		for (var i=rut.length - 1; i >=0; i--) {
			var d = rut.charAt(i)
			sum += new Number(d)*secuencia[rut.length - (i + 1)];
		};
		// sum mod 11
		var rest = 11 - (sum % 11);
		// si es 11, retorna 0, sino si es 10 retorna K,
		// en caso contrario retorna el numero
		return rest === 11 ? 0 : rest === 10 ? "K" : rest;
	}
	
	this.formatNumber = function(number, n, x, s, c) {
		var re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
			num = number.toFixed(Math.max(0, ~~n));

		return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
	}
	
	/*
	* Recursively merge properties of two objects 
	*/
	this.MergeRecursive = function(obj1, obj2) {

	  for (var p in obj2) {
		try {
		  // Property in destination object set; update its value.
		  if ( obj2[p].constructor==Object ) {
			obj1[p] = this.MergeRecursive(obj1[p], obj2[p]);

		  } else {
			obj1[p] = obj2[p];

		  }

		} catch(e) {
		  // Property in destination object not set; create it and set its value.
		  obj1[p] = obj2[p];

		}
	  }

	  return obj1;
	}
	
	
	
	/**
	* Funciones para parsear datos de los HTML de intranet
	**/

	this.parseDatosAlumno = function(html){
		var match;
		
		//Obtiene los datos personales del alumno		
		var patternDatosAlumno = /<div class="profile-info-value inf">[\s\S]*?<span>([\s\S]*?)<\/span>/gim;
		var datosAlumnoTmp = [];
		while (match = patternDatosAlumno.exec(html)){
			if(match){
				datosAlumnoTmp.push(match[1]);
			}
		}
		
		//Si el HTML no es valido, retorna falso
		if(datosAlumnoTmp.length<1){
			return false;
		}
		
		
		var datosAlumno = {
			nombres			: datosAlumnoTmp[0].trim(),	
			apellidos		: datosAlumnoTmp[1].trim().replace(/[\s]+/g, " "),		
			fechaN			: datosAlumnoTmp[2].trim(),
			estadoCivil		: datosAlumnoTmp[3].trim(),
			nacionalidad	: datosAlumnoTmp[4].trim(),
			sexo			: datosAlumnoTmp[5].trim(),
			correo			: datosAlumnoTmp[6].trim(),
			telefono		: datosAlumnoTmp[7].trim(),
			colegio			: datosAlumnoTmp[8].trim(),
			grupoDep		: datosAlumnoTmp[9].trim(),
			yearEgreso		: datosAlumnoTmp[10].trim(),
			mailOpcional	: datosAlumnoTmp[11].trim(),
			direccionA		: datosAlumnoTmp[12].trim(),
			ubicacionA		: datosAlumnoTmp[13].trim(),
			direccionF		: datosAlumnoTmp[14].trim(),
			ubicacionF		: datosAlumnoTmp[15].trim(),
			quintilI		: datosAlumnoTmp[16].trim(),
			quintilA		: datosAlumnoTmp[17].trim(),
			gratuidad		: datosAlumnoTmp[18].trim(),
			foto			: '',
			rut_string		: '',
			celular			: '',
		};

		//Obtiene la URL de la foto del alumno
		var patternFotoAlumno = /<img id="avatar" class="img-responsive portFoto" alt="Foto de Perfil"[\s\S]*?src[\s\S]*?=[\s\S]*?"(.*?)"/gim; 
		//agrego otro pattern para sacar el rut con puntos y guion
		var patternRut=/<a class="user-title-label dropdown-toggle desplazaport" data-toggle="dropdown">[\s\S]*?<span class="white">([\s\S]*?)<\/span>/gim;
		var patternCelular= /<span class="btn btn-link">[\s\S]*?<i class="ace-icon fa fa-mobile bigger-120 pink">[\s\S]*?<\/i>([\s\S]*?)<\/span>/gim;


		matchRut=patternRut.exec(html)
		matchCelular=patternCelular.exec(html)
		match = patternFotoAlumno.exec(html)
		if(match){
			datosAlumno.foto = match[1].trim();
		}
		if(matchRut){
			datosAlumno.rut_string=matchRut[1].trim();
		}
		if(matchCelular){
			datosAlumno.celular=matchCelular[1].trim();
		}
			
		return datosAlumno;
	}



	this.parseNotasCarrera = function(html){
		//Datos Asignatura
		var patternNotas = /\<tr class="inf"\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>[\s\S]*?\<td.*?>(.*?)\<\/td\>/gm; 
		
		var match;
		var datosNotas = [];
		while (match = patternNotas.exec(html)){
			var asignaturaTMP = {
				semestre		: parseInt(match[1].trim()),
				creditos		: parseInt(match[2].trim()),
				codigo			: match[3].trim(),
				asignatura		: match[4].trim(),
				reconocida		: match[5].trim(),
				notas			: [],
			};
			
			var notasTMP = [];
			notasTMP.push(match[6].trim());
			notasTMP.push(match[7].trim());
			notasTMP.push(match[8].trim());
			notasTMP.push(match[9].trim());
			notasTMP.push(match[10].trim());
			
			if( asignaturaTMP.reconocida.localeCompare("*") == 0 ){
				asignaturaTMP.reconocida = true;
			}else{
				asignaturaTMP.reconocida = false;
			}		
			
			for(var i=0;i<notasTMP.length;i++){
				if(notasTMP[i].length>0){
					var pattern2 = /^([0-9\.]+).*?([0-9]{4})-([0-9]{1})/g;
					var match2 = pattern2.exec(notasTMP[i]);
					if(match2){
						asignaturaTMP.notas.push( {nota: parseFloat(match2[1]), year:parseInt(match2[2]), semestre:parseInt(match2[3])} );
					}
				}
			}
			
			datosNotas.push(asignaturaTMP);
		}
		
		//Si el HTML no es valido, retorna falso
		if(datosNotas.length<1){
			return false;
		}

		return datosNotas;
	}

	this.parseCarreras = function(html){
		var patternCurso = /\<option[\s\S]*?value=["'](.*?)["'][\s\S]*?>([\s\S]*?)\<\/option>/gim;
		//le agrego para sacar el año de ingreso
		var patternIngreso=/<div class="form-group">[\s\S]*?<label class="col-sm-3 col-xs-3  blue inftab1">[\s\S]*?Ano Ing.  Carr.[\s\S]*?<\/label>[\s\S]*?<label class="col-sm-9 col-xs-9 inftab1">([\s\S]*?)<\/label>/gim;
                                
		var cursos = [];
		var matchIngreso=patternIngreso.exec(html);
		
		while (match = patternCurso.exec(html)){
			if(match){
				
				cursos.push({codigo:match[1].trim(), nombre:match[2].trim(), ingreso:matchIngreso[1].trim(), });
			}
		}

		//Si el HTML no es valido, retorna falso
		if(cursos.length<1){
			return false;
		}

		
		return cursos;
	}
		
	
}
