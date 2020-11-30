//ProFun JS.
//Copyright TAOSMI.

	var $proFunVersion = [];		//Version de profun.
	var $elementMethods = {};		//Los metodos de elementos se guardan en esta coleccion.

//****************
//ProFun JS Core.
//****************

	$proFunVersion.push("ProFun JS Core v.1.0");

//Obtiene el tipo de objeto.
	function $type(obj) {
		if (obj.nodeType) {
			switch(obj.nodeType) {
				case 1: return "element"; break;
				case 3: return "textnode"; break;
				case 9: return "document"; break;
			}
		}
		if (obj.item && obj.length) return "collection";
		if (obj.nodeName) return obj.nodeName;
		if (obj.sort) return "array";
		return typeof(obj);
	}

//Comprueba si un elemento está definido.
	function $defined(obj) {
		if ((obj == undefined) || (obj == null)) return false;
		return true;
	}

//Comprueba si un elemento está Ok (definido y no está vacío).
	function $chk(obj) {
		if (!obj) return false;
		if (($type(obj) == "array") && (obj.length == 0)) return false;
		for (var prop in obj) break;
		if (!prop) return false;
		return true;
	}

//Obtiene el primer elemento Ok.
	function $pick() {
		for (var i=0,l=arguments.length; i<l; i++) {
			if ($chk(arguments[i])) return arguments[i];
		}
		return null;
	}

//Copia las propiedades del elemento origen al destino.
	function $extend(destiny, source) {
		if (!$defined(destiny) || !$defined(source)) return destiny;
		for (var prop in source) {
			if (destiny.prototype) destiny.prototype[prop] = source[prop];
			else destiny[prop] = source[prop];
		}
		return destiny;
	}

//Obtiene una copia del elemento.
	function $copy(obj) {
		switch($type(obj)) {
			case "object":
				var copyObj = new Object();
				for (var prop in obj) copyObj[prop] = $copy(obj[prop]);
			break;
			case "array":
				var copyObj = new Array();
				for (var i=0,l=obj.length; i<l; i++) copyObj[i] = $copy(obj[i]);
			break;
			default: var copyObj = obj;
		}
		return copyObj;
	}

