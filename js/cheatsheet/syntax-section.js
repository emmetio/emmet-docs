var syntaxSection = [
	{
		name: 'Child: >',
		value: [
			{
				name: 'nav>ul>li',
				value: '<nav>\n\t<ul>\n\t\t<li></li>\n\t</ul>\n</nav>'
			}
		]
	}, {
		name: 'Sibling: +',
		value: [
			{
				name: 'div+p+bq',
				value: '<div></div>\n<p></p>\n<blockquote></blockquote>'
			}
		]
	}, {
		name: 'Climb-up: ^',
		value: [
			{
				name: 'div+div>p>span+em^bq',
				value: '<div></div>\n<div>\n\t<p><span></span><em></em></p>\n\t<blockquote></blockquote>\n</div>'
			}, {
				name: 'div+div>p>span+em^^bq',
				value: '<div></div>\n<div>\n\t<p><span></span><em></em></p>\n</div>\n<blockquote></blockquote>'
			}
		]
	}, {
		name: 'Grouping: ()',
		value: [
			{
				name: 'div>(header>ul>li*2>a)+footer>p',
				value: '<div>\n\t<header>\n\t\t<ul>\n\t\t\t<li><a href=""></a></li>\n\t\t\t<li><a href=""></a></li>\n\t\t</ul>\n\t</header>\n\t<footer>\n\t\t<p></p>\n\t</footer>\n</div>'
			}, {
				name: '(div>dl>(dt+dd)*3)+footer>p',
				value: '<div>\n\t<dl>\n\t\t<dt></dt>\n\t\t<dd></dd>\n\t\t<dt></dt>\n\t\t<dd></dd>\n\t\t<dt></dt>\n\t\t<dd></dd>\n\t</dl>\n</div>\n<footer>\n\t<p></p>\n</footer>'
			}
		]
	}, {
		name: 'Multiplication: *',
		value: [
			{
				name: 'ul>li*5',
				value: '<ul>\n\t<li></li>\n\t<li></li>\n\t<li></li>\n\t<li></li>\n\t<li></li>\n</ul>'
			}
		]
	}, {
		name: 'Item numbering: $',
		value: [
			{
				name: 'ul>li.item$*5',
				value: '<ul>\n\t<li class="item1"></li>\n\t<li class="item2"></li>\n\t<li class="item3"></li>\n\t<li class="item4"></li>\n\t<li class="item5"></li>\n</ul>'
			}, {
				name: 'h$[title=item$]{Header $}*3',
				value: '<h1 title="item1">Header 1</h1>\n<h2 title="item2">Header 2</h2>\n<h3 title="item3">Header 3</h3>'
			}, {
				name: 'ul>li.item$$$*5',
				value: '<ul>\n\t<li class="item001"></li>\n\t<li class="item002"></li>\n\t<li class="item003"></li>\n\t<li class="item004"></li>\n\t<li class="item005"></li>\n</ul>'
			}, {
				name: 'ul>li.item$@-*5',
				value: '<ul>\n\t<li class="item5"></li>\n\t<li class="item4"></li>\n\t<li class="item3"></li>\n\t<li class="item2"></li>\n\t<li class="item1"></li>\n</ul>'
			}, {
				name: 'ul>li.item$@3*5',
				value: '<ul>\n\t<li class="item3"></li>\n\t<li class="item4"></li>\n\t<li class="item5"></li>\n\t<li class="item6"></li>\n\t<li class="item7"></li>\n</ul>'
			}
		]
	}, {
		name: 'ID and CLASS attributes',
		value: [
			{
				name: '#header',
				value: '<div id="header"></div>'
			}, {
				name: '.title',
				value: '<div class="title"></div>'
			}, {
				name: 'form#search.wide',
				value: '<form id="search" class="wide"></form>'
			}, {
				name: 'p.class1.class2.class3',
				value: '<p class="class1 class2 class3"></p>'
			}
		]
	}, {
		name: 'Custom attributes',
		value: [
			{
				name: 'p[title="Hello world"]',
				value: '<p title="Hello world"></p>'
			}, {
				name: 'td[rowspan=2 colspan=3 title]',
				value: '<td rowspan="2" colspan="3" title=""></td>'
			}, {
				name: '[a=\'value1\' b="value2"]',
				value: '<div a="value1" b="value2"></div>'
			}
		]
	}, {
		name: 'Text: {}',
		value: [
			{
				name: 'a{Click me}',
				value: '<a href="">Click me</a>'
			}, {
				name: 'p>{Click }+a{here}+{ to continue}',
				value: '<p>Click <a href="">here</a> to continue</p>'
			}
		]
	}, {
		name: 'Implicit tag names',
		value: [
			{
				name: '.class',
				value: '<div class="class"></div>'
			}, {
				name: 'em>.class',
				value: '<em><span class="class"></span></em>'
			}, {
				name: 'ul>.class',
				value: '<ul>\n\t<li class="class"></li>\n</ul>'
			}, {
				name: 'table>.row>.col',
				value: '<table>\n\t<tr class="row">\n\t\t<td class="col"></td>\n\t</tr>\n</table>'
			}
		]
	}
];
export default syntaxSection;