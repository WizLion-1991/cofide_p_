function vta_anticipoCte(){}function InitAnt(){var strHtml="<ul>"+getMenuItem("AddDepositoCte();","Guardar Anticipo","images/ptovta/CircleSave.png")+getMenuItem("CallbtnPagAnticipoCteP3();","Salir","images/ptovta/exitBig.png")+"</ul>";document.getElementById("TOOLBAR").innerHTML=strHtml;d.getElementById("btn1").setAttribute("class","Oculto");d.getElementById("btn1").setAttribute("className","Oculto");}function OpnDiagCteCob(){OpnOpt("CLIENTES","grid","dialogCte",false,false);}function AddDepositoCte(){if(document.getElementById("BC_ID").value!=0){if(document.getElementById("CTE_ID").value!="0"&&document.getElementById("CTE_ID").value!=""){if(document.getElementById("BCO_MONEDA").value!=0){$("#dialogPagos").dialog("open");var strFecha=document.getElementById("MC_FECHA").value;var idCliente=document.getElementById("CTE_ID").value;var dblAnticipo=document.getElementById("MC_ANTICIPO").value;var intMonedaBanco=document.getElementById("BCO_MONEDA").value;var dblTasaCambio=document.getElementById("PARIDAD").value;var intBancoID=document.getElementById("BC_ID").value;var strPOST="&idTrx="+0;strPOST+="&COUNT_PAGOS="+0;strPOST+="&FECHA="+strFecha;strPOST+="&NOTAS="+"";strPOST+="&MONEDA="+intMonedaBanco;strPOST+="&TASAPESO="+dblTasaCambio;strPOST+="&MONTOPAGO="+dblAnticipo;strPOST+="&BC_ID="+intBancoID;strPOST+="&IdCte="+idCliente;strPOST+="&intAnticipo="+1;$.ajax({type:"POST",data:encodeURI(strPOST),scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"html",url:"ERP_Cobros.jsp?id=1",success:function(dato){if(Left(dato,3)=="OK."){var strFechaActual=trim(strHoyFecha);strFechaActual=Right(strFechaActual,2)+"/"+Mid(strFechaActual,5,2)+"/"+Left(strFechaActual,4);document.getElementById("MC_FECHA").value=strFechaActual;document.getElementById("CTE_ID").value=0;document.getElementById("BCO_MONEDA").value=0;document.getElementById("PARIDAD").value=1;document.getElementById("BC_ID").value=0;document.getElementById("MC_ANTICIPO").value=0;document.getElementById("CT_RAZONSOCIAL").value="";alert(lstMsg[237]);$("#dialogPagos").dialog("close");}else{alert(dato);}$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":pto9:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}else{alert("Debes seleccionar una Moneda");document.getElementById("BCO_MONEDA").focus();}}else{alert("Debe seleccionar un Proveedor");document.getElementById("PV_ID").focus();}}else{alert("Debe seleccionar un banco");document.getElementById("BC_ID").focus();}}function CambiaBancoCte(){var intBanco=parseInt(document.getElementById("BC_ID").value);var strPOST="&BC_ID="+intBanco;$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"html",url:"ERP_Cobros.jsp?id=7",success:function(datos){document.getElementById("MONEDA_BANCO").value=datos;BuscaTasaCambioCte();},error:function(objeto,quepaso,otroobj){alert(":ptoExist:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function BuscaTasaCambioCte(){var intMonedaBanco=document.getElementById("BCO_MONEDA").value;var intMonedaSeleccionada=document.getElementById("MONEDA_CLIENTE").value;var strfecha=document.getElementById("MC_FECHA").value;var strPOST="&Moneda_1="+intMonedaBanco;strPOST+="&Moneda_2="+intMonedaSeleccionada;strPOST+="&fecha="+strfecha;$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Cobros.jsp?id=9",success:function(datos){var objsc=datos.getElementsByTagName("TasaCambio")[0];var lstTiks=objsc.getElementsByTagName("TasaCambios");var obj=lstTiks[0];var dblTC=obj.getAttribute("TC");var strOperacion=obj.getAttribute("Operacion");document.getElementById("COB_OPERACION").value=strOperacion;if(dblTC==0){dblTC=1;}document.getElementById("TIPO_CAMBIO").value=dblTC;BuscaTasaCambioPagoCliente();$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":ptoExist:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function ObtenNomCteAnt(){var strPV_ID=document.getElementById("CTE_ID").value;var strPOST="&CTE_ID="+strPV_ID;$("#dialogWait").dialog("open");$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"html",url:"ERP_Cobros.jsp?id=6",success:function(datos){if(trim(datos)!=""){var info=datos.split("|");document.getElementById("CT_RAZONSOCIAL").value=info[0];document.getElementById("MONEDA_CLIENTE").value=info[1];$("#dialogWait").dialog("close");BuscaTasaCambioPagoCliente();}else{$("#dialogWait").dialog("close");}},error:function(objeto,quepaso,otroobj){alert(":ptoExist:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function BuscaTasaCambioPagoCliente(){$("#dialogWait").dialog("open");var intMonedaBanco=document.getElementById("BCO_MONEDA").value;var intMonedaSeleccionada=document.getElementById("MONEDA_CLIENTE").value;var strfecha=document.getElementById("MC_FECHA").value;var strPOST="&Moneda_1="+intMonedaBanco;strPOST+="&Moneda_2="+intMonedaSeleccionada;strPOST+="&fecha="+strfecha;if(intMonedaBanco==intMonedaSeleccionada){document.getElementById("PARIDAD").disabled=true;}else{document.getElementById("PARIDAD").disabled=false;}$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_CobrosCuentas.jsp?id=9",success:function(datos){var objsc=datos.getElementsByTagName("TasaCambio")[0];var lstTiks=objsc.getElementsByTagName("TasaCambios");var obj=lstTiks[0];var dblTC=obj.getAttribute("TC");var strOperacion=obj.getAttribute("Operacion");document.getElementById("COB_OPERACION").value=strOperacion;datos=parseFloat(datos);if(dblTC==0){datos=1;}document.getElementById("PARIDAD").value=dblTC;$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":ptoExist:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function CallbtnPagAnticipoCteP3(){myLayout.open("west");myLayout.open("east");myLayout.open("south");myLayout.open("north");var objMainFacPedi=objMap.getScreen("ANTICTE");objMainFacPedi.bolActivo=false;objMainFacPedi.bolMain=false;objMainFacPedi.bolInit=false;objMainFacPedi.idOperAct=0;document.getElementById("MainPanel").innerHTML="";}