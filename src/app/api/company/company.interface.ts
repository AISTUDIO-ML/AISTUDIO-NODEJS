import { Document, Types } from 'mongoose';

export namespace ICompany {
	export interface Company extends Document {
		name: string;
		address: string;
		billing_address: string;
		userId: Types.ObjectId;
	}
}
