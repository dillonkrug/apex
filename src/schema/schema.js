
export const Schema = {
	resolve (schema, data) {
		return schema;
	},
	type (schema) {
		if (!Schema.Type[schema.type]) {
			throw new Error(`unknown schema type ${ schema.type }`);
		}
		return Schema.Type[schema.type];
	},
	validate (schema, data) {
		schema = Schema.resolve(schema, data);
		const schemaType = Schema.type(schema);
		const validators = schemaType.validate;
		return Object
			.keys(validators)
			.filter(key => (key in schema))
			.reduce((out, key) => out.concat(validators[key](schema[key], data)), []);
	},
	getPath: (schema, value, path) => {
		schema = Schema.resolve(schema, value);
		if (path.length === 0) {
			return { schema, value };
		}
		return Schema.type(schema).getPath(schema, value, path);
	},
	get: (schema, data, path) => {
		schema = Schema.resolve(schema, data);
		if (path.length === 0) {
			return data;
		}
		return Schema.type(schema).get(schema, data, path);
	},
	set: (schema, data, path, value) => {
		schema = Schema.resolve(schema, data);
		if (path.length === 0) {
			return value;
		}
		return Schema.type(schema).set(schema, data, path, value);
	},
	Type: {}
};