//Obtiene un numero entre min y max aleatorio.
	function $random(min, max) {
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

//Obtiene el TimeStamp del sistema.
	function $timeStamp() {
		return new Date().getTime();
	}

//Obtiene la fecha actual del sistema. Se puede especificar un offset opcional.
	function $time(days) {
		days = days || 0;
		var date = new Date();
		date.setTime(date.getTime() + (days*24*3600*1000));
		return date;
	}

//Obtiene información sobre el navegador.
	function $engine() {
		return navigator.appName;
	}

//Obtiene información sobre el SO.
	function $platform() {
		return navigator.platform;
	}

//******************
//ProFun JS Native.
//******************

	$proFunVersion.push("ProFun JS Native v.1.0");

//********** ProFun JS Arrays **********

//Ejecuta la funcion a cada elemento del array.
	Array.prototype.$each = function(fHandler) {
		for (var i=0, l=this.length; i<l; i++) {
			fHandler(this[i],i);
		}
		return this;
	}

//Comprueba si la funcion se cumple para algun elemento del array.
	Array.prototype.$detect = function(fHandler) {
		for (var i=0, l=this.length; i<l; i++) {
			if (fHandler(this[i])) return true;
		}
		return false;
	}

//Obtiene un array con los elementos que cumplen la funcion.
	Array.prototype.$select = function(fHandler) {
		for (var i=0, result=[], l=this.length; i<l; i++) {
			if (fHandler(this[i])) result.push(this[i]);
		}
		return result;
	}

//Obtiene el elemento mayor. Opcional especificar una funcion evaluadora.
	Array.prototype.$max = function() {
		if (this.length == 0) return false;
		if (this.length == 1) return this[0];
		if (arguments.length == 1) {
			var f = arguments[0];
			for (var i=1, max=this[0], l=this.length; i<l; i++) {
				if (f(this[i]) > f(max)) max = this[i];
			}
			return max;
		}
		for (var i=1, max=this[0], l=this.length; i<l; i++) {
			if (this[i] > max) max = this[i];
		}
		return max;
	}

//Obtiene el elemento menor. Opcional especificar una funcion evaluadora.
	Array.prototype.$min = function() {
		if (this.length == 0) return false;
		if (this.length == 1) return this[0];
		if (arguments.length == 1) {
			var f = arguments[0];
			for (var i=1, min=this[0], l=this.length; i<l; i++) {
				if (f(this[i]) < f(min)) min = this[i];
			}
			return min;
		}
		for (var i=1, min=this[0], l=this.length; i<l; i++) {
			if (this[i] < min) min = this[i];
		}
		return min;
	}

//Obtiene el indice de un elemento.
	Array.prototype.$indexOf = function(obj) {
		for (var i=0, l=this.length; i<l; i++) {
			if (this[i] == obj) return i;
		}
		return false;
	}

//Obtiene un elemento aleatorio del array.
	Array.prototype.$getRandom = function() {
		return this[Math.floor(Math.random() * (this.length))];
	}

//Vacia el array.
	Array.prototype.$empty = function() {
		this.length = 0;
		return this;
	}

//Extiende el array con otro array.
	Array.prototype.$merge = function(array) {
		for (var i=0, l=array.length; i<l; i++) {
			this.push(array[i]);
		}
		return this;
	}

//Añade un elemento en caso de que no existe.
	Array.prototype.$add = function(obj) {
		if (this.$indexOf(obj) === false) this.push(obj);
		return this;
	}

//Borra un elemento del array.
	Array.prototype.$del = function(obj) {
		for (var i=0, l=this.length; i<l; i++) {
			if (this[i] == obj) this.splice(i,1);
		}
		return this;
	}

//********** ProFun JS Numbers **********

//Obtiene los metodos del objeto Math.
	$extend(Number, {
		abs:   function() { return Math.abs(this); },
		acos:  function() { return Math.acos(this); },
		asin:  function() { return Math.asin(this); },
		atan:  function() { return Math.atan(this); },
		atan2: function(x) { return Math.atan2(this,x); },
		ceil:  function() { return Math.ceil(this); },
		cos:   function() { return Math.cos(this); },
		exp:   function() { return Math.exp(this); },
		floor: function() { return Math.floor(this); },
		log:   function() { return Math.log(this); },
		max:   function(x) { return Math.max(this,x); },
		min:   function(x) { return Math.min(this,x); },
		pow:   function(x) { return Math.pow(this,x); },
		sin:   function() { return Math.sin(this); },
		sqrt:  function() { return Math.sqrt(this); },
		tan:   function() { return Math.tan(this); }
	});


//Obtiene el numero delimitado por min y max.
	Number.prototype.$limit = function(min,max) {
		if (this < min) return min;
		if (this > max) return max;
		return this;
	}

//Obtiene el valor entero de un numero.
	Number.prototype.$toInt = function(base) {
		return parseInt(this, (base || 10));
	}

//Obtiene el valor decimal de un numero.
	Number.prototype.$toFloat = function() {
		return parseFloat(this);
	}

//Obtiene la cadena de caracteres de un numero.
	Number.prototype.$toString = function() {
		return this + "";
	}

//********** ProFun JS Strings **********

//Obtiene el numero entero de la cadena. La base es opcional, por defecto 10.
	String.prototype.$toInt = function(base) {
		return parseInt(this,(base || 10));
	}

//Obtiene el numero con decimales de la cadena.
	String.prototype.$toFloat = function() {
		return parseFloat(this);
	}

//Obtiene la cadena sin espacios por delante ni por detras.
	String.prototype.$strip = function() {
	    return this.replace(/^\s+|\s+$/g, '');
	}

//Obtiene la cadena sin tags HTML.
	String.prototype.$stripTags = function() {
		return this.replace(/<\/?[^>]+>/gi, '');
	}

//Obtiene la cadena sin tags SCRIPTS.
	String.prototype.$stripScripts = function() {
		var start = 0, end;
		var txt = this;
		while ((start = txt.indexOf("<script",start)) != -1) {
			end = txt.indexOf("/script>", start);
			if (end == -1) txt = end = txt.length;
			txt = txt.substr(0, start) + txt.substr((end+8), txt.length);
		}
		return txt;
	}

//Obtiene la cadena truncada. La longitud es opcional, por defecto 25.
	String.prototype.$truncate = function(l) {
		l = l || 25;
		return this.substr(0, l-3) +"...";
	}

//Obtiene la cadena escapadando caracteres especiales.
	String.prototype.$escape = function() {
		var txt = "";
		for (var i=0, l=this.length; i<l; i++) {
			switch (this.charAt(i)) {
				case '<': txt += "<"; break;
				case '>': txt += ">"; break;
				case '&': txt += "&"; break;
				case '"': txt += """; break;
				case ' ': txt += " "; break;
				default : txt += this.charAt(i);
			}
		}
		return txt;
	}

//Obtiene la cadena desescapadando caracteres especiales.
	String.prototype.$unescape = function() {
		var i = 0, l = this.length;
		var txt = "";
		while (i < l) {
			if (this.charAt(i) == "&") {
				if (this.substr(i, 4) == "<") { txt += "<";	i = i + 3; }
				else if (this.substr(i, 4) == ">") { txt += ">";	i = i + 3; }
				else if (this.substr(i, 5) == "&") { txt += "&";	i = i + 4; }
				else if (this.substr(i, 6) == """) { txt += "\"";	i = i + 5; }
				else if (this.substr(i, 6) == " ") { txt += " ";	i = i + 5; }
			} else {
				txt += this.charAt(i);
			}
			i++;
		}
		return txt;
	}

