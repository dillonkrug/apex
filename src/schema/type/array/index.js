import { Schema } from '../../schema';

const defaultArrKey = (el, i) => i;

Schema.Type.array = {
	getPath: (schema, value, path) => {
		const [key, ...rest] = path;
		const elKey = schema.key || defaultArrKey;
		const targetEl = (value || []).find((el, i) => elKey(el, i) === key);
		return Schema.getPath(schema.element, targetEl, rest);
	},
	get: (schema, data, path) => {
		const [key, ...rest] = path;
		const elKey = schema.key || defaultArrKey;
		const targetEl = (data || []).find((el, i) => elKey(el, i) === key);
		return Schema.get(schema.element, targetEl, rest);
	},
	set: (schema, data, path, value) => {
		const [key, ...rest] = path;
		const elKey = schema.key || defaultArrKey;
		return data.map((el, i) => elKey(el, i) === key ? Schema.set(schema.element, el, rest, value) : el);
	},
	validate: {
		minSize: (minSize, data = []) => data.length >= minSize ? [] : [{
			message: `Cannot have fewer than ${ minSize } elements`
		}],
		maxSize: (maxSize, data = []) => data.length <= maxSize ? [] : [{
			message: `Cannot have more than ${ maxSize } elements`
		}],
		element: (element, data = []) => {
			return data
				.reduce((out, el, i) => {
					Schema
						.validate(element, el)
						.forEach(({ message, path = [] }) => {
							out.push({
								path: [i, ...path],
								message
							});
						});
					return out;
				}, []);
		},
		validate: (validate, data) => validate(data)
	}
};


