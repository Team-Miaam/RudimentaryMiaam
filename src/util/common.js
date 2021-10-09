const cloneArray = (arr) => {
	const arrClone = [];
	arr.forEach((element) => {
		arrClone.push(element.clone());
	});

	return arrClone;
};

export { cloneArray };