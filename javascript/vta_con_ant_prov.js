var itemIdEdCta=0;function vta_con_ant_prov(){}function CAPIni(){myLayout.close("west");myLayout.close("east");myLayout.close("south");myLayout.close("north");d.getElementById("btn1").setAttribute("class","Oculto");d.getElementById("btn1").setAttribute("className","Oculto");}function RefreshDatosProvConsAnt(){var intIdProveedor=document.getElementById("PROV_ID").value;$("#dialogWait").dialog("open");var strPOST="PV_ID="+intIdProveedor;$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_ConAntProv.jsp?id=2",success:function(datos){var lstAnts=datos.getElementsByTagName("proveedores")[0];var lstAnt=lstAnts.getElementsByTagName("proveedor");if(lstAnt.length!=0){var obj=lstAnt[0];document.getElementById("PROV_NOMBRE").value=obj.getAttribute("PV_RAZONSOCIAL");document.getElementById("CAP_MONEDA").value=parseInt(obj.getAttribute("MON_ID"));RefreshProvConsAnt();}else{$("#dialogWait").dialog("close");}},error:function(objeto,quepaso,otroobj){alert("edo_cta2:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function OpnDiagProvConsAnti(){OpnOpt("PROVEEDOR","grid","dialogCte",false,false);}function RefreshProvConsAnt(){$("#dialogCte").dialog("close");$("#dialogWait").dialog("open");var intIdProveedor=document.getElementById("PROV_ID").value;var intMon_ID=document.getElementById("CAP_MONEDA").value;var bolVerUtilizados="";if(document.getElementById("CAP_UTILIZADOS").checked){bolVerUtilizados="1";}else{bolVerUtilizados="0";}var bolVerAnulados="";if(document.getElementById("CAP_ANULADOS").checked){bolVerAnulados="1";}else{bolVerAnulados="0";}var strPOST="PV_ID="+intIdProveedor;strPOST+="&MON_ID="+intMon_ID;strPOST+="&CAP_UTILIZADOS="+bolVerUtilizados;strPOST+="&CAP_ANULADO="+bolVerAnulados;$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_ConAntProv.jsp?id=1",success:function(datos){var lstAnts=datos.getElementsByTagName("anticipos")[0];var lstAnt=lstAnts.getElementsByTagName("anticipo");var grid=jQuery("#CAP_GRID");grid.clearGridData();if(lstAnt.length!=0){for(var i=0;i<lstAnt.length;i++){var obj=lstAnt[i];var datarow={MP_ID:obj.getAttribute("MP_ID"),MP_FOLIO:obj.getAttribute("MP_FOLIO"),MP_FECHA:obj.getAttribute("MP_FECHA"),MP_TXTMONEDA:obj.getAttribute("MP_TXTMONEDA"),MP_ESTATUS:obj.getAttribute("MP_ESTATUS"),MP_SALDO_ORIGINAL:obj.getAttribute("MP_ANTICIPO_ORIGINAL"),MP_SALDO_ANTICIPO:obj.getAttribute("MP_SALDO_ANTICIPO"),MP_ANULADO:obj.getAttribute("MP_ANULADO"),MP_MONEDA:obj.getAttribute("MP_MONEDA"),MP_TXTANULADO:obj.getAttribute("MP_TXTANULADO")};itemIdEdCta++;grid.addRowData(itemIdEdCta,datarow,"last");}}else{alert("El proveedor no tiene anticipos");}$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert("ANTI_PROV:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function OpenConsultaUsoAnticipoProv(){var grid=jQuery("#CAP_GRID");if(grid.getGridParam("selrow")!=null){var lstRowAct=grid.getRowData(grid.getGridParam("selrow"));var strPOST="MP_ID="+lstRowAct.MP_ID;$("#dialogWait").dialog("open");$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_ConAntProv.jsp?id=3",success:function(datos){$("#dialogWait").dialog("close");var lstAnts=datos.getElementsByTagName("pagos")[0];var lstAnt=lstAnts.getElementsByTagName("pago");var strHTML="<table border=1>";var i;strHTML+="<tr>";strHTML+="<th>&nbsp;</th>";strHTML+="<th>"+"FOLIO FACTURA"+"</th>";strHTML+="<th>"+"FECHA FACTURA"+"</th>";strHTML+="<th>"+"FECHA PAGO"+"</th>";strHTML+="<th>"+"MONEDA PAGO"+"</th>";strHTML+="<th>"+"IMPORTE USADO"+"</th>";strHTML+="<th>"+"TASA DE CAMBIO"+"</th>";strHTML+="</tr>";for(i=0;i<lstAnt.length;i++){var obj=lstAnt[i];strHTML+="<tr>";strHTML+="<td><a href='javascript:ImprimirFACTURAPROV("+parseInt(obj.getAttribute("MP_ID"))+","+parseInt(obj.getAttribute("MPM_ID"))+')\'><img border="0" src="images/ptovta/printer_64.png"></a></td>';strHTML+="<td>"+obj.getAttribute("cxpFOLIO")+"</td>";strHTML+="<td>"+obj.getAttribute("cxpFECHA")+"</td>";strHTML+="<td>"+obj.getAttribute("MP_FECHA")+"</td>";strHTML+="<td>"+obj.getAttribute("txtMONEDA")+"</td>";strHTML+="<td align='right'>"+FormatNumber(parseFloat(obj.getAttribute("MP_ABONO")),2,true,false,true,false)+"</td>";strHTML+="<td align='right'>"+FormatNumber(parseFloat(obj.getAttribute("MP_TASAPESO")),2,true,false,true,false)+"</td>";strHTML+="</tr>";}strHTML+="</table border=2>";document.getElementById("dialog2_inside").innerHTML=strHTML;$("#dialogWait").dialog("close");$("#dialog2").dialog("option","title","HISTORIAL DE MOVIMIENTOS DEL ANTICIPO:"+" "+lstRowAct.MP_FOLIO);$("#dialog2").dialog("open");},error:function(objeto,quepaso,otroobj){alert("edo_cta4:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}}function SalirConsAntProv(){myLayout.open("west");myLayout.open("east");myLayout.open("south");myLayout.open("north");document.getElementById("MainPanel").innerHTML="";var objMainFacPedi=objMap.getScreen("CONA_PROV");objMainFacPedi.bolActivo=false;objMainFacPedi.bolMain=false;objMainFacPedi.bolInit=false;objMainFacPedi.idOperAct=0;}function ImprimirFACTURAPROV(intMP_ID,intMPM_ID){if(intMPM_ID==0){openFormat("CBCUENTAS","PDF",CreaHidden("MP_ID",intMP_ID));}else{openFormat("CBMASCUENTAS","PDF",CreaHidden("MPM_ID",intMPM_ID));}}