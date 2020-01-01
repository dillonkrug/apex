import { Schema } from '../../schema';


Schema.Type.ref = {
	validate: {
		required: (required, data) => (!required || !!data) ? [] : [{
			message: 'is required'
		}],
		validate: (validate, data) => validate(data)
	}
};


