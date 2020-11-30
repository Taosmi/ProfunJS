//ProFun JS Effects.
//Copyright TAOSMI.

	var $proFunJSEversion = [];		//Versiones de profunJS Effects.

//*******************
//ProFun JS Effects.
//*******************

	$proFunJSEversion.push("ProFun JS Effects Core RC.1.0");

//Muestra un elemento.
	function $show(id) {
		$(id).style.visibility = "visible";
	}

//Oculta un elemento.
	function $hide(id) {
		$(id).style.visibility = "hidden";
	}

//Obtiene la posicion X de un elemento.
	function $getX(obj) {
		var x = 0;
		obj = $(obj);
		while (obj != null) {
			x += obj.offsetLeft;
			obj = obj.offsetParent;
		}
		return x;
	}

//Obtiene la posicion Y de un elemento.
	function $getY(obj) {
		var y = 0;
		obj = $(obj);
		while (obj != null) {
			y += obj.offsetTop;
			obj = obj.offsetParent;
		}
		return y;
	}

//Obtiene la anchura del elemento.
	function $getWidth(obj) {
		return $(obj).offsetWidth;
	}

//Obtiene la altura del elelemto.
	function $getHeight(obj) {
		return $(obj).offsetHeight;
	}

//Realiza el fundido a opaco de un objeto en el tiempo determinado.
	function $fadeIn(id, opEnd, duration) {
		var opStart = $getOpacity(id);
		var numSteps = (opEnd - opStart);
		var timeStep = (duration / numSteps).abs();
		$(id).$fading = $timeStamp();
		for (var i=1; i<numSteps; i++)
			setTimeout("$fading('"+id+"',"+(opStart+i)+",'"+$(id).$fading+"')", i * timeStep);
	}

//Realiza el fundido a transparente de un objeto en el tiempo determinado.
	function $fadeOut(id, opStart, duration) {
		var opEnd = $getOpacity(id);
		var numSteps = (opEnd - opStart);
		var timeStep = (duration / numSteps).abs();
		$(id).$fading = $timeStamp();
		for (var i=0; i<=numSteps; i++)
			setTimeout("$fading('"+id+"',"+(opEnd-i)+",'"+$(id).$fading+"')", i * timeStep);
	}

//Comprueba si el fundido todavia es aplicable antes de realizarlo.
	function $fading(id, value, timeStamp) {
		if ($(id).$fading != timeStamp) return true;
		if (value == 0) $hide(id);
		$setOpacity(id, value);
	}

//Obtiene la opacidad de un objeto (0-100).
	function $getOpacity(id) {
		return $(id).style.opacity * 100;
	}

//Establece la opacidad de un objeto al valor determinado (0-100).
	function $setOpacity(id, value) {
		$(id).style.opacity = (value/100);
		$(id).style.filter = "alpha(opacity="+value+")";
	}

//Redondear los cantos de una capa.
	function $round(id, color, backColor) {
		
	}
//*******************************
//ProFun JS Effects Tip Bubbles.
//*******************************

	$proFunJSEversion.push("ProFun JS Effects Tip Bubbles v.1.0");

//Constructor del Tip Bubble.
	function $TipBubble(linkId, txtId, tipClass, txtClass) {
		this.tip = $createElement("DIV").$setClass(tipClass);
		this.tip.id = linkId + "Tip";
		this.tip.linkId = linkId;
		this.tip.style.left = this.tip.style.top = "0px";
		this.tipTxt = $createElement("DIV").$setClass(txtClass);
		this.tipTxt.id = linkId + "TipTxt";
		this.tipTxt.innerHTML = $(txtId).innerHTML || "";
		this.tip.$addChild(this.tipTxt);
		$(linkId).$addBrotherAfter(this.tip);
		$setOpacity(this.tip.id, 0);
		$hide(this.tip.id);
	}

//Configura la duracion del Tip Bubble.
	$TipBubble.prototype.$setTipTime = function(tipTime) {
		this.tip.tipTime = tipTime;
		return this;
	}

//Configura la posicion del Tip Bubble.
	$TipBubble.prototype.$setPosition = function(posType) {
		this.tip.posType = posType;
		return this;
	}