//Comprueba si la cadena comienza por lo indicado.
	String.prototype.$startsWith = function(str) {
		return (this.indexOf(str) == 0);
	}

//Obtiene la cadena con la primera letra en mayusculas.
	String.prototype.$capitalize = function() {
		    return this.charAt(0).toUpperCase() + this.substring(1);
	}

//Elimina el fragmento especificado de la cadena actual.
	String.prototype.$erase = function(str) {
		return this.replace(new RegExp(str,"gi"),"");
	}

//*******************
//ProFun JS Cookies.
//*******************

	$proFunVersion.push("ProFun JS Cookies v.1.1");

//Constructor y Propiedades.
	function $Cookie(name) {
		this.name = name;
	}

//Metodos.
//Leer cookie.
	$Cookie.prototype.$read = function() {
		var cookie = document.cookie.match(this.name +'=([^;]*)');
		if (cookie) return cookie[1];
		return "";
	};

//Guardar cookie.
	$Cookie.prototype.$write = function(value, days, secure, domain, path) {
		secure = secure || false;
		domain = domain || document.domain;
		path = path || "/";
		var cookie = this.name +"="+ value +";";
		var date = $time(days);
		if (days) cookie += " expires="+ $time(days).toGMTString() +";";
		cookie += " path="+ path +";";			
		if (domain) cookie += " domain="+ domain +";";
		if (secure) cookie += " secure";
		document.cookie = cookie;
	};

//Borrar cookie.
	$Cookie.prototype.$erase = function() {
		this.value = "";
		this.days = -1;
		this.write();
	};

//***************
//ProFun JS DOM.
//***************

	$proFunVersion.push("ProFun DOM v.1.0.");

//Marca de objeto extendido por $. Se usa para evitar extender objetos varias veces.
	$elementMethods.$proFunObj = true;

//Obtiene el/los elementos con ids especificados.
	function $(obj) {
		if (arguments.length > 1) {
			for (var i=0, r=[], l=arguments.length; i<l; i++) {
				r[i] = ($type(arguments[i]=="string"))? document.getElementById(arguments[i]) : arguments[i];
				if (r[i] && !r[i].$proFunObj) r[i] = $extend(r[i], $elementMethods);
			}
			return r;
		}
		var extObj = ($type(obj)=="string")? document.getElementById(obj) : obj;
		if (extObj && !extObj.$proFunObj) $extend(extObj, $elementMethods);
		return extObj;
	}

//Obtiene el/los valores de los elementos con names especificados.
	function $V(obj) {
		if (arguments.length > 1) {
			for (var i=0, r=[], l=arguments.length; i<l; i++) {
				r[i] = ($type(arguments[i])=="string")? document.getElementById(arguments[i]).value : arguments[i].value;
			}
			return result;
		}
		return ($type(obj)=="string")? document.getElementById(obj).value : obj.value;
	}

//Obtiene el primer elemento con ese nombre.
	function $N(name) {
		return document.getElementsByName(name)[0];
	}

//Crea un elemento del tipo indicado.
	function $createElement(objType) {
		return $(document.createElement(objType));
	}

//Elimina el elemento.
	$elementMethods.$del = function() {
		this.parentNode.removeChild(this);
	};

//Comprueba si el elemento tiene elementos hijo.
	$elementMethods.$hasChild = function() {
		return (this.firstChild)? true : false;
	};

//Obtiene un hijo del elemento.
//pos (Opcional). top: primer hijo. bottom: ultimo hijo.
//tag (Opcional). Tipo de nodos: DIV, SPAN, etc.
	$elementMethods.$getChild = function(pos, tag) {
		pos = pos || "top";
		tag = tag || "";
		var obj = (pos=="top")? this.firstChild : this.lastChild;
		if (tag != "") {
	   	while ((obj) && (obj.nodeName != tag))
	   		obj = (pos=="top") ? obj.nextSibling : obj.previousSibling;
	   } else {
		  	while ((obj) && (obj.nodeType != 1))
	   		obj = (pos=="top") ? obj.nextSibling : obj.previousSibling;
	   }
		return (obj)? $(obj) : false;
	};

//Obtiene el elemento padre del elemento.
	$elementMethods.$getParent =  function() {
		return $(this.parentNode);
	};

//Obtiene el elemento siguiente o false si no tiene.
//tag (Opcional). Tipo de nodos: DIV, SPAN, etc.
	$elementMethods.$next = function(tag) {
		tag = tag || "";
		var obj = this.nextSibling;
		if (tag == "") {
			while ((obj) && (obj.nodeType != 1))
				obj = obj.nextSibling;
		} else {
			while ((obj) && (obj.nodeName != tag))
				obj = obj.nextSibling;
		}
		return (obj)? $(obj) : false;
	};

//Obtiene el elemento previo o false si no tiene.
//tag (Opcional). Tipo de nodos. p.ej. DIV, SPAN, etc.
	$elementMethods.$previous = function() {
		var tag = arguments[0] || "";
		var obj = this.previousSibling;
		if (tag == "") {
			while ((obj) && (obj.nodeType != 1))
				obj = obj.previousSibling;
		} else {
			while ((obj) && (obj.nodeName != tag))
				obj = obj.previousSibling;
		}
		return (obj)? $(obj) : false;
	};

//Inserta el elemento especificado como último hijo del elemento actual.
	$elementMethods.$addChild = function(obj) {
		this.appendChild(obj);
		return this;
	};

//Inserta el elemento especificado despues del elemento actual.
	$elementMethods.$addBrother = function(obj) {
		this.$getParent().appendChild(obj);
		return this;
	};

//Inserta el elemento especificado antes del elemento actual.
	$elementMethods.$addBrotherBefore = function(obj) {
		this.$getParent().insertBefore(obj, this);
		return this;
	};

//Inserta el elemento especificado despues del elemento actual.
	$elementMethods.$addBrotherAfter = function(obj) {
		return (this.$next())? this.$next().$addBrotherBefore(obj) : this.$addBrother(obj);
	}

//Actualiza el contenido HTML del elemento por el indicado.
	$elementMethods.$update = function(txt) {
		this.innerHTML = txt;
		return this;
	};

//Elimina los hijos del elemento.
	$elementMethods.$delChildrens = function() {
		this.innerHTML = "";
		return this;
	};

//Reemplaza el elemento actual por el indicado.
	$elementMethods.$replace = function(obj) {
		this.$getParent().replaceChild(obj, this);
		return this;
	}

//Clona el elemento actual. Si childs vale true clona todo su arbol.
	$elementMethods.$clone = function(childs) {
		return $(this.cloneNode(childs));
	}

//Asigna la clase especificada al elemento, sobreescribiendo las que habia.
	$elementMethods.$setClass = function(clas) {
		this.className = clas;
		return this;
	}

//Añade la clase especificada al elemento.
	$elementMethods.$addClass = function(clas) {
		if (!clas) return this;
		this.className += " "+clas;
		return this;
	}

//Elimina solo la clase especificada del elemento.
	$elementMethods.$delClass = function(clas) {
		if (!clas) return this;
		this.className = this.className.$erase(clas);
		return this;
	}

//******************
//ProFun JS Events.
//******************

	$proFunVersion.push("ProFun JS Events RC.1.0");

//Asigna el evento DOMLoaded con la funcion.
 	function $observeDOM(fHandle) {
		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", fHandle, false);
		} else {
			document.onreadystatechange = function() {
				if (document.readyState == "complete") fHandle();
			};
		}
	}

//Obtiene la lista de funciones asociada a un evento y objeto.
	$elementMethods.$getEventList = function() {
		return this.$eList;
	}

