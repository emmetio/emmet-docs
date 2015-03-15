var escapeMap = {
	'&': '&amp;',
	'<': '&lt;',
	'>': '&gt;',
	'"': '&quot;',
	"'": '&#x27;',
	'`': '&#x60;'
};

export function extend(obj, ...args) {
	args.forEach(a => {
		a && Object.keys(a).forEach(key => obj[key] = a[key]);
	});
	return obj;
}

export function removeElem(elem) {
	if (elem && elem.parentNode) {
		elem.parentNode.removeChild(elem);
	}
}

export function toArray(obj, ix = 0) {
	return Array.prototype.slice.call(obj, ix);
}

export function querySelectorAll(sel, context=document) {
	return toArray(context.querySelectorAll(sel));
}

export function toDom(html) {
	var div = document.createElement('div');
	div.innerHTML = html;

	var df = document.createDocumentFragment();
	while (div.firstChild) {
		df.appendChild(div.firstChild);
	}

	return df.childNodes.length > 1 ? df : df.removeChild(df.firstChild);
}

export function template(tmpl, data) {
	var fn = data => tmpl.replace(/<%([-=])?\s*([\w\-]+)\s*%>/g, (str, op, key) => data[key.trim()]);
	return data ? fn(data) : fn;
}

export function delegate(elem, event, sel, fn) {
	elem.addEventListener(event, function(evt) {
		var elem = closest(evt.target, sel);
		if (elem) {
			fn.call(elem, evt);
		}
	});
}

export function closest(elem, sel) {
	while (elem && elem !== document) {
		if (matchesSelector(elem, sel)) {
			return elem;
		}
		elem = elem.parentNode;
	}
}

export function matchesSelector(elem, sel) {
	var found = null;
	['matches', 'webkitMatchesSelector', 'mozMatchesSelector', 'msMatchesSelector', 'oMatchesSelector'].some(name => {
		if (name in elem) {
			found = elem[name](sel);
			return true;
		}
	});

	if (found === null) {
		// no native `matches` method, use a shim
		let matches = (elem.document || elem.ownerDocument).querySelectorAll(sel);
		let i = 0;
  
		while (matches[i] && matches[i] !== elem) {
			i++;
		}
		found = matches[i] ? true : false;
	}

	return found;
}

export function sortBy(arr, key) {
	return arr.map((value, index) => {
		return {
			value: value,
			index: index,
			criteria: value[key]
		};
	})
	.sort((left, right) => {
		var a = left.criteria;
		var b = right.criteria;
		if (a !== b) {
			if (a > b || a === void 0) return 1;
			if (a < b || b === void 0) return -1;
		}
		return left.index - right.index;
	})
	.map(obj => obj.value);
}

var createEscaper = function(map) {
	var escaper = function(match) {
		return map[match];
	};

 
	var source = '(?:' + Object.keys(map).join('|') + ')';
	var testRegexp = RegExp(source);
	var replaceRegexp = RegExp(source, 'g');
	return function(string) {
		string = string == null ? '' : '' + string;
		return testRegexp.test(string) ? string.replace(replaceRegexp, escaper) : string;
	};
};
export var escape = createEscaper(escapeMap);