//Configura el tipo de eventos que visualizara el Tip Bubble.
	$TipBubble.prototype.$setEvents = function(eventType, fadeTime) {
		this.tip.eventType = eventType;
		this.tip.fadeTime = fadeTime || 500;
		switch (eventType) {
			case "click": $(this.tip.linkId).$observe("click", this.$show, [], this);
							  break;
			case "hover": $(this.tip.linkId).$observe("mouseover", this.$show, [], this);
							  $(this.tip.linkId).$observe("mouseout", this.$hide, [], this);
							  break;
			case "none" : break;
			default     : alert("Error $setEvents of $TipBubble. The eventType doesn't exist.");
		}
		return this;
	}

//Calcula la posicion del Tip Bubble segun la configuracion.
	$TipBubble.prototype.$getPosition = function() {
		switch (this.tip.posType) {
			case "top":		this.tip.style.top = ($getY(this.tip.linkId) - $getHeight(this.tip) - 5) + "px";
								this.tip.style.left = ($getX(this.tip.linkId) + ($getWidth(this.tip.linkId)/2).abs() - ($getWidth(this.tip)/2).abs()) + "px";
								break;
			case "right":	this.tip.style.top = ($getY(this.tip.linkId) - ($getHeight(this.tip)/2).abs() + 5) + "px";
								this.tip.style.left = ($getX(this.tip.linkId) + $getWidth(this.tip.linkId) + 10) + "px";
								break;
			case "left":	this.tip.style.top = ($getY(this.tip.linkId) - ($getHeight(this.tip)/2).abs() + 5) + "px";
								this.tip.style.left = ($getX(this.tip.linkId) - $getWidth(this.tip) - 10) + "px";
								break;
			case "bottom":	this.tip.style.top = ($getY(this.tip.linkId) + $getHeight(this.tip.linkId) + 5) + "px";
								this.tip.style.left = ($getX(this.tip.linkId) + ($getWidth(this.tip.linkId)/2).abs() - ($getWidth(this.tip)/2).abs()) + "px";
								break;
			default:			alert("Tip position type unknown.");
			return this;
		}
	}

//Muestra el Tip Bubble.
	$TipBubble.prototype.$show = function(e) {
		this.$getPosition();
		$show(this.tip.id);
		$fadeIn(this.tip.id, 100, this.tip.fadeTime);
		if (this.tip.tipTime)
			setTimeout("$fadeOut('"+this.tip.id+"', 0, "+this.tip.fadeTime+")", this.tip.tipTime);
	}

//Oculta el Tip Bubble.
	$TipBubble.prototype.$hide = function(e) {
		$fadeOut(this.tip.id, 0, this.tip.fadeTime);
	}

//*******************************
//ProFun JS Effects Validations.
//*******************************

	$proFunJSEversion.push("ProFun JS Effects Validations v.1.0");

//Valida una cadena de texto. Solo permite caracteres, numeros, espacios, _ y -
	function $chkText(txt) {
		if (!$chk(txt)) return false;
		if (txt.match(/[^a-zA-Z0-9ñÑ\s_-]/)) return false;
		return true;
	}

//Valida una dirección de correo electrónico.
	function $chkEmail(txt) {
		if (txt.match(/^(\w)+(\.(\w)+)*@(\w)+\.(\w)+(\.(\w)+)*/)) return true;
		return false;
	}

//Valida el teléfono móvil.
	function $chkMobile(num) {
		if (txt.match(/^6(\d){8}$/)) return true;
		return false;
	}

//Valida si es un número.
	function $chkNumber(num) {
		if (isNaN(num)) return false;
		return true;
	}

//Valida un importe: 1234,4000 o 1234.4000
	function $chkImport(num) {
		if (num.match(/^(\d)+((,|\.)(\d){1,4}){0,1}$/)) return true;
		return false;
	}

//Valida si un select tiene una opcion distinta que "".
	function $chkSelect(txt) {
		return $chk(txt);
	}

//Valida si un conjunto de radio buttons tiene seleccion.
	function $chkRadio(obj) {
		var status = false;
		for (var i=0,l=obj.radios.length; i<l; i++) {
			status = status || $(obj.radios[i]).checked;
			if (status) break;
		}
		return status;
	}

//************************************
//ProFun JS Effects Form Validations.
//************************************

	$proFunJSEversion.push("ProFun JS Effects Form Validations v.1.0");

//Clase Field.
//Constructor de un campo.
	function $Field(type, id, required, eTxt, eClass, typeLink, idLink, radios) {
		this.type = type;
		this.id = id;
		this.required = required || false;
		this.eTxt = eTxt || "";
		this.eClass = eClass || "";
		this.typeLink = typeLink || null;
		this.idLink = idLink || null;
		this.radios = radios || null;
		this.ok = true;
	}

//Valida el campo teniendo en cuenta el tipo y la obligatoriedad.
	$Field.prototype.$chkField = function() {
		if (this.idLink) {
			this.required = $chk($V(this.idLink));
			if (!this.required) $(this.id).value = "";
			if (this.required && this.typeLink) this.type = this.typeLink[$(this.idLink).selectedIndex-1];
		}
		if (!this.required && !$chk($V(this.id))) return true;
		switch(this.type) {
			case "text"   : if ($chkText($V(this.id))) return true; break;
			case "email"  : if ($chkEmail($V(this.id))) return true; break;
			case "mobile" : if ($chkMobile($V(this.id))) return true; break;
			case "number" : if ($chkNumber($V(this.id))) return true; break;
			case "money"  : if ($chkImport($V(this.id))) return true; break;
			case "account": return true; break;
			case "select" : if ($chkSelect($V(this.id))) return true; break;
			case "radios" : if ($chkRadio(this)) return true; break;
			default: alert("Profun JS Error\nChecking field "+ this.id +". The type "+this.type+" does not exist.");
		}
		return false;
	}

//Crea el icono de error del campo.
	$Field.prototype.$createErrorIcon = function() {
		var div = $createElement("SPAN");
		div.style.visibility = "hidden";
		this.error = div.id = this.id + "Error";
		var icon = $createElement("IMG");
		icon.src = "imgs/error.png";
		icon.id = this.id + "ErrorIcon";
		icon.alt = "Error";
		div.$addChild(icon);
		$(this.id).$addBrother(div);
	}

//Crea el icono de error del campo.
	$Field.prototype.$showErrorIcon = function() {
		if (this.error) {
			$(this.error).style.visibility = "visible";
			$(this.error).style.display = "inline";
		}
	}

//Elimina el icono de error del campo.
	$Field.prototype.$hideErrorIcon = function() {
		if (this.error) {
			$(this.error).style.visibility = "hidden";
			$(this.error).style.display = "none";
		}
	}

//Valida el campo y activa el aspecto correspondiente.
 	$Field.prototype.$valide = function() {
		this.ok = this.$chkField();
		if (this.ok) {
			$(this.id).$delClass(this.eClass);
			this.$hideErrorIcon();
		} else {
			$(this.id).$addClass(this.eClass);
			this.$showErrorIcon();
		}
		return this.ok;
	}

//Clase Fields.
//Constructor de un set de campos.
	function $Fields(fields) {
		this.fields = {};
		for (var i=0, l=fields.length; i<l; i++) {
			this.fields[fields[i].id] = new $Field(fields[i].type, fields[i].id, fields[i].required, fields[i].eTxt, fields[i].eClass, fields[i].typeLink, fields[i].idLink, fields[i].radios);
		}
	}

//Añade un campo.
	$Fields.prototype.$add = function(type, id, required, eTxt, eClass, typeLink, idLink, radios) {
		this.fields[id] = new Field(type, id, required, eTxt, eClass, typeLink, idLink, radios);
	}

//Borra un campo.
	$Fields.prototype.$del = function(id) {
		delete this.fields[id];
	}

//Valida todos los campos.
	$Fields.prototype.$valide = function() {
		var status = true;
		for (var field in this.fields) {
			status = (this.fields[field].$valide() && status);
		}
		if (!status && this.formWarning) {
			this.formWarning.$show();
		}
		return status;
	}

//Activa la autoValidacion.
	$Fields.prototype.$setActiveChk = function() {
		for (var field in this.fields) {
			this.fields[field].$createErrorIcon();
			if ($(field).type == "text") {
				$(field).$observe("keyup", this.fields[field].$valide, null, this.fields[field]);
				if (this.fields[field].idLink)
					$(this.fields[field].idLink).$observe("change", this.fields[field].$valide, null, this.fields[field]);
			} else if (this.fields[field].type == "radios") {
				for (var i=0,l=this.fields[field].radios.length; i<l; i++) {
					$(this.fields[field].radios[i]).$observe("change", this.fields[field].$valide, null, this.fields[field]);
				}
			} else {
				$(field).$observe("change", this.fields[field].$valide, null, this.fields[field]);				
			}
		}
	}

