var xmlDoc;function crearObjetoXML(archivoXML){if(window.ActiveXObject){xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async=false;xmlDoc.load(archivoXML);}else{if(document.implementation&&document.implementation.createDocument){xmlDoc=document.implementation.createDocument("","",null);xmlDoc.load(archivoXML);alert("2");}else{alert("Su navegador no puede soportar este script");}}}function importXML(file){var xmlDoc;var moz=(typeof document.implementation!="undefined")&&(typeof document.implementation.createDocument!="undefined");var ie=(typeof window.ActiveXObject!="undefined");if(moz){xmlDoc=document.implementation.createDocument("","",null);}else{if(ie){xmlDoc=new ActiveXObject("Microsoft.XMLDOM");xmlDoc.async=false;while(xmlDoc.readyState!=4){}}}try{xmlDoc.async=false;xmlDoc.load(file);alert("xmlDoc is loaded, ready for use");return(xmlDoc);}catch(e){alert(e.message);return(null);}if(ie){}}