function vta_estadisticasdecobranza(){}function BotonImprimirEC(){OpnOpt("PES_COB",null,"dialogProv",false,false,true);}function detallesCobranza(){itemIdCob=0;var moneda=document.getElementById("DC_MONEDA").value;var convertido=document.getElementById("DC_CONVERTIDO").value;var fechaI=document.getElementById("DC_FECHA_I").value;var fechaF=document.getElementById("DC_FECHA_F").value;var bodega=document.getElementById("DC_BODEGAS").value;var empresa=document.getElementById("DC_EMPRESA").value;var active=$("#tabsEST_COBR").tabs("option","active");var strPost="";strPost+="DC_MONEDA="+moneda;strPost+="&DC_CONVERTIDO="+convertido;strPost+="&DC_FECHA_I="+fechaI;strPost+="&DC_FECHA_F="+fechaF;strPost+="&DC_BODEGAS="+bodega;strPost+="&DC_EMPRESA="+empresa;$("#dialogWait").dialog("open");if(active==0){$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_ReportesGlobales.jsp?id=13",success:function(datos){jQuery("#DC_GRID").clearGridData();var objsc=datos.getElementsByTagName("DetalleCobranza")[0];var lstProds=objsc.getElementsByTagName("Pago");var monto=0;for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];var datarow={GDC_COBRO:obj.getAttribute("Pago"),GDC_FECHA:obj.getAttribute("Fecha"),GDC_CLIENTE:obj.getAttribute("Cliente"),GDC_FORMA_DE_PAGO:obj.getAttribute("FormadePago"),GDC_DOCUMENTO:obj.getAttribute("Documento"),GDC_MONTO:obj.getAttribute("Monto"),GDC_BANCO:obj.getAttribute("Banco")};monto+=parseFloat(obj.getAttribute("Monto"));itemIdCob++;jQuery("#DC_GRID").addRowData(itemIdCob,datarow,"last");}jQuery("#DC_GRID").footerData("set",{GDC_COBRO:"Suma:",GDC_MONTO:monto});$("#dialogWait").dialog("close");},error:function(){jQuery("#DC_GRID").clearGridData();alert("No hay productos con esas caracteristicas");$("#dialogWait").dialog("close");}});}else{$.ajax({type:"POST",data:strPost,scriptCharset:"utf-8",contentType:"application/x-www-form-urlencoded;charset=utf-8",cache:false,dataType:"xml",url:"ERP_ReportesGlobales.jsp?id=14",success:function(datos){jQuery("#CNI_GRID").clearGridData();var objsc=datos.getElementsByTagName("CobroNoIdentificado")[0];var lstProds=objsc.getElementsByTagName("Pago");var monto=0;for(var i=0;i<lstProds.length;i++){var obj=lstProds[i];var datarow={GCNI_BANCO:obj.getAttribute("Banco"),GCNI_FECHA:obj.getAttribute("Fecha"),GCNI_CONCEPTO:obj.getAttribute("Concepto"),GCNI_DEPOSITO:obj.getAttribute("Deposito"),GCNI_BENEFICIARIO:obj.getAttribute("Beneficiario")};monto+=parseFloat(obj.getAttribute("Deposito"));itemIdCob++;jQuery("#CNI_GRID").addRowData(itemIdCob,datarow,"last");}jQuery("#CNI_GRID").footerData("set",{GCNI_COBRO:"Suma:",GCNI_MONTO:monto});$("#dialogWait").dialog("close");},error:function(){jQuery("#CNI_GRID").clearGridData();alert("No hay productos con esas caracteristicas");$("#dialogWait").dialog("close");}});}}function ImpEstadisticasCobranza(frmt){var moneda=document.getElementById("DC_MONEDA").value;var convertido=document.getElementById("DC_CONVERTIDO").value;var fechaI=document.getElementById("DC_FECHA_I").value;var fechaF=document.getElementById("DC_FECHA_F").value;var bodega=document.getElementById("DC_BODEGAS").value;var empresa=document.getElementById("DC_EMPRESA").value;var active=$("#tabsEST_COBR").tabs("option","active");var strPost="";strPost+="&DC_MONEDA="+moneda;strPost+="&DC_CONVERTIDO="+convertido;strPost+="&DC_FECHA_I="+fechaI;strPost+="&DC_FECHA_F="+fechaF;strPost+="&DC_BODEGAS="+bodega;strPost+="&DC_EMPRESA="+empresa;if(active==0){if(frmt==1){Abrir_Link("ERP_ReportesGlobales.jsp?id=30&boton_1=PDF"+strPost,500,600,0,0);}else{Abrir_Link("ERP_ReportesGlobales.jsp?id=30&boton_1=XLS"+strPost,500,600,0,0);}}else{if(frmt==1){Abrir_Link("ERP_ReportesGlobales.jsp?id=31&boton_1=PDF"+strPost,500,600,0,0);}else{Abrir_Link("ERP_ReportesGlobales.jsp?id=31&boton_1=XLS"+strPost,500,600,0,0);}}$("#dialogProv").dialog("close");}