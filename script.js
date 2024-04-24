//--------------------------------INICIO-------------------------------//

$(function() {
 // Handler for .ready() called.
 			});
$("#identificador").focus();


//----------------------------BASE DE DATOS PERSONAS---------------------------//

//Arrays y objetos. Creamos uno de ejemplo
		let personas = new Array();
		let persona = new Object();

		persona = {
			
			"identificador" : "78933215K",
			"nombre" : "Sandra"
		}

		personas.push(persona);

		persona = {
			
			"identificador" : "60758487P",
			"nombre" : "Pepa"
		}

		personas.push(persona);

//----------------------------BASE DE DATOS MEDICAMENTOS---------------------------//

//Arrays y objetos. Creamos varios para la bd
		let medicamentos = new Array();
		let medicamento = new Object();

		medicamento = {
			
			"referencia" : "abcd12345678",
			"farmaceutica" : "Kern Pharma",
			"nombre" : "Ibuprofeno",
			"preciocompra" : 9.99,
			"precioventa" : 12.99,
			"stock" : 3
		}

		medicamentos.push(medicamento);

				medicamento = {
			
			"referencia" : "abcd87654321",
			"farmaceutica" : "Laboratorios Salvat",
			"nombre" : "Megalevure",
			"preciocompra" : 8.50,
			"precioventa" : 10.75,
			"stock" : 8
		}

		medicamentos.push(medicamento);

				medicamento = {
			
			"referencia" : "efgh12345678",
			"farmaceutica" : "Kern Pharma",
			"nombre" : "Paracetamol",
			"preciocompra" : 9.50,
			"precioventa" : 12.50,
			"stock" : 5
		}

		medicamentos.push(medicamento);

//---------------------------FUNCIONES-------------------------------//

//Función para validar el Identificador (formato DNI)
function validar_dni(value) {
	var numero;
	var letr;
	var letra;
	var expresion_regular_dni;

	expresion_regular_dni = /^\d{8}[a-zA-Z]$/;
		//Condición del if para ver si el input cumple el patrón DNI
		if(expresion_regular_dni.test (value) == true){
			//Cortamos el input para coger solo el número
			numero = value.substr(0,value.length-1);
			//Cortamos el input para coger solo la letra
			letr = value.substr(value.length-1,1);
			//Calculo para ver si la letra es correcta a través de un string de las 23 letras
			numero = numero % 23;
			letra='TRWAGMYFPDXBNJZSQVHLCKET';
			letra=letra.substring(numero,numero+1);
			if (letra!=letr.toUpperCase()) {
				return false;
			}else{
				return true;
			}
		}else{
			return false;
		}
	}

//Función para ver si existe en la bbdd

function siExiste(dni,nombreusuario){

	//Utilizamos la función some para ver si hay alguna coincidencia en el array
	if(personas.some(persona => persona.identificador.toUpperCase() === dni.toUpperCase() 
		&& persona.nombre === nombreusuario)){
		return true;
	} else{
		return false;
	}
}

//Función para ver si la referencia del medicamento está en la bd

function ref(refer){

	//Utilizamos la función some para ver si hay alguna coincidencia en el array
	if(medicamentos.some(medicamento => medicamento.referencia === refer)){
		return true;
	} else{
		return false;
	}
}
//---------------------------FUNCIÓN TABLA PEDIDOS------------------------//

function generarLista(){
//Generamos un array nuevo con los medicamentos que tengan 5 o menos de stock

let stockcinco = medicamentos.filter(medicamento => medicamento.stock < 6);

//Guardamos el largo del array de objetos medicamentos
var largoArray = stockcinco.length;

//Creamos tabla y cabecera
var tabla = '<table class="table  table-bordered  table-hover ">'+

'<tr class="table-success">'+
'<th scope="col">Referencia</th>'+
'<th scope="col">Farmaceútica</th>'+
'<th scope="col">Nombre</th>'+
'<th scope="col">P. Cte.</th>'+
'<th scope="col">P.V.P.</th>'+
'<th scope="col">Stock</th>'+

'</tr>';

//Recorremos el array y vamos introduciendo los datos en cada vuelta
 for(var i = 0; i < largoArray; i++){
tabla += '<tr>'+
'<td>'+stockcinco[i].referencia+'</td>'+
'<td>'+stockcinco[i].farmaceutica+'</td>'+
'<td>'+stockcinco[i].nombre+'</td>'+
'<td>'+stockcinco[i].preciocompra+'</td>'+
'<td>'+stockcinco[i].precioventa+'</td>'+
'<td>'+stockcinco[i].stock+'</td>'+
'</tr>'     
 }
//Cerramos la tabla
 tabla += '</table>';

//Añadimos la tabla al div correspondiente
 document.getElementById('tablaPedidos').innerHTML = tabla;
}

//----------------------BOTONES------------------------------------------------//

//Función botón Ingresar. Comprueba identificador y nombre y cambia de pantalla

$("#ingresar").click(function(){
//Lanzamos la función si el formulario se ha rellenado correctamente
	if($('#formulario_datos').valid()){

	var textoIdent = $("#identificador").val();
	var textoNombre = $("#nombre").val();

		if(siExiste(textoIdent,textoNombre)){
			$("#bienvenida").show();
			$("#bienvenida").text("Elige una opción " + textoNombre);
	  	$("#bloqueOpciones").show();
	  	$("#bloqueInicio").hide();
		} else{
			alert("Identificador y/o nombre incorrectos");
			$("#identificador").val('');
			$("#nombre").val('');
			$("#identificador").focus();
		}
	}else{
		$("#identificador").focus();
	}
});

//Botón Salir. Vuelve a inicio y "limpia sesión usuario"
$("#salir").click(function(){
	$("#bloqueInicio").show();
 	$("#bienvenida").hide();
  $("#bloqueOpciones").hide();
  $("#identificador").val('');
	$("#nombre").val('');
	$("#identificador").focus();
});

//Botón Pedidos. LLeva a la pantalla de pedidos y genera la lista de stock 5 o menos

$("#pedidos").click(function(){
	$('#derecha').toggleClass('w-25 w-50');
 	$("#bienvenida").hide();
  $("#bloqueOpciones").hide();
  $("#apartadoPedidos").show();
  generarLista();
  $("#espacio").hide();
  $("#volver").show();
});

//Botón Ventas. LLeva a la pantalla de ventas

$("#ventas").click(function(){
	$("#referencia").val('');
	$("#cantidad").val('');
  $("#bienvenida").hide();
  $("#bloqueOpciones").hide();
  $("#apartadoPedidos").hide();
  $("#bloqueVentas").show();
 	$("#volver").show();
 	$("#referencia").focus();
});

//Botón Compras. Lleva a la pantalla de compras

$("#compras").click(function(){
	$("#referenciaCompra").val('');
	$("#bienvenida").hide();
  $("#bloqueOpciones").hide();
  $("#apartadoPedidos").hide();
  $("#bloqueVentas").hide();
  $("#bloqueCompras").show();
 	$("#volver").show();
 	$("#referenciaCompra").focus();
});

//Botón Enviar Ventas. Envía las ventas y actualiza el stock

$("#enviarVenta").click(function(){
//Lanzamos la función si el formulario se ha rellenado correctamente
	if($('#formulario_ventas').valid()){
		var codigo = $("#referencia").val();
		var cantidad = $("#cantidad").val();

		if(ref(codigo)){
			var concreto = medicamentos.find(medicamento=>medicamento.referencia===codigo);
			if(concreto.stock<cantidad){
				alert("El producto no tiene stock suficiente");
				$("#cantidad").val('');
				$("#cantidad").focus();
			}else{
				for(const obj of medicamentos){
					if(obj.referencia===codigo){
						obj.stock = obj.stock - parseInt(cantidad);
						alert("Venta realizada. El stock se ha actualizado correctamente");
						$("#referencia").val('');
						$("#cantidad").val('');
						$("#referencia").focus();
						break; 
					}
				}
			}

		}else{
			alert("La referencia introducida no existe");
			$("#referencia").val('');
			$("#referencia").focus();
		}
	}else{
		$("#referencia").focus();
	}

});

//Botón Comprobar Compra. Comprueba si existe la referencia y
//lleva a pantalla de compra nueva o de modificación depende del caso

$("#comprobarCompra").click(function(){
//Lanzamos la función si el formulario se ha rellenado correctamente
	if($('#formulario_compras').valid()){
		var codigoCompra = $("#referenciaCompra").val();

		if(ref(codigoCompra)){
			$("#bloqueCompras").hide();
			$("#bloqueMod").show();
			$("#referenciaMod").val(codigoCompra);
			$("#referenciaMod").prop( "disabled", true );
			$("#nombreMod").val('');
			$("#costeMod").val('');
			$("#stockMod").val('');
			$("#nombreMod").focus();
			$("#volverpasoanterior").show();
		}else{
			$("#bloqueCompras").hide();
			$("#bloqueAlta").show();
			$("#referenciaAlta").val(codigoCompra);
			$("#referenciaAlta").prop( "disabled", true );
			$("#farmaAlta").val('');
			$("#nombreAlta").val('');
			$("#costeAlta").val('');
			$("#ventaAlta").val('');
			$("#stockAlta").val('');
			$("#farmaAlta").focus();
			$("#volverpasoanterior").show();
		}
	}else{
		$("#referenciaCompra").focus();
	}

});

//Botón Enviar Alta. Recoge nuevos datos y da de alta en la bd

$("#enviarAlta").click(function(){
//Lanzamos la función si el formulario se ha rellenado correctamente
	if($('#formulario_alta').valid()){
		var referenciaA= $("#referenciaAlta").val();
		var farmaceuticaA = $("#farmaAlta").val();
		var nombreA = $("#nombreAlta").val();
		var costeA = $("#costeAlta").val();
		var ventaA = $("#ventaAlta").val();
		var stockA = $("#stockAlta").val();

				medicamento = {
			
			"referencia" : referenciaA,
			"farmaceutica" : farmaceuticaA,
			"nombre" : nombreA,
			"preciocompra" : parseFloat(costeA),
			"precioventa" : parseFloat(ventaA),
			"stock" : parseInt(stockA)
		}

		medicamentos.push(medicamento);
		alert("Alta realizada correctamente");
		$("#bloqueCompras").show();
  	$("#bloqueMod").hide();
  	$("#bloqueAlta").hide();
  	$("#referenciaCompra").focus();
  	$("#referenciaCompra").val('');
  	$("#volverpasoanterior").hide();
	}else{
		$("#farmaAlta").focus();
	}

});

//Botón Enviar Modificación de producto. Recoge los datos y modifica el objeto del array

$("#enviarMod").click(function(){
//Lanzamos la función si el formulario se ha rellenado correctamente
	if($('#formulario_mod').valid()){
		var referenciaM= $("#referenciaMod").val();
		var nombreM = $("#nombreMod").val();
		var costeM = $("#costeMod").val();
		var stockM = $("#stockMod").val();

				for(const obj of medicamentos){
					if(obj.referencia===referenciaM){
						obj.nombre = nombreM;
						obj.preciocompra = costeM;
						obj.stock = obj.stock + parseInt(stockM);
						alert("El producto se ha modificado correctamente");
						break; 
					}
				}
		$("#bloqueCompras").show();
  	$("#bloqueMod").hide();
  	$("#bloqueAlta").hide();
  	$("#referenciaCompra").focus();
  	$("#referenciaCompra").val('');
  	$("#volverpasoanterior").hide();
	}else{
		$("#nombreMod").focus();
	}

});

//Botón volver a inicio

$("#volver").click(function(){
	$('#derecha').removeClass('w-50');
	$('#derecha').addClass('w-25');
 	$("#bienvenida").show();
  $("#bloqueOpciones").show();
  $("#apartadoPedidos").hide();
  $("#bloqueVentas").hide();
  $("#bloqueCompras").hide();
  $("#bloqueMod").hide();
  $("#bloqueAlta").hide();
  $("#espacio").show();
  $("#volver").hide();
  $("#volverpasoanterior").hide();
});

//Botón volver al paso anterior en apartado compras

$("#volverpasoanterior").click(function(){
  $("#bloqueCompras").show();
  $("#bloqueMod").hide();
  $("#bloqueAlta").hide();
  $("#referenciaCompra").focus();
  $("#referenciaCompra").val('');
  $("#volverpasoanterior").hide();
});


//----------------VALIDACIÓN FORMULARIOS PLUGIN JQUERY------------------------//

//Validamos los campos del formulario de INGRESO
	$('#formulario_datos').validate({
				//Reglas
				rules:{
					//Identificador con patrón usando el método creado
					identificador:{
						required:true,
						dni: true
					},

					nombre:{
						required:true,
						minlength:3,
						maxlength:30
					}
				},
				//Mensajes
				messages:{
					identificador:{
						required: "Campo obligatorio"
					},
					nombre:{
						required:"Por favor, introduzca su nombre",
						minlength:"El minimo número admisible de caracteres es 3",
						maxlength:"El máximo número admisible de caracteres es 20"
					}
				}	

			});

//Validamos el IDENTIFICADOR con la función creada para tal efecto
			jQuery.validator.addMethod("dni", function(value, element) {
				return validar_dni(value);
			}, 'Introduce un documento de identidad válido');		


