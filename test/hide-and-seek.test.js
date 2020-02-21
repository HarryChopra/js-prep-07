// Test conversion
const fs = require('fs');
const path = require('path');
const html = fs.readFileSync(path.resolve(__dirname, '../hide-and-seek.html'), 'utf8');

describe('index', () => {
	beforeEach(() => {
		document.documentElement.innerHTML = html.toString();
	});
	afterEach(() => {
		// restore the original func after test
		jest.resetModules();
	});
	describe('getFirstSelector(selector)', () => {
		test('returns the first element that matches the selector', () => {
			expect(getFirstSelector('div').id).toEqual('nested');
			expect(getFirstSelector('.ranked-list')).toEqual(
				document.querySelector('.ranked-list')
			);
		});
	});

	describe('nestedTarget()', () => {
		test('pulls a .target out of #nested', () => {
			expect(nestedTarget()).toEqual(document.querySelector('#nested .target'));
		});
	});

	describe('deepestChild()', () => {
		test('returns the most deeply nested child in #grand-node', () => {
			console.log(deepestChild().innerHTML);
			expect(deepestChild()).toEqual(document.querySelector('#grand-node div div div div'));
		});
	});

	describe('increaseRankBy(n)', () => {
		test('increases ranks in .ranked-list by n', () => {
			increaseRankBy(3);

			const rankedLists = document.querySelectorAll('.ranked-list');
			const firstList = rankedLists[0];
			const secondList = rankedLists[1];

			let children = firstList.children;
			let start = 1;

			expect(children.length).toEqual(2);
			for (let i = 0, l = children.length; i < l; i++) {
				expect(parseInt(children[i].innerHTML)).toEqual(start + i + 3);
			}

			children = secondList.children;
			start = 12;

			expect(children.length).toEqual(3);
			for (let i = 0, l = children.length; i < l; i++) {
				expect(parseInt(children[i].innerHTML)).toEqual(start - i + 3);
			}
		});
	});
});
