function applyClassProp(classFrom, propFrom, classTo, propTo) {
	Object.defineProperty(
		classTo.prototype,
		propTo,
		Object.getOwnPropertyDescriptor(classFrom.prototype, propFrom)
	);
}

function applyClassProps(classFrom, props = [], classTo, blacklist = false) {
	for (const prop of props) {
		if(props.includes(prop) === blacklist) continue;
		applyClassProp(classFrom, prop, classTo, prop);
	}
}

function applyPreCallProp(obj, prop, func) {
	const oldFunc = obj[prop];
	obj[prop] = function(...args) {
		func.call(obj, ...args);
		return oldFunc.call(obj, ...args);
	}
}

function applyPostCallProp(obj, prop, func) {
	const oldFunc = obj[prop];
	obj[prop] = function(...args) {
		const result = oldFunc.call(obj, ...args);
		return func.call(obj, result, ...args);
	}
}

function applyAsyncPreCallProp(obj, prop, func) {
	const oldFunc = obj[prop];
	obj[prop] = async function(...args) {
		await func.call(obj, ...args);
		return await oldFunc.call(obj, ...args);
	}
}

function applyAsyncPostCallProp(obj, prop, func) {
	const oldFunc = obj[prop];
	obj[prop] = async function(...args) {
		const result = await oldFunc.call(obj, ...args);
		return await func.call(obj, result, ...args);
	}
}

module.exports = {
	applyClassProp,
	applyClassProps,
	applyPreCallProp,
	applyPostCallProp,
	applyAsyncPreCallProp,
	applyAsyncPostCallProp
};
