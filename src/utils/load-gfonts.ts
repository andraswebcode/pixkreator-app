const loadGoogleFonts = (fonts: { family: string }[]) => {
	const head = document.head;

	fonts.forEach(({ family }) => {
		const formattedFamily = family.replace(/\s+/g, '+');
		const id = 'family_' + family.replace(/\s+/g, '_');
		const href = `https://fonts.googleapis.com/css?family=${formattedFamily}&display=swap`;

		if (!document.getElementById(id)) {
			const link = document.createElement('link');
			link.id = id;
			link.rel = 'stylesheet';
			link.href = href;
			head.appendChild(link);
		}
	});
};

export { loadGoogleFonts };
