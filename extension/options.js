'use strict';
let dimRegExpInput;

document.addEventListener('DOMContentLoaded', () => {
	dimRegExpInput = document.querySelector('#dimRegExp');

	// Don't allow delimiters in RegExp string
	dimRegExpInput.addEventListener('input', () => {
		const value = dimRegExpInput.value;
		const nodelimiters = /^\/|\/$/;

		if (nodelimiters.test(value)) {
			dimRegExpInput.value = dimRegExpInput.value.replace(/^\/|\/$/, '');
		}
	});

	dimRegExpInput.addEventListener('change', saveOptions);

	restoreOptions();
});

function saveOptions() {
	const dimRegExp = dimRegExpInput.value;
	window.DimFilesOnGitHub.storage.set({dimRegExp});
}

function restoreOptions() {
	window.DimFilesOnGitHub.storage.get((err, items) => {
		if (err) {
			throw err;
		}

		dimRegExpInput.value = items.dimRegExp;
	});
}
