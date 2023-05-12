import { Schema, model } from 'mongoose';

import { COMPANY_MODEL_NAME } from './index';
import { ICompany } from './company.interface';

const companySchema = new Schema<ICompany.Company>(
	{
		name: {
			type: Schema.Types.String,
			trim: true,
		},
		address: {
			type: Schema.Types.String,
			lowercase: true,
			trim: true,
		},
		billing_address: {
			type: Schema.Types.String,
			trim: true,
		},
		userId: {
			type: Schema.Types.ObjectId,
			ref: 'User',
			required: true,
		},
	},
	{
		timestamps: true,
		collection: COMPANY_MODEL_NAME,
	}
);

companySchema.methods.toJSON = function () {
	const { password, __v, createdAt, updatedAt, ...userObject } = this.toObject();
	return userObject;
};

export const Company = model(COMPANY_MODEL_NAME, companySchema);
