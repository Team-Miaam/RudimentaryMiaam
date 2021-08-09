const resolvePath = (basePath, targetPath) => {
	const basePathDecomposed = basePath.split('/');
	const targetPathDecomposed = targetPath.split('/');
	if (basePathDecomposed[basePathDecomposed.length - 1].includes('.')) {
		basePathDecomposed.pop();
	}
	for (let i = 0; i < targetPathDecomposed.length; i += 1) {
		const path = targetPathDecomposed[i];
		if (path === '..') {
			basePathDecomposed.pop();
			targetPathDecomposed.splice(i, 1);
			i -= 1;
		} else if (path === '.') {
			targetPathDecomposed.splice(i, 1);
			i -= 1;
		}
	}

	const resolvedPath = basePathDecomposed.concat(targetPathDecomposed).join('/');
	return resolvedPath;
};

const getFileName = (path) => {
	const pathDecomposed = path.split('/');
	return pathDecomposed[pathDecomposed.length - 1];
};

const getFileNameWithoutExtension = (path) => getFileName(path).split('.')[0];

export { resolvePath, getFileName, getFileNameWithoutExtension };
