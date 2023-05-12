import { NextFunction, Request, Response, Router } from 'express';
import { apiMiddleware } from '@src/middlewares/responseHandler/apiMiddleware';
import { Logger } from '@config/logger';
import { metrics } from '@config/monitoring';
import passport from 'passport';

import { adminRoutes } from './admin';
import { userRoutes } from './user';
import { companyRoutes } from './company';

const logger = new Logger();

const router: Router = Router();

router.use(apiMiddleware);

router.use(userRoutes.path, userRoutes.router);
router.use(adminRoutes.path, adminRoutes.router);
router.use(companyRoutes.path, companyRoutes.router);

/**
 * Get "hello world" message.
 *
 * @swagger
 * /hello:
 *   get:
 *     description: Get "Hello World"
 *     tags: [General]
 *     responses:
 *       200:
 *         description: Hello World.
 *       500:
 *         description: Error while getting message.
 */
router
	.route('/hello')
	.get(
		passport.authenticate('google', { successRedirect: '/v1/any', failureRedirect: '/login', scope: ['profile', 'email'] }),
		(req: Request, res: Response, next: NextFunction) => {
			try {
				return res.locals.success('Hello World');
			} catch (error) {
				next(error);
			}
		}
	);

router.route('/any').get((req: Request, res: Response, next: NextFunction) => {
	return res.send('Its here');
});

router.route('/app_metrics').get(metrics);

router.use((_req: Request, res: Response, _next: NextFunction) => {
	logger.error('Route not found');
	res.locals.error(404, 'Route not found');
});

export const apiV1Routes = { path: '/v1', router };
