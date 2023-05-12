import { Router } from 'express';

import { companyController, companyValidator } from './index';
import { authorizeUser } from '@middlewares/authentication';

const router: Router = Router();

router.route('/add_company').post(authorizeUser, companyValidator.addCompany, companyController.addCompany);

export const companyRoutes = { path: '/company', router };