//Activa los mensajes de errores por Tips.
	$Fields.prototype.$setTipError = function(type, pos, tipClass, tipTxtClass, fadeTime) {
		for (var field in this.fields) {
			this.fields[field].tip = new $TipBubble(this.fields[field].error, this.fields[field].eTxt, tipClass, tipTxtClass);
			this.fields[field].tip.$setEvents("hover", fadeTime).$setPosition(pos);
		}
	}

//Activa el error global al intentar enviar el formulario con errores.
	$Fields.prototype.$setGlobalWarning = function(linkId, txtId, pos, tipClass, tipTxtClass, tipTime, fadeTime) {
		this.formWarning = new $TipBubble(linkId, txtId, tipClass, tipTxtClass);
		this.formWarning.$setEvents("none", fadeTime).$setPosition(pos).$setTipTime(tipTime);
	}

//**************************
//ProFun JS Effects Tables.
//**************************

	$proFunJSEversion.push("ProFun JS Effects Tables v.1.0");

//Constructor del tipo TableFX.
	function $TableFX(id) {
		this.id = id;
	}

//Configura las opciones visuales de la tabla.
	$TableFX.prototype.$setVisuals = function(params) {
		this.alternate = params.alternate || null;
		this.hover = params.hover || null;
		this.click = params.click || null;
		this.chkboxCell = params.chkboxCell;
		this.maxSelects = params.maxSelects;
		this.sortClass  = params.sortClass || null;
		this.rowsSelected = [];
	}

//Configura las opciones para el ordenado de la tabla.
	$TableFX.prototype.$setSort = function(array) {
		this.sortList = array;
		this.sortSet = true;
		this.sortReady = false;
		this.sortCol = null;
	}

//Obtiene el primer tbody de la tabla.
	$TableFX.prototype.$getBody = function() {
		return $($(this.id).tBodies[0]);
	}

//Obtiene el numero de filas de la tabla.
	$TableFX.prototype.$getNumRows = function() {
		return this.$getBody().rows.length;
	}

//Obtiene el numero de columnas de la tabla.
	$TableFX.prototype.$getNumCols = function() {
		return this.$getBody().rows[0].cells.length;
	}

//Obtiene la fila cabecera de la tabla.
	$TableFX.prototype.$getHead = function(col) {
		return $($(this.id).tHead.rows[0].cells[col]);
	}

//Obtiene la fila indicada de la tabla (coleccion).
	$TableFX.prototype.$getRow = function(row) {
		return $(this.$getBody().rows[row]);
	}

//Obtiene el contenido de la columna indicada (array).
	$TableFX.prototype.$getCol = function(col) {
		for (var i=0,r=[],l=this.$getNumRows(); i<l; i++) {
			r.push(this.$getRow(i).cells[col].innerHTML);
		}
		return r;
	}

//Obtiene de todas las filas el indice y el contenido de la columna indicada (array).
	$TableFX.prototype.$getIdCol = function(row) {
		for (var i=0,r=[],l=this.$getNumRows(); i<l; i++) {
			r.push({ id:i, txt:this.$getRow(i).cells[row].innerHTML});
		}
		return r;
	}

//Funciones para controlar la lista de filas seleccionadas.

//Obtiene el objeto checkbox de la fila especificada.
	$TableFX.prototype.$getChkbox = function(row) {
		return this.$getRow(row).cells[(this.chkboxCell)].getElementsByTagName("INPUT")[0];
	}

//Selecciona la columna indicada.
	$TableFX.prototype.$selectRow = function(row) {
		if (this.rowsSelected.length < this.maxSelects) {
			this.$getRow(row).$addClass(this.click);
			if ($defined(this.chkboxCell)) {
				this.$getChkbox(row).checked = true;
				this.rowsSelected.$add(this.$getChkbox(row).id);
			}
		}
	}

//Deselecciona la columna indicada.
	$TableFX.prototype.$unselectRow = function(row) {
		this.$getRow(row).$delClass(this.click);
		if ($defined(this.chkboxCell)) {
			this.rowsSelected.$del(this.$getChkbox(row).id);
			this.$getChkbox(row).checked = false;
		}
	}

//Vacia el array de seleccion.
	$TableFX.prototype.$delSelected = function() {
		this.rowsSelected.$empty();
	}

