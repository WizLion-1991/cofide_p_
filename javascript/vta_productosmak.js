var itemId=0;var lastselBco=0;var idProd=0;var dblTasaVta11=dblTasa1;var dblTasaVta22=dblTasa2;var dblTasaVta33=dblTasa3;var intSImpVta1_22=intSImp1_2;var intSImpVta1_33=intSImp1_3;var intSImpVta2_33=intSImp2_3;function vta_productosmak(){}var itemId=0;function initPrMak(){loadHTMLPrMak();loadFuncionesPrMak();}function loadFuncionesPrMak(){var strNomMainpr=objMap.getNomMain();if(strNomMainpr=="PEDIDOS_MAK"){InitBuscaProdMak();}else{if(strNomMainpr=="PTO_VENTA"){InitBuscaProdMak();}else{if(strNomMainpr=="vta_combo"){InitBuscaProdMak();}}}}function InitBuscaProdMak(){var strNomMainpr=objMap.getNomMain();if(strNomMainpr=="PEDIDOS_MAK"){if(document.getElementById("FAC_PROD").value.trim()=="?"){}else{document.getElementById("FAC_PROD1").value=document.getElementById("FAC_PROD").value;if(document.getElementById("FAC_PROD1").value!=""){setTimeout("ObtieneProductoProdMak();",1000);}}}else{if(strNomMainpr=="PTO_VENTA"){if(document.getElementById("PTO_PR_CODIGO").value.trim()=="?"){}else{document.getElementById("FAC_PROD1").value=document.getElementById("PTO_PR_CODIGO").value;if(document.getElementById("FAC_PROD1").value!=""){setTimeout("ObtieneProductoProdMak();",1000);}}}else{if(strNomMainpr=="vta_combo"){if(document.getElementById("PR_CODIGO").value.trim()=="?"){}else{document.getElementById("FAC_PROD1").value=document.getElementById("PR_CODIGO").value;if(document.getElementById("FAC_PROD1").value!=""){setTimeout("ObtieneProductoProdMak();",1000);}}}}}}function ObtieneProductoProdMak(){var strNomMain=objMap.getNomMain();if(strNomMain=="PEDIDOS_MAK"){document.getElementById("FAC_PROD1").value=document.getElementById("FAC_PROD").value;var strCod=d.getElementById("FAC_PROD1").value;var strSC_ID=d.getElementById("pd_bodega").value;var strEMP_ID=d.getElementById("EMP_ID").value;var strParams="&PR_CODIGO="+strCod+"&SC_ID="+strSC_ID+"&EMP_ID="+strEMP_ID;var grid=jQuery("#PR_GRIDPROD");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=GRID_PRODMAK&_search=true"+strParams+" "});grid.setGridParam({sortname:"PR_CODIGO"}).trigger("reloadGrid");$("#dlgMakProductos").addClass("resizing");$("#dlgMakProductos").trigger("resizestop");}else{if(strNomMain=="PTO_VENTA"){document.getElementById("FAC_PROD1").value=document.getElementById("PTO_PR_CODIGO").value;var strCod=d.getElementById("FAC_PROD1").value;var strSC_ID=d.getElementById("PTO_SC_ID").value;var strEMP_ID=d.getElementById("EMP_ID").value;var strParams="&PR_CODIGO="+strCod+"&SC_ID="+strSC_ID+"&EMP_ID="+strEMP_ID;var grid=jQuery("#PR_GRIDPROD");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=GRID_PRODMAK&_search=true"+strParams+" "});grid.setGridParam({sortname:"PR_CODIGO"}).trigger("reloadGrid");}else{if(strNomMain=="vta_combo"){var strCod=d.getElementById("FAC_PROD1").value;var strSC_ID=d.getElementById("SC_ID").value;var strEMP_ID=d.getElementById("EMP_ID").value;var strParams="&PR_CODIGO="+strCod+"&SC_ID="+strSC_ID+"&EMP_ID="+strEMP_ID;var grid=jQuery("#PR_GRIDPROD");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=GRID_PRODMAK&_search=true"+strParams+" "});grid.setGridParam({sortname:"PR_CODIGO"}).trigger("reloadGrid");}}}}function AddItemPrecProdMak(objProd,Pr_Id,Ct_Id,Cantidad,strCod,dblExist,intDevo,strSeries){if(strSeries==null){strSeries="";}$.ajax({type:"POST",data:"PR_ID="+Pr_Id+"&CT_LPRECIOS="+document.getElementById("FCT_LPRECIOS").value+"&CANTIDAD="+Cantidad+"&FAC_MONEDA="+document.getElementById("FAC_MONEDA").value+"&CT_TIPO_CAMBIO="+document.getElementById("FAC_TTC_ID").value,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"DamePrecio.do?id=4",success:function(datoPrec){var bolFind=false;var lstXml=datoPrec.getElementsByTagName("Precios")[0];var lstprecio=lstXml.getElementsByTagName("Precio");for(var i=0;i<lstprecio.length;i++){var obj2=lstprecio[i];var objImportes=new _ImporteVtaPediMak();objImportes.dblCantidad=Cantidad;var dblPrecio=obj2.getAttribute("precioUsar");objImportes.dblPuntos=parseFloat(obj2.getAttribute("puntos"));objImportes.dblVNegocio=parseFloat(obj2.getAttribute("negocio"));objImportes.dblPrecio=parseFloat(dblPrecio);objImportes.dblPrecioReal=parseFloat(dblPrecio);objImportes.dblPorcDescGlobal=document.getElementById("FCT_DESCUENTO").value;objImportes.dblExento1=objProd.getAttribute("PR_EXENTO1");objImportes.dblExento2=objProd.getAttribute("PR_EXENTO2");objImportes.dblExento3=objProd.getAttribute("PR_EXENTO3");objImportes.intDevo=intDevo;if(parseInt(obj2.getAttribute("descuento"))==0){objImportes.bolAplicDescPrec=false;}if(parseInt(obj2.getAttribute("desc_pto"))==0){objImportes.bolAplicDescPto=false;}if(parseInt(obj2.getAttribute("desc_nego"))==0){objImportes.bolAplicDescVNego=false;}var bolAplicaMLM=true;if(document.getElementById("FAC_ES_MLM1")!=null&&document.getElementById("FAC_ES_MLM2")!=null){if(document.getElementById("FAC_ES_MLM2").checked){bolAplicaMLM=false;}}objImportes.bolUsoMLM=bolAplicaMLM;objImportes.CalculaImportePediMak();var dblDescuento=objImportes.dblImporteDescuento;var dblImporte=objImportes.dblImporte;var datarow={FACD_ID:0,FACD_CANTIDAD:Cantidad,FACD_DESCRIPCION:objProd.getAttribute("PR_DESCRIPCION"),FACD_IMPORTE:dblImporte,FACD_CVE:strCod,FACD_PRECIO:dblPrecio,FACD_TASAIVA1:dblTasaVta1,FACD_TASAIVA2:dblTasaVta2,FACD_TASAIVA3:dblTasaVta3,FACD_DESGLOSA1:1,FACD_IMPUESTO1:objImportes.dblImpuesto1,FACD_IMPUESTO2:objImportes.dblImpuesto2,FACD_IMPUESTO3:objImportes.dblImpuesto3,FACD_PR_ID:Pr_Id,FACD_EXENTO1:objProd.getAttribute("PR_EXENTO1"),FACD_EXENTO2:objProd.getAttribute("PR_EXENTO2"),FACD_EXENTO3:objProd.getAttribute("PR_EXENTO3"),FACD_REQEXIST:objProd.getAttribute("PR_REQEXIST"),FACD_EXIST:dblExist,FACD_NOSERIE:strSeries,FACD_ESREGALO:0,FACD_IMPORTEREAL:dblImporte,FACD_PRECREAL:dblPrecio,FACD_DESCUENTO:dblDescuento,FACD_PORDESC:objImportes.dblPorcAplica,FACD_PRECFIJO:0,FACD_ESDEVO:intDevo,FACD_CODBARRAS:objProd.getAttribute("PR_CODBARRAS"),FACD_NOTAS:"",FACD_RET_ISR:intRET_ISR,FACD_RET_IVA:intRET_IVA,FACD_RET_FLETE:intRET_FLETE,FACD_UNIDAD_MEDIDA:objProd.getAttribute("PR_UNIDADMEDIDA"),FACD_PUNTOS_U:objImportes.dblPuntos,FACD_NEGOCIO_U:objImportes.dblVNegocio,FACD_PUNTOS:objImportes.dblPuntosImporte,FACD_NEGOCIO:objImportes.dblVNegocioImporte,FACD_PR_CAT1:objProd.getAttribute("PR_CAT1"),FACD_PR_CAT2:objProd.getAttribute("PR_CAT2"),FACD_PR_CAT3:objProd.getAttribute("PR_CAT3"),FACD_PR_CAT4:objProd.getAttribute("PR_CAT4"),FACD_PR_CAT5:objProd.getAttribute("PR_CAT5"),FACD_PR_CAT6:objProd.getAttribute("PR_CAT6"),FACD_PR_CAT7:objProd.getAttribute("PR_CAT7"),FACD_PR_CAT8:objProd.getAttribute("PR_CAT8"),FACD_PR_CAT9:objProd.getAttribute("PR_CAT9"),FACD_PR_CAT10:objProd.getAttribute("PR_CAT10"),FACD_DESC_ORI:0,FACD_REGALO:0,FACD_ID_PROMO:0,FACD_DESC_PREC:parseInt(obj2.getAttribute("descuento")),FACD_DESC_PTO:parseInt(obj2.getAttribute("desc_pto")),FACD_DESC_VN:parseInt(obj2.getAttribute("desc_nego")),FACD_DESC_LEAL:parseInt(obj2.getAttribute("desc_nego")),FACD_USA_SERIE:objProd.getAttribute("PR_USO_NOSERIE"),FACD_SERIES:strSeries,FACD_SERIES_MPD:"",FACD_SERIES_O:"",FACD_SERIES_MPD_O:""};itemId++;jQuery("#PR_GRIDPROD").addRowData(itemId,datarow,"last");d.getElementById("FAC_PROD1").focus();d.getElementById("FAC_CANT1").value=0;bolFind=true;}if(!bolFind){}$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":pto4:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}function selgridprmak(rowid,status){d.getElementById("PR_SINIMPUESTOS").value=0;d.getElementById("PR_IMPUESTOS").value=0;d.getElementById("PR_PRECTOTAL").value=0;var grid1=jQuery("#PR_GRIDPROD");var id=rowid;var lstRow=grid1.getRowData(id);var intPrId=lstRow.PR_CODIGO;jQuery("#PR_GRIDSUCPR").clearGridData();var itemIdCob=0;$.ajax({type:"POST",data:"intPrId="+intPrId,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"XML",url:"ERP_PedidosMakProcs.jsp?id=12",success:function(datos){var objsc=datos.getElementsByTagName("vta_producto_suc")[0];
var lstProds=objsc.getElementsByTagName("vta_productos");for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];var datarow={SUC_SUCURSAL:obj.getAttribute("sucursal"),SUC_EXISTENCIA:obj.getAttribute("existencia"),SUC_ASIGNADO:obj.getAttribute("asignado"),SUC_DISPONIBLE:obj.getAttribute("disponible"),SUC_OBSERVACIONES:obj.getAttribute("observaciones")};jQuery("#PR_GRIDSUCPR").addRowData(itemIdCob,datarow,"last");d.getElementById("PR_CODIGO").value=obj.getAttribute("PR_CODIGO");d.getElementById("PR_NOMBRE").value=obj.getAttribute("observaciones");d.getElementById("PR_UM").value=obj.getAttribute("PR_UNIDADMEDIDA");d.getElementById("PR_UBICACION").value="";d.getElementById("PR_IMAGEN").value=obj.getAttribute("imagen");d.getElementById("PR_CODPREC").value=obj.getAttribute("codprec");ImgLoadPrMak(document.getElementById("PR_IMAGEN").value,"PR_IMAGEN");$.ajax({type:"POST",data:"PR_ID="+lstRow.PR_ID+"&CT_LPRECIOS=1&CANTIDAD=1&FAC_MONEDA="+document.getElementById("FAC_MONEDA").value+"&CT_TIPO_CAMBIO=1",scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"DamePrecio.do?id=4",success:function(datoPrec){var lstXml=datoPrec.getElementsByTagName("Precios")[0];var lstprecio=lstXml.getElementsByTagName("Precio");for(var i=0;i<lstprecio.length;i++){var obj2=lstprecio[i];d.getElementById("PR_SINIMPUESTOS").value=obj2.getAttribute("precioUsar");var taxReal=new Impuestos(dblTasaVta11,dblTasaVta22,dblTasaVta33,intSImpVta1_22,intSImpVta1_33,intSImpVta2_33);taxReal.CalculaImpuesto(d.getElementById("PR_SINIMPUESTOS").value,0,0);d.getElementById("PR_IMPUESTOS").value=FormatNumber(taxReal.dblImpuesto1,2,true,false,true,false);d.getElementById("PR_PRECTOTAL").value=FormatNumber(parseFloat(d.getElementById("PR_SINIMPUESTOS").value.replace(",",""))+parseFloat(d.getElementById("PR_IMPUESTOS").value.replace(",","")),2,true,false,true,false);}},error:function(objeto,quepaso,otroobj){alert(":pto4:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){alert(":pto:"+objeto+" "+quepaso+" "+otroobj);}});}function ImgLoadPrMak(sSrc,strNomImg){var pathArray=document.URL.split("/");var newPathname="";for(var i=0;i<pathArray.length-1;i++){newPathname+=pathArray[i]+"/";}newPathname+=sSrc;var oImg=new Image();oImg.onload=function(){document.getElementById(strNomImg).src=oImg.src;};oImg.onerror=function(){document.getElementById(strNomImg).src="images/blanco.png";};oImg.src=newPathname+"?time="+new Date();}function addGridProductosPrMak(){var grid1=jQuery("#PR_GRIDPROD");var lista=grid1.getGridParam("selarrrow");if(lista!=0){var strNomMainprmak=objMap.getNomMain();if(strNomMainprmak=="PEDIDOS_MAK"){var lista=grid1.getGridParam("selarrrow");for(var i=0;i<lista.length;i++){var idlast=lista[i];var lstRow=grid1.getRowData(idlast);ObtieneProductoPediMak(lstRow.PR_CODIGO);}var objSecModiVta=objMap.getScreen("PRODUCTOS_MAK");if(objSecModiVta!=null){objSecModiVta.bolActivo=false;objSecModiVta.bolMain=false;objSecModiVta.bolInit=false;objSecModiVta.idOperAct=0;}$("#dlgMakProductos").dialog("close");$("#dlgMakBusqProd").dialog("close");}else{if(strNomMainprmak=="PTO_VENTA"){var lista=grid1.getGridParam("selarrrow");for(var i=0;i<lista.length;i++){var idlast=lista[i];var lstRow=grid1.getRowData(idlast);ObtieneProductoPtoVta(lstRow.PR_CODIGO);}var objSecModiVta=objMap.getScreen("PRODUCTOS_MAK");if(objSecModiVta!=null){objSecModiVta.bolActivo=false;objSecModiVta.bolMain=false;objSecModiVta.bolInit=false;objSecModiVta.idOperAct=0;}$("#dlgMakProductos").dialog("close");$("#dlgMakBusqProd").dialog("close");}else{if(strNomMainprmak=="vta_combo"){var lista=grid1.getGridParam("selarrrow");for(var i=0;i<lista.length;i++){var idlast=lista[i];var lstRow=grid1.getRowData(idlast);document.getElementById("PR_CODIGO").value=lstRow.PR_CODIGO;document.getElementById("PR_DESCRIPCION").value=lstRow.PR_DESCRIPCIONCORTA;document.getElementById("PR_PRECIO").value=lstRow.PR_COSTOPROM;document.getElementById("PR_ID").value=lstRow.PR_ID;}var objSecModiVta=objMap.getScreen("PRODUCTOS_MAK");if(objSecModiVta!=null){objSecModiVta.bolActivo=false;objSecModiVta.bolMain=false;objSecModiVta.bolInit=false;objSecModiVta.idOperAct=0;}$("#dlgMakProductos").dialog("close");$("#dlgMakBusqProd").dialog("close");}}}}}function loadHTMLPrMak(){var strHtml1="<table>"+"<tr>"+'<td id="btn_libreta"><i class = "fa fa-pencil-square-o" style="font-size:30px" onclick="MuestraChecks();"></i></td>'+'<td id="btn_t"><i class = "fa fa-text-width" style="font-size:30px" onclick="SearchProductosAll();"></i></td>'+'<td id="btn_buscar"><i class = "fa fa-search" style="font-size:30px" onclick="BusquedaPrMak();"></i></td>'+'<td id="btn_salir"><i class = "fa fa-times" style="font-size:30px" onclick="SalirProductoPrMak();"></i></td>'+'<td id="btn_enviar"><i class = "fa fa-check" style="font-size:30px" onclick="addGridProductosPrMak();"></i></td>'+"</tr>"+"</table>";document.getElementById("PR_DIV").innerHTML=strHtml1;strHtml1=" "+"<div class='panel-heading'><font size=1>INFORMACION DEL PRODUCTO</font></div>"+"<table cellpadding='4' cellspacing='1' border='0' >"+"<tr>"+"<td>CODIGO:</td>"+"<td><input type='text' id='PR_CODIGO' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"<tr>"+"<td>NOMBRE:</td>"+"<td><input type='text' id='PR_NOMBRE' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"<tr>"+"<td>UM:</td>"+"<td><input type='text' id='PR_UM' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"<tr>"+"<td>UBICACION:</td>"+"<td><input type='text' id='PR_UBICACION' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"</tr>"+"</table>"+"";document.getElementById("PR_DATOS_DIV").innerHTML=strHtml1;strHtml1=" "+"<div class='panel-heading'><font size=1>Precios</font></div>"+"<table cellpadding='4' cellspacing='1' border='0' >"+"<tr>"+"<td>SIN IMPUESTOS:</td>"+"<td><input type='text' id='PR_SINIMPUESTOS' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"<tr>"+"<td>+ IMPUESTOS:</td>"+"<td><input type='text' id='PR_IMPUESTOS' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"<tr>"+"<td>PRECIO TOTAL:</td>"+"<td><input type='text' id='PR_PRECTOTAL' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"<tr>"+"<td>CODIGO PRECIOS:</td>"+"<td><input type='text' id='PR_CODPREC' value='' disabled='disabled' size='50' style= 'background-color:#C2C2C2;color:black;'/></td>"+"</tr>"+"</tr>"+"</table>"+"";document.getElementById("PR_PRECIOS_DIV").innerHTML=strHtml1;}function MuestraChecks(){jQuery("#PR_GRIDPROD").jqGrid("showCol","cb");jQuery("#PR_GRIDPROD").jqGrid("setGridParam",{multiselect:true});jQuery("#PR_GRIDPROD").trigger("reloadGrid");jQuery("#PR_GRIDPROD").unbind("reloadGrid");}function MuestraProductosPrMak(){var objSecModiVta=objMap.getScreen("PROD_MAK");if(objSecModiVta!=null){objSecModiVta.bolActivo=false;objSecModiVta.bolMain=false;objSecModiVta.bolInit=false;objSecModiVta.idOperAct=0;}OpnOpt("PROD_MAK","grid","dialog2",false,false,true);}function SalirProductoPrMak(){$("#dlgMakProductos").dialog("close");$("#dlgMakBusqProd").dialog("close");}function InitPreciosPrMak(){var obscProd=objMap.getScreen("PROD");$("#dialogWait").dialog("open");var strPR_ID="0";if(document.getElementById("PR_ID")!=null&&document.getElementById("PR_ID")!="undefined"){strPR_ID=document.getElementById("PR_ID").value;}$.ajax({type:"POST",data:"PR_ID="+strPR_ID,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"DamePrecio.do?id=1",success:function(datos){var lstXml=datos.getElementsByTagName("Precios")[0];var lstprecio=lstXml.getElementsByTagName("Precio");
for(var i=0;i<lstprecio.length;i++){var obj=lstprecio[i];var inum=obj.getAttribute("num");var datarow={PP_ID:0,PR_ID:obj.getAttribute("pr_id"),LP_ID:obj.getAttribute("num"),PP_PRECIO:obj.getAttribute("precio"),PP_PRECIO_USD:obj.getAttribute("precio_usd"),PP_APDESC:obj.getAttribute("descuento"),PP_PTOSLEAL:obj.getAttribute("lealtad"),PP_PTOSLEALCAM:obj.getAttribute("lealtadCA"),PP_NOM:obj.getAttribute("nombre"),PP_PUNTOS:obj.getAttribute("puntos"),PP_NEGOCIO:obj.getAttribute("negocio"),PP_AP_DESC_PTO:obj.getAttribute("desc_pto"),PP_AP_DESC_NEGO:obj.getAttribute("desc_nego"),PP_PUBLICO:obj.getAttribute("publico"),PP_PUTILIDAD:obj.getAttribute("putilidad")};jQuery("#GRID1").addRowData(inum,datarow,"last");}$.ajax({type:"POST",data:"",scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Inventario.jsp?id=10",success:function(datos){var lstXml=datos.getElementsByTagName("prodCat")[0];for(var h=1;h<=9;h++){var lstCat=lstXml.getElementsByTagName("Cat"+h);var sel=document.getElementById("PR_CATEGORIA"+h);select_clear(sel);select_add(sel,"SELECCIONE",0);for(var i=0;i<lstCat.length;i++){var objCat=lstCat[i];var idCat=objCat.getAttribute("id");var descCat=objCat.getAttribute("desc");select_add(sel,descCat,idCat);}}if(obscProd.objDataEdit!=null){var objDataItem=obscProd.objDataEdit.getElementsByTagName("vta_productos");for(var h=1;h<=9;h++){var idCatSel=objDataItem[0].getAttribute("PR_CATEGORIA"+h);document.getElementById("PR_CATEGORIA"+h).value=idCatSel;}refreshClas10PrMAk(objDataItem[0].getAttribute("PR_CATEGORIA10"));}getProductosKitPrMak();},error:function(objeto,quepaso,otroobj){alert("Error en categorias: "+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});},error:function(objeto,quepaso,otroobj){alert("Error en precios: "+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});_ActButtonsOPPrMak("bt_calc_prec2",false);_ActButtonsOPPrMak("bt_calc_prec3",false);InitProdImgPrMak();_PreSelBodegasPrMak();}function _ActButtonsOPPrMak(strNombre,bolActivo){var boton=document.getElementById(strNombre);var clAct="fg-button ui-state-default ui-priority-primary ui-corner-all";var clNAct="fg-button ui-state-default ui-state-disabled ui-corner-all";if(bolActivo){boton.disabled=false;boton.className=clAct;}else{boton.disabled=true;boton.className=clNAct;}}function dblClickProdPrMak(id){var strNomMain=objMap.getNomMain();if(strNomMain=="PEDIDOS_MAK"){OpnEdit(document.getElementById("Ed"+"PROD_MAK"));var grid1=jQuery("#PROD");var idP=grid1.getGridParam("selrow");var lstRow=grid1.getRowData(idP);idProd=lstRow.PR_ID;}else{var grid=jQuery("#PROD_MAK");var lstVal=grid.getRowData(id);if(strNomMain=="INV"){document.getElementById("INV_PROD").value=lstVal.PR_CODIGO;document.getElementById("INV_DESC").value=lstVal.PR_DESCRIPCION;$("#dialogProd").dialog("close");AddItemIV();}else{if(strNomMain=="NCREDITO"){document.getElementById("NC_PROD").value=lstVal.PR_CODIGO;document.getElementById("NC_DESC").value=lstVal.PR_DESCRIPCION;$("#dialogProd").dialog("close");AddItemNC();}else{if(strNomMain=="vta_combo"){document.getElementById("PR_CODIGO").value=lstVal.PR_CODIGO;document.getElementById("PR_DESCRIPCION").value=lstVal.PR_DESCRIPCIONCORTA;document.getElementById("PR_PRECIO").value=lstVal.PR_COSTOPROM;document.getElementById("PR_ID").value=lstVal.PR_ID;$("#dialogProd").dialog("close");}else{if(strNomMain=="REG_COM"){document.getElementById("COM_PROD").value=lstVal.PR_CODIGO;document.getElementById("COM_DESC").value=lstVal.PR_DESCRIPCION;document.getElementById("COM_PRECIO").value=lstVal.PR_COSTOCOMPRA;$("#dialogProd").dialog("close");}else{if(strNomMain=="CXPAGAR"){document.getElementById("CXP_PROD").value=lstVal.PR_CODIGO;document.getElementById("CXP_DESC").value=lstVal.PR_DESCRIPCION;document.getElementById("CXP_COSTO").value=lstVal.PR_COSTOCOMPRA;ObtenDatosProductoCXP();$("#dialogProd").dialog("close");}else{if(strNomMain=="REC_ODC_CX"){document.getElementById("COM_PROD").value=lstVal.PR_CODIGO;document.getElementById("COM_DESCRIPCION").value=lstVal.PR_DESCRIPCION;document.getElementById("COM_PRECIO").value=lstVal.PR_COSTOCOMPRA;document.getElementById("COM_PR_ID_PROD").value=lstVal.PR_ID;$("#dialogProd").dialog("close");}else{if(strNomMain=="ETQ"){document.getElementById("CODIGO_PROD").value=lstVal.PR_CODIGO;$("#dialogProd").dialog("close");}else{if(strNomMain=="CON_INV"){document.getElementById("CI_CODIGO").value=lstVal.PR_CODIGO;document.getElementById("CI_DESCRIPCION").value=lstVal.PR_DESCRIPCION;$("#dialogProd").dialog("close");}else{var dialogDevo=$("#dialogDevo");var _bolDevo=false;if(dialogDevo!=null){if($("#dialogDevo").dialog("isOpen")){_bolDevo=true;}}if(!_bolDevo){document.getElementById("FAC_PROD").value=lstVal.PR_CODIGO;document.getElementById("FAC_DESC").value=lstVal.PR_DESCRIPCION;document.getElementById("FAC_CANT").focus();document.getElementById("FAC_CANT").select();$("#dialogProd").dialog("close");}else{document.getElementById("DEVO_ARTICULO").value=lstVal.PR_CODIGO;document.getElementById("DEVO_DESCRIPCION").value=lstVal.PR_DESCRIPCION;$("#dialogProd").dialog("close");}}}}}}}}}}}function refreshClas10PrMAk(strIdDefa){if(document.getElementById("PR_CATEGORIA9").value!="0"){var strPOST="idItem="+document.getElementById("PR_CATEGORIA9").value;$.ajax({type:"POST",data:strPOST,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Inventario.jsp?id=12",success:function(datos){var lstXml=datos.getElementsByTagName("vta_clasific")[0];var lstCat=lstXml.getElementsByTagName("clas");var sel=document.getElementById("PR_CATEGORIA10");select_clear(sel);select_add(sel,"SELECCIONE",0);for(var i=0;i<lstCat.length;i++){var objCat=lstCat[i];var idCat=objCat.getAttribute("id");var descCat=objCat.getAttribute("desc");select_add(sel,descCat,idCat);}if(strIdDefa!=null&&strIdDefa!=undefined){document.getElementById("PR_CATEGORIA10").value=strIdDefa;}},error:function(objeto,quepaso,otroobj){alert("Paso siguiente: "+objeto+" "+quepaso+" "+otroobj);}});}else{select_clear(document.getElementById("PR_CATEGORIA10"));}}function getProductosKitPrMak(){var grid=jQuery("#PROD");var id=grid.getGridParam("selrow");var lstRow=grid.getRowData(id);$.ajax({type:"POST",data:"idPr="+lstRow.PR_ID,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_Inventario.jsp?id=15",success:function(datos){var lstProductos=datos.getElementsByTagName("productos")[0];var objProducto=lstProductos.getElementsByTagName("producto");var grid2=jQuery("#GRDTAB6");for(var i=0;i<objProducto.length;i++){var obj=objProducto[i];var datarow={TXTCODTBL:obj.getAttribute("PAQ_COD"),TXTCANTBL:obj.getAttribute("PAQ_CANTIDAD"),TXTCVETBL:obj.getAttribute("PAQ_DESCRIPCION"),HDDPRID:obj.getAttribute("PR_ID"),TXTFACSOBRTBL:obj.getAttribute("PAQ_FACSOBR"),TXTCOSTREPTBL:obj.getAttribute("PAQ_COSTREP"),TXTMONORIGlLETRA:obj.getAttribute("PAQ_MONEDAORIGI"),TXTTOTALESTBL:obj.getAttribute("PAQ_TOTALES"),TXTPRECIOORIGI:obj.getAttribute("PAQ_PRECIOORIGI"),TXTPRECIOCONV:obj.getAttribute("PAQ_PRECIOCONV")};itemId++;grid2.addRowData(itemId,datarow,"last");}$("#dialogWait").dialog("close");},error:function(objeto,quepaso,otroobj){$("#dialogWait").dialog("close");alert(":tarifas:"+objeto+" "+quepaso+" "+otroobj);}});}function InitProdImgPrMak(){}function _PreSelBodegasPrMak(){var objsel_SUC_LST=document.getElementById("sel_SUC_LST");if(objsel_SUC_LST!=null){objsel_SUC_LST.checked=true;PCheckSelTodo(objsel_SUC_LST,"SUC_LST");}}function EvalBodegasInitMasters(){_IsExecuted=false;if(_IsExecuted){EvalColsMasters();}}function EvalColsMasters(){if(!_IsExecuted){var bolPreBodega=false;var bolInactivo=false;var ci=false;_IsExecuted=true;_bolRefreshGridProds=true;var intBodegaPre=0;var strNomMain=objMap.getNomMain();if(strNomMain=="PROD_MAK"){bolInactivo=true;intBodegaPre=intSucDefa;var grid=jQuery("#PROD_MAK");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=PROD_MAK&PR_ACTIVO=999&PR_ECOMM=999&_search=true&SC_ID="+intBodegaPre});
if(_bolRefreshGridProds){setTimeout("jQuery('#PROD_MAK').trigger('reloadGrid',[{page:1}])",1000);}}else{var grid=jQuery("#PROD_MAK");if(strNomMain=="INV"){grid.hideCol("PR_ACTIVO");bolPreBodega=true;intBodegaPre=document.getElementById("SC_ID").value;}else{if(strNomMain=="NCREDITO"){grid.hideCol("SC_ID");grid.hideCol("PR_ACTIVO");grid.hideCol("PR_COSTOCOMPRA");grid.hideCol("PV_ID");bolPreBodega=true;intBodegaPre=document.getElementById("SC_ID").value;}else{if(strNomMain=="COMPRAS"){grid.hideCol("PR_ACTIVO");bolPreBodega=true;intBodegaPre=document.getElementById("SC_ID").value;}else{if(strNomMain=="REG_COM"){grid.hideCol("PR_ACTIVO");bolPreBodega=true;intBodegaPre=document.getElementById("SC_ID").value;}else{if(strNomMain=="CXPAGAR"){grid.hideCol("PR_ACTIVO");bolPreBodega=true;intBodegaPre=document.getElementById("SC_ID").value;}else{if(strNomMain=="VENTAS"||strNomMain=="PEDIDO"){grid.hideCol("SC_ID");grid.hideCol("PR_ACTIVO");grid.hideCol("PR_COSTOCOMPRA");grid.hideCol("PV_ID");bolPreBodega=true;intBodegaPre=document.getElementById("SC_ID").value;}else{if(strNomMain=="NCREDITO2"){grid.hideCol("SC_ID");grid.hideCol("PR_ACTIVO");grid.hideCol("PR_COSTOCOMPRA");grid.hideCol("PV_ID");bolPreBodega=true;intBodegaPre=document.getElementById("SC_ID").value;}else{if(strNomMain=="CON_INV"){grid.hideCol("SC_ID");grid.hideCol("PR_ACTIVO");grid.hideCol("PR_COSTOCOMPRA");grid.hideCol("PV_ID");bolPreBodega=true;ci=true;intBodegaPre=document.getElementById("CI_BODEGA").value;}if(strNomMain=="PEDIDOS_MAK"||strNomMain=="PTO_VENTA"||strNomMain=="vta_combo"){bolInactivo=true;intBodegaPre=intSucDefa;var grid=jQuery("#PROD_MAK");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=PROD_MAK&PR_ACTIVO=1&PR_ECOMM=999&_search=true&SC_ID="+intBodegaPre});if(_bolRefreshGridProds){setTimeout("jQuery('#PROD_MAK').trigger('reloadGrid',[{page:1}])",1000);}}else{bolPreBodega=false;bolInactivo=true;}}}}}}}}if(bolPreBodega){_bolRefreshGridProds=false;if(_bodegaWorkProd==0){if(ci){_bodegaWorkProd=document.getElementById("CI_BODEGA").value;}else{_bodegaWorkProd=document.getElementById("SC_ID").value;}_bolRefreshGridProds=true;}else{var intBodegaActual;if(ci){intBodegaActual=document.getElementById("CI_BODEGA").value;}else{intBodegaActual=document.getElementById("SC_ID").value;}if(parseFloat(_bodegaWorkProd)!=parseFloat(intBodegaActual)){if(ci){_bodegaWorkProd=document.getElementById("CI_BODEGA").value;}else{_bodegaWorkProd=document.getElementById("SC_ID").value;}_bolRefreshGridProds=true;}}grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=PROD_MAK&_search=true&PR_ACTIVO=1&PR_ECOMM=999&SC_ID="+intBodegaPre});if(_bolRefreshGridProds){setTimeout("jQuery('#PROD_MAK').trigger('reloadGrid',[{page:1}])",1000);}}else{if(!bolInactivo){grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=PROD_MAK&_search=true&PR_ACTIVO=1&PR_ECOMM=999"});if(_bolRefreshGridProds){setTimeout("jQuery('#PROD_MAK').trigger('reloadGrid',[{page:1}])",1000);}}}}}}function SearchProductos(){$("#dialogWait").dialog("open");var strParams="";var strEMP_ID=intEMP_ID;var strSC_ID=0;var strNomMainpr=objMap.getNomMain();if(strNomMainpr=="PEDIDOS_MAK"){strSC_ID=document.getElementById("pd_bodega").value;}else{if(strNomMainpr=="PTO_VENTA"){strSC_ID=intSucDefa;}else{if(strNomMainpr=="vta_combo"){strSC_ID=intSucDefa;}}}strParams+="&SC_ID="+strSC_ID;strParams+="&EMP_ID="+strEMP_ID;var strCod=d.getElementById("BQ_CODIGO").value;var strDescripcion=d.getElementById("BQ_DESCRIPCION").value;var strTalla=d.getElementById("BQ_TALLA").value;var strColor=d.getElementById("BQ_COLOR").value;var strMarca=d.getElementById("BQ_MARCA").value;var strGrupo=d.getElementById("BQ_GRUPO").value;if(strCod!=""&&strCod!="0"&&strCod!=0){strParams+="&PR_CODIGO="+strCod;}if(strDescripcion!=""&&strDescripcion!="0"&&strDescripcion!=0){strParams+="&PR_DESCRIPCIONCORTA="+strDescripcion;}if(strTalla!=""&&strTalla!="0"&&strTalla!=0){strParams+="&PR_CATEGORIA4="+strTalla;}if(strColor!=""&&strColor!="0"&&strColor!=0){strParams+="&PR_CATEGORIA3="+strColor;}if(strMarca!=""&&strMarca!="0"&&strMarca!=0){strParams+="&PR_CATEGORIA1="+strMarca;}if(strGrupo!=""&&strGrupo!="0"&&strGrupo!=0){strParams+="&PR_CATEGORIA9="+strGrupo;}var grid=jQuery("#PR_GRIDPROD");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=GRID_PRODMAK&_search=true"+strParams+""});grid.setGridParam({sortname:"PR_CODIGO"}).trigger("reloadGrid");$("#dialogWait").dialog("close");$("#dlgMakBusqProd").dialog("close");}function SearchProductosAll(){document.getElementById("FAC_PROD1").value="";var strParams="";var strEMP_ID=intEMP_ID;var strSC_ID=0;var strNomMainpr=objMap.getNomMain();if(strNomMainpr=="PEDIDOS_MAK"){strSC_ID=document.getElementById("pd_bodega").value;}else{if(strNomMainpr=="PTO_VENTA"){strSC_ID=intSucDefa;}else{if(strNomMainpr=="vta_combo"){strSC_ID=intSucDefa;}}}strParams+="&SC_ID="+strSC_ID;strParams+="&EMP_ID="+strEMP_ID;var grid=jQuery("#PR_GRIDPROD");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=GRID_PRODMAK&_search=true"+strParams+""});grid.setGridParam({sortname:"PR_CODIGO"}).trigger("reloadGrid");}function BusquedaPrMak(){document.getElementById("FAC_PROD1").value="";OpnOpt("BUSQ_MAK","_ed","dlgMakBusqProd",false,false,true);}function InitBusquedaPrMak(){}function EvalProdEvtPrMak(event,obj){if(event.keyCode==13){EvalProdEvtPrMakDo();}}function EvalProdEvtPrMakDo(){var strParams="";var strEMP_ID=intEMP_ID;var strSC_ID=0;var strNomMainpr=objMap.getNomMain();if(strNomMainpr=="PEDIDOS_MAK"){strSC_ID=document.getElementById("pd_bodega").value;}else{if(strNomMainpr=="PTO_VENTA"){strSC_ID=intSucDefa;}else{if(strNomMainpr=="vta_combo"){strSC_ID=intSucDefa;}}}strParams+="&SC_ID="+strSC_ID;strParams+="&EMP_ID="+strEMP_ID;var strTexto=d.getElementById("FAC_PROD1").value;var strCod="";var strDescripcion="";var strTalla="";var strColor="";var strMarca="";var strGrupo="";$.ajax({type:"POST",data:"&strTexto="+strTexto,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_PedidosMakProcs.jsp?id=28",success:function(datos){jQuery("#GRID_BACKORD").clearGridData();var lstXml=datos.getElementsByTagName("busqueda")[0];var lstprecio=lstXml.getElementsByTagName("busqueda_deta");for(var i=0;i<lstprecio.length;i++){var obj=lstprecio[i];strCod=obj.getAttribute("strCodigo");strDescripcion=obj.getAttribute("strDescripcion");strTalla="";strColor="";strMarca="";strGrupo="";}strCod=strCod.replace("#","");strCod=strCod.trim();strDescripcion=strDescripcion.replace("#","");strDescripcion=strDescripcion.trim();strTalla="";strColor="";strMarca="";strGrupo="";if(strCod!=""&&strCod!="0"&&strCod!=0){strParams+="&PR_CODIGO="+strCod.trim();}if(strDescripcion!=""&&strDescripcion!="0"&&strDescripcion!=0){strParams+="&PR_DESCRIPCIONCORTA="+strDescripcion;}if(strTalla!=""&&strTalla!="0"&&strTalla!=0&&strTalla!=" "){strParams+="&PR_CATEGORIA4="+strTalla;}if(strColor!=""&&strColor!="0"&&strColor!=0&&strColor!=" "){strParams+="&PR_CATEGORIA3="+strColor;}if(strMarca!=""&&strMarca!="0"&&strMarca!=0&&strMarca!=" "){strParams+="&PR_CATEGORIA1="+strMarca;}if(strGrupo!=""&&strGrupo!="0"&&strGrupo!=0&&strGrupo!=" "){strParams+="&PR_CATEGORIA9="+strGrupo;}var grid=jQuery("#PR_GRIDPROD");grid.setGridParam({url:"CIP_TablaOp.jsp?ID=5&opnOpt=GRID_PRODMAK&_search=true"+strParams+""});grid.setGridParam({sortname:"PR_CODIGO"}).trigger("reloadGrid");},error:function(objeto,quepaso,otroobj){alert(":pto9:"+objeto+" "+quepaso+" "+otroobj);$("#dialogWait").dialog("close");}});}