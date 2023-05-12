import { Company } from './index';

class CompanyService {
	addCompany = async (req: any) => {
		const addCompany = await Company.create({ ...req.data, userId: req.user.id });
		return addCompany;
	};
}

export const companyService = new CompanyService();