//Obtiene un array con los ids de los checkbox seleccionados.
	$TableFX.prototype.$getSelected = function() {
		return this.rowsSelected;
	}

//Funciones para los eventos de visualizacion.
	function $rowHoverOn(e, table) {
		this.$addClass(table.hover);
	}
	function $rowHoverOff(e, table) {
		this.$delClass(table.hover);
	}
	function $rowClick(e, table) {
		var row = this.rowIndex - 1;
		if (table.rowsSelected.$indexOf(table.$getChkbox(row).id) === false) {
			table.$selectRow(row);
		} else {
			table.$unselectRow(row);
		}
	}

//Funciones para la ordenacion.

//Enlaza las cabeceras de las columnas con los eventos de ordenacion.
	$TableFX.prototype.$sortable = function() {
		this.sortReady = true;
		for (var i=0,l=this.sortList.length; i<l; i++) {
			$($(this.id).tHead.rows[0].cells[this.sortList[i].col]).$observe("click", $colSort, [i, this]);
		}
	}

//Funcion para los eventos de ordenado.
	function $colSort(e, item, table) {
		if (table.sortCol) table.$getHead(table.sortCol).$delClass(table.sortClass);
		table.sortCol = table.sortList[item].col;
		table.$getHead(table.sortCol).$addClass(table.sortClass);
		for (var i=0,l=table.$getNumRows(); i<l; i++)
			table.$getRow(i).$stopAllObserve();
		table.$sortBy(table.sortList[item].col, table.sortList[item].type);
		table.$upgrate();
	}

//Ordena la tabla segun la columna indicada.
	$TableFX.prototype.$sortBy = function(col, sortType) {
		var clone;
		var fragObj = document.createDocumentFragment();
		switch(sortType) {
			case "text":  var column = this.$getIdCol(col).sort(txtSort); break;
			case "date":  var column = this.$getIdCol(col).sort(dateSort); break;
			case "money": var column = this.$getIdCol(col).sort(moneySort); break;
		}
		for (var i=0,l=column.length; i<l; i++) {
			clone = this.$getRow(column[i].id).$clone(true);
			$(fragObj).$addChild(clone);
		}
		var newBody = $createElement("tbody").$addChild(fragObj);
		this.$getBody().$replace(newBody);
	}

//Funciones de ordenacion para texto.
	function txtSort(a,b) {
		if (a.txt == b.txt) return 0;
		if (a.txt < b.txt) return -1;
		return 1;
	}
	function moneySort(a,b) {
		if (a.txt.indexOf(",")) a.txt = a.txt.replace(".","").replace(",",".");
		if (b.txt.indexOf(",")) b.txt = b.txt.replace(".","").replace(",",".");
		return (a.txt.$toFloat() - b.txt.$toFloat());
	}
	function dateSort(a,b) {
		var aa = a.txt.split("-"); if (aa[2] > "70") aa[2] = "."+aa[2];
		var bb = b.txt.split("-"); if (bb[2] > "70") bb[2] = "."+bb[2];
		if (aa[2] != bb[2]) return (aa[2] - bb[2]);
		if (aa[1] != bb[1]) return (aa[1] - bb[1]);
		if (aa[0] != bb[0]) return (aa[0] - bb[0]);
		return 0;
	}

//Aplica las mejoras a la tabla segun la configuracion.
	$TableFX.prototype.$upgrate = function() {
		var table = this;
		if (table.sortSet && !table.sortReady) table.$sortable();
		for (var i=0,l=table.$getNumRows(); i<l; i++) {
			if ($chk(table.alternate)) {
				if ((i%2)) table.$getRow(i).$addClass(table.alternate);
				else table.$getRow(i).$delClass(table.alternate);
			}
			if ($chk(table.hover)) {
				table.$getRow(i).$observe("mouseover", $rowHoverOn, [table]);
				table.$getRow(i).$observe("mouseout", $rowHoverOff, [table]);
			}
			if ($chk(table.click)) {
				table.$getRow(i).$observe("click", $rowClick, [table]);
				if ($defined(table.chkboxCell)) {
					if (table.$getSelected().$indexOf(table.$getChkbox(i).id) === false) {
						table.$unselectRow(i);
					} else {
						table.$selectRow(i);
					}
				}
				
			}
		}
	}