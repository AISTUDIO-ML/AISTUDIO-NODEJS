import Joi from 'joi';

import { validateSchema } from '@middlewares/validator';
import { JString } from '@validators/constant';

const JCompany = Joi.object({
	name: JString,
	address: JString,
	billing_address: JString,
});

export const companyValidator = {
	addCompany: validateSchema(JCompany, 'body'),
};