//Enlaza el evento de un objeto con una funcion.
	$elementMethods.$observe = function(eType, fHandle, fParams, objBind) {
		objBind = objBind || this;
		fParams = fParams || [];
		this.$eList = this.$eList || [];
		var fName = "bind" + eType + this.$eList.length;
		objBind[fName] = function(e) { return fHandle.apply(objBind, [e].$merge(fParams)); };
		if (this.addEventListener) {
			if (eType == "mousewheel") eType = "DOMMouseScroll";
			this.addEventListener(eType, objBind[fName], true);
		} else {
			this.attachEvent("on"+ eType, objBind[fName]);
		}
		this.$eList.$add({f:fHandle, fWrap:objBind[fName], eType:eType});
	}

//Desenlaza el evento de un objeto de la funcion.
	$elementMethods.$stopObserve = function(eType, fHandler, objBind) {
		objBind = objBind || this;
		var fWrap = this.$eList.$select(function(item) { return (item.f == fHandler); });
		if (!fWrap) alert("Profun JS error stopping Observartion.");
		fWrap = fWrap[0].fWrap;
		if (this.removeEventListener) {
			if (eType == "mousewheel") eType = "DOMMouseScroll";
			this.removeEventListener(eType, fWrap, true);
		} else {
			this.detachEvent("on"+eType, fWrap);
		}
		this.$eList.$del({f:fHandler, fWrap:fWrap, eType:eType});
		fWrap = null;
	}

//Desenlaza todos los eventos de un objeto.
	$elementMethods.$stopAllObserve = function() {
		for (var i=(this.$eList.length-1); i>=0; i--) {
			this.$stopObserve(this.$eList[i].eType, this.$eList[i].f);
		}
		this.$eList.$empty();
	}

//Lanza el evento indicado del objeto.
	$elementMethods.$fireEvent = function(eType) {
		if (this.dispatchEvent) {
			if (eType == "mousewheel") eType = "DOMMouseScroll";
			var evt = document.createEvent("HtmlEvents");
			evt.initEvent(eType, true, true);
			this.dispatchEvent(evt);
		} else {
			this.fireEvent("on"+eType);
		}
	}

//Detiene el evento. Disponible solo dentro de la funcion que lanza el evento.
	function $stopEvent(e) {
		if (e.preventDefault) e.preventDefault();
		else e.returnValue = false;		
		if (e.stopPropagation) e.stopPropagation;
		else e.cancelBubble = true;
	}

//Detiene la propagacion del evento. Disponible soloo dentro de la funcion que lanza el evento.
	function $stopEventPropagation(e) {
		if (e.stopPropagation) e.stopPropagation;
		else e.cancelBubble = true;
	}

//Obtiene el tipo de evento. Disponible solo dentro de la funcion que lanza el evento.
	function $getEventType(e) {
		return e.type;
	}

//Obtiene la tecla que se ha pulsado. Disponible solo dentro de la funcion que lanza el evento.
	function $getEventKey(e) {
		return e.which || e.keyCode;
	}

//Obtiene el elemento que tiene asociado el evento. Disponible solo dentro de la funcion que lanza el evento.
	function $getEventSource(e) {
		return e.srcElement || e.target;
	}

//Obtiene el elemento desde donde viene el raton (mouseover). Disponible solo dentro de la funcion que lanza el evento.
	function $getEventFromTarget(e) {
		return e.relatedTarget || e.fromElement;
	}

//Obtiene el elemento al que fue el raton (mouseout). Disponible solo dentro de la funcion que lanza el evento.
	function $getEventToTarget(e) {
		return e.relatedTarget || e.toElement;
	}

//Obtiene la direccion de la rueda. Disponible solo dentro de la funcion que lanza el evento.
	function $getEventWheel(e) {
		if (e.wheelDelta) return e.wheelDelta;
		if (e.detail) return e.detail;
		return 0;
	}

//Obtiene la coord. X del raton en las que se produjo el evento. Disponible solo dentro de la funcion que lanza el evento.
	function $getMouseX(e) {
		var scrollX = $getScrollX();
		if (e.pageX) return e.pageX + scrollX;
		if (e.clientX) return e.clientX + scrollX;
		return 0;
	}

//Obtiene la coord. Y del raton en las que se produjo el evento. Disponible solo dentro de la funcion que lanza el evento.
	function $getMouseY(e) {
		var scrollY = $getScrollY();
		if (e.pageY) return e.pageY;
		if (e.clientY) return e.clientY + scrollY;
		return 0;
	}

