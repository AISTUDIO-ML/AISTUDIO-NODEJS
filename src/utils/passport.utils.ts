import passport from 'passport';
import { VerifyCallback, Strategy as googleStrategy } from 'passport-google-oauth2';
import { Strategy as githubStrategy } from 'passport-github2';
import { OIDCStrategy } from 'passport-azure-ad';
import { Request } from 'express';
import { config } from '@config/env';

passport.use(
	new googleStrategy(
		{
			clientID: config.passport.google.clientID,
			clientSecret: config.passport.google.clientSecret,
			callbackURL: 'http://localhost:9000/v1/hello',
			passReqToCallback: true,
			scope: ['email', 'profile'],
		},
		async (request: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
			try {
				const user = {
					refreshToken,
					accessToken,
					profile,
				};
				return done(null, user);
			} catch (error) {
				console.log('Error here =>', error);
			}
		}
	)
);

passport.use(
	new githubStrategy(
		{
			clientID: config.passport.github.clientID,
			clientSecret: config.passport.github.clientSecret,
			callbackURL: 'http://localhost:9000/v1/hello',
			passReqToCallback: true,
		},
		async (request: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback) => {
			try {
				console.log({ profile });
				return done(null, profile);
			} catch (error) {
				console.log(error);
			}
		}
	)
);

const tenantId = 'f8cdef31-a31e-4b4a-93e4-5f571e91255a';
passport.use(
	new OIDCStrategy(
		{
			clientID: '69be974e-16f6-4a76-b16c-52f84cf2497e',
			clientSecret: 'c564d3cf-4933-456f-a2f9-646a7ecb53a3',
			passReqToCallback: true,
			redirectUrl: 'http://localhost:9000/v1/hello',
			responseType: 'code',
			responseMode: 'form_post',
			scope: ['openid', 'profile', 'email'],
			allowHttpForRedirectUrl: true,
			identityMetadata: `https://login.microsoftonline.com/${tenantId}/v2.0/.well-known/openid-configuration`,
		},
		async (request: Request, accessToken: string, refreshToken: string, profile: {}, done: VerifyCallback) => {
			try {
				console.log({ profile });
				return done(null, profile);
			} catch (error) {
				console.log(error);
			}
		}
	)
);

passport.serializeUser((profile, done) => {
	return done(null, profile);
});

passport.deserializeUser((profile, done) => {
	// @ts-ignore
	return done(null, profile);
});
