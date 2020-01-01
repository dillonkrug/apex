import { Schema } from '../../schema';


Schema.Type.number = {
	validate: {
		required: (required, data) => (!required || typeof data === 'number') ? [] : [{
			message: 'is required'
		}],
		min: (min, data) => data >= min ? [] : [{
			message: `cannot be less than ${ min }`
		}],
		max: (max, data) => data <= max ? [] : [{
			message: `cannot be greater than ${ max }`
		}],
		validate: (validate, data) => validate(data)
	}
};


