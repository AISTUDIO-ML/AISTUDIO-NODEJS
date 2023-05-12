import { NextFunction, Response } from 'express';
import { companyService } from './index';
import { ICompany } from './company.interface';

/**
 * A class that handles company-related operations.
 * @class
 */
class CompanyController {
	addCompany = async (req: Express.RequestWithData<ICompany.Company>, res: Response, _next: NextFunction) => {
		try {
			const newCompany = await companyService.addCompany(req);
			return res.locals.success(newCompany);
		} catch (error) {
			return res.locals.error(400, error.message);
		}
	};
}

export const companyController = new CompanyController();
