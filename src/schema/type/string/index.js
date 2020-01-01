import { Schema } from '../../schema';


Schema.Type.string = {
	validate: {
		required: (required, data) => (!required || !!data) ? [] : [{
			message: 'is required'
		}],
		validate: (validate, data) => validate(data)
	}
};