//Obtiene el scroll en X del navegador.
	function $getScrollX() {
		if (window.pageXOffset) return window.pageXOffset;
		if (document.body && document.body.scrollLeft)
			return document.body.scrollLeft;
		if (document.documentElement && document.documentElement.scrollLeft)
			return document.documentElement.scrollLeft;
		return 0;
	}

//Obtiene el scroll en Y del navegador.
	function $getScrollY() {
		if (window.pageYOffset) return window.pageYOffset;
		if (document.body && document.body.scrollTop)
			return document.body.scrollTop;
		if (document.documentElement && document.documentElement.scrollTop)
			return document.documentElement.scrollTop;
		return 0;
	}

//****************
//ProFun JS AJAX.
//****************

	$proFunVersion.push("ProFun JS AJAX v.1.0");

//Constructor del objeto AJAX.
	function $Ajax(uri, fHandler, method) {
		this.uri = uri || "";
		this.fHandler = fHandler || null;
		this.method = method || "GET";
		this.xmlHttp = false;
		try { this.xmlHttp = new XMLHttpRequest(); } catch(e) {}
		if (!this.xmlHttp) try { this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP"); } catch(e) {}
		if (!this.xmlHttp) try { this.xmlHttp = new ActiveXObject("Microsoft.XMLHTTP"); } catch(e) {}
		if (!this.xmlHttp) try { this.xmlHttp = new ActiveXObject("Msxml2.XMLHTTP.4.0"); } catch(e) {}
	}

//Envia la petición.
	$Ajax.prototype.$send = function(uri, fHandler, method) {
		this.uri = uri || this.uri;
		this.fHandler = fHandler || this.fHandler;
		this.method = method || this.method;
		if (this.xmlHttp) {
			this.xmlHttp.onreadystatechange = this.fHandler;
			this.xmlHttp.open(this.method, this.uri, true);
			this.xmlHttp.send(null);
		} else {
			alert("Profun Error: No Ajax supported");
		}
	}

//**********************
//ProFun JS XMLParser.
//**********************

	$proFunVersion.push("ProFun JS XMLParser v.1.0");

//Obtiene el arbol xml respecto del texto.
	function $xmlParser(txt) {
		xmlObj = false;
		if (ActiveXObject("Microsoft.XMLDOM")) {
			xmlObj = new ActiveXObject("Microsoft.XMLDOM");
			xmlObj.async = false;
			xmlObj.loadXML(txt);
		}
		if (DOMParser) {
			xmlParser = new DOMParser();
			xmlObj = xmlParser.parserFromString(txt,"text/xml");
		}
		return xmlObj;
	}

//**********************
//ProFun JS showList.
//**********************

	$proFunVersion.push("ProFun JS showList v.1.0");

//Constructor y propiedades.
	function showList(lst) {
		this.ck = null;
		this.lst = lst;
		this.last = null;
		this.rollBack = false;
	}

//Metodos.
//Establece el control mendiante una cookie para que solo muestre una vez cada elemento.
	showList.prototype.setShowOnceCookie = function(ck) {
		this.ck = new $Cookie(ck);
	}
//Establece la propiedad rollBack para que permita una lista cíclica.
	showList.prototype.setRollBack = function(value) {
		this.rollBack = value;
	}
//Borra un elemento de la lista.
	showList.prototype.erase = function() {
		
	}
//Muestra el primer elemento de la lista disponible.
	showList.prototype.show = function() {
		var d = new Date();
		var fecAct = d.getDate() + "/" + (d.getMonth() + 1) + "/" + d.getFullYear();
		this.last = (this.last)? this.last + 1 : 0;
		var ckValue = (this.ck)? this.ck.$read() : null;
		while (this.last < this.lst.length) {
			if (!this.lst[this.last].start) this.lst[this.last].start = this.lst[this.last].end = fecAct;
			if (this.lst[this.last].showable() && (!this.ck || (ckValue.indexOf(this.lst[this.last].id) < 0)) && (fecAct > this.lst[this.last].start) && (fecAct < this.lst[this.last].end)) {
				//if ((ckValue) && (ckValue.indexOf(this.lst[this.last].id) >= 0)) continue;
				//load(this.lst[this.last].id);
				alert("Cargando "+this.last);
				if ((this.ck) && (this.lst[this.last].remind) && ($(this.lst[this.last].remind).checked))
					this.ck.$write((ckValue + this.lst[this.last].id + ","));
				//Reminder!
				return true;
			}
			this.last++;
			if ((this.rollBack) && (this.last == this.lst.length)) this.last = 0;
		}
		return false;
	}