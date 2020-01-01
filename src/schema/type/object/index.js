import { Schema } from '../../schema';


Schema.Type.object = {
	getPath: (schema, value, path) => {
		const [key, ...rest] = path;
		return Schema.getPath(schema.props[key], (value || {})[key], rest);
	},
	get: (schema, data, path) => {
		const [key, ...rest] = path;
		return Schema.get(schema.props[key], (data || {})[key], rest);
	},
	set: (schema, data, path, value) => {
		const [key, ...rest] = path;
		return {
			...data,
			[key]: Schema.set(schema.props[key], (data || {})[key], rest, value)
		};
	},
	validate: {
		props: (props, data) => {
			return Object
				.keys(props)
				.reduce((out, key) => {
					Schema
						.validate(props[key], data[key])
						.forEach(({ message, path = [] }) => {
							out.push({
								path: [key, ...path],
								message
							});
						});
					return out;
				}, []);
		},
		validate: (validate, data) => validate(data)
	}
};


