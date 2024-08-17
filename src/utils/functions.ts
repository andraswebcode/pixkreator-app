function debounce<T extends (...args: any[]) => any>(
	func: T,
	wait: number
): (...args: Parameters<T>) => void {
	let timeout: ReturnType<typeof setTimeout> | undefined;

	return function (...args: Parameters<T>): void {
		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(() => {
			func.apply(this, args);
		}, wait);
	};
}

export { debounce };