//Validamos los campos del formulario de VENTAS
	$('#formulario_ventas').validate({
				//Reglas
				rules:{
					//Referencia con patrón usando el método creado
					referencia:{
						required:true,
						patronRef:true
					},

					cantidad:{
						required:true,
						number:true,
						min: 1,
						max:50
					}
				},
				//Mensajes
				messages:{
					referencia:{
						required:"Campo obligatorio"
					},
					cantidad:{
						required:"Introduce una cantidad",
						number:"Introduce un formato número",
						min: "Introduce una cantidad entre 1 y 50",
						max: "Introduce una cantidad entre 1 y 50"
					}
				
				}	

			});

//Validamos los campos del formulario de COMPRAS
	$('#formulario_compras').validate({
				//Reglas
				rules:{
					//Referencia con patrón usando el método creado
					referenciaCompra:{
						required:true,
						patronRef:true
					}
				},
				//Mensajes
				messages:{
					referenciaCompra:{
						required:"Campo obligatorio"
					}
				}	

			});

//Validamos los campos del formulario de ENVIAR COMPRAS NUEVAS (ALTA DE NUEVO PRODUCTO)
	$('#formulario_alta').validate({
				//Reglas
				rules:{
					//Referencia con patrón usando el método creado
					referenciaAlta:{
						required:true,
						patronRef:true
					},
					farmaAlta:{
						required:true,
						soloAlfanum:true,
						minlength:1,
						maxlength:20
					},
					nombreAlta:{
						required:true,
						soloAlfanum:true,
						minlength:1,
						maxlength:15

					},
					costeAlta:{
						required:true,
						number:true,
						min: 0
					},
					ventaAlta:{
						required:true,
						number:true,
						min: 0
					},
					stockAlta:{
						required:true,
						number:true,
						soloEnteros: true
					}
				},
				//Mensajes
				messages:{
					referenciaAlta:{
						required:"Campo obligatorio"
					},
					farmaAlta:{
						required:"Campo obligatorio",
						minlength: "Debes introducir entre 1 y 20 caracteres",
						maxlength: "Debes introducir entre 1 y 20 caracteres"
					},
					nombreAlta:{
						required:"Campo obligatorio",
						minlength: "Debes introducir entre 1 y 15 caracteres",
						maxlength: "Debes introducir entre 1 y 15 caracteres"
					},
					costeAlta:{
						required:"Campo obligatorio",
						number: "Debes introducir un número",
						min: "La cantidad mínima es 0"
					},
					ventaAlta:{
						required:"Campo obligatorio",
						number: "Debes introducir un número",
						min: "La cantidad mínima es 0"
					},
					stockAlta:{
						required:"Campo obligatorio",
						number: "Debes introducir un número"
					}
				}	

			});

//Validamos los campos del formulario de ENVIAR COMPRAS DE PRODUCTO YA EXISTENTE
	$('#formulario_mod').validate({
				//Reglas
				rules:{
					//Referencia con patrón usando el método creado
					referenciaMod:{
						required:true,
						patronRef:true
					},
					nombreMod:{
						required:true,
						soloAlfanum:true,
						minlength:1,
						maxlength:15
					},
					costeMod:{
						required:true,
						number:true,
						min: 0
					},
					stockMod:{
						required:true,
						number:true,
						soloEnteros: true
					}
				},
				//Mensajes
				messages:{
					referenciaMod:{
						required:"Campo obligatorio"
					},
					nombreMod:{
						required:"Campo obligatorio",
						minlength: "Debes introducir entre 1 y 15 caracteres",
						maxlength: "Debes introducir entre 1 y 15 caracteres"
					},
					costeMod:{
						required:"Campo obligatorio",
						number: "Debes introducir un número",
						min: "La cantidad mínima es 0"
					},
					stockMod:{
						required:"Campo obligatorio",
						number: "Debes introducir un número"
					}
				}	

			});

//Validamos campos alfanuméricos con la función creada para tal efecto
		jQuery.validator.addMethod("patronRef", function(value, element) {
     return /^[a-zA-Z0-9]{12}$/.test(value);
    	}, "La referencia debe tener 12 caracteres alfanuméricos");

		jQuery.validator.addMethod("soloAlfanum", function(value, element) {
     return /^[-\w\s\ñ\áéíóúÁÉÍÓÚ]+$/.test(value); //Alfanuméricos y guiones
    	}, "Debes introducir sólo caracteres alfanuméricos");

//Verificamos solo números enteros
		jQuery.validator.addMethod("soloEnteros", function(value, element) {
     return 	/^\d*$/.test(value);
    	}, "Solo puedes introducir números enteros");

    

