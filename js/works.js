/*--------------------------------

	Cards style by Kick-Off, under MIT License.

    
    MIT License

    Copyright (c) 2020 byHumans

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

-------------------------------- */

const util = UIkit.util;
const search = util.$('.search-fld');
const searchVal = util.$('.search-filter');
const searchValAll = util.$('.search-filter-all');
const searchValNone = util.$('.search-filter-none');
const filterBtn = util.$$('li[data-uk-filter-control] a');
const formEl = util.$('#search-form');
let debounce,searchTerm, value;

// when write on field
util.on(search, 'keyup', () => {
	clearTimeout(debounce);
	
	debounce = setTimeout(() => {
		// get input value and convert to lower case
		value = search.value.toLowerCase();

		if (value.length) {
			searchTerm = '[data-tags*="' + value + '"]';
			util.attr(searchVal, 'data-uk-filter-control', searchTerm);
			// click on hidden link that gives 0 results, allow to click again filter link
			searchValNone.click();
			// click hidden link that filter the search
			searchVal.click();
		} else {
			// if search field is empty
			searchTerm = '[data-tags*=""]';
			// empty attribute
			util.attr(searchVal, 'data-uk-filter-control', searchTerm);
			// click hidden show all link
			searchValAll.click();
		}
	}, 300);
});

// prevent send form on press enter
util.on(formEl, 'keypress', e => {
	const key = e.charCode || e.keyCode || 0;
	if (key == 13) {
		e.preventDefault();
		console.log('Prevent submit on press enter');
	}
});

// empty field and attribute on click filter button
util.on(filterBtn, 'click', () => {
	if (search.value.length) {
		// empty field
		search.value = '';
		searchTerm = '[data-tags*=""]';
		// empty attribute
		util.attr(searchVal, 'data-uk-filter-control', searchTerm);
		console.log('empty field and attribute');
	}
});

util.on(searchValNone, 'click', e => {
	e.preventDefault();
})