'use strict';
const $ = document.querySelector.bind(document);

let dimRegExp;

function dimFiles() {
	if (!inRootView()) {
		return;
	}

	const rows = document.querySelectorAll('.files tr');
	let i = 0;

	for (const el of rows) {
		if (el.querySelector('.content a')) {
			const fileName = el.querySelector('td.content a').innerText;

			if (dimRegExp && dimRegExp.test(fileName)) {
				el.classList.add('dimmed');
			}
		} else if (++i === 1) {
			// remove top border
			el.classList.add('first');
		}
	}
}

function inRootView() {
	return !$('tr.up-tree');
}

document.addEventListener('DOMContentLoaded', () => {
	dimFiles();

	const container = $('#js-repo-pjax-container');

	if (!container) {
		return;
	}

	new MutationObserver(dimFiles).observe(container, {childList: true});

	window.DimFilesOnGitHub.storage.get((err, items) => {
		if (err) {
			throw err;
		}

		dimRegExp = items.dimRegExp === '' ? undefined : new RegExp(items.dimRegExp, 'i');

		window.gitHubInjection(window, dimFiles);
	});
});
