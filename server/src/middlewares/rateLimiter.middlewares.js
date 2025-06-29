import express from 'express'
import rateLimit from 'express-rate-limit'

export const registerRateLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 minutes
	max: 10,
	message: {
		errorMessage:
			"Too many register attempts. Please try again after 20 minutes.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});
export const loginRateLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 minutes
	max: 5,
	message: {
		errorMessage:
			"Too many login attempts. Please try again after 20 minutes.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});
export const forgotPassRateLimiter = rateLimit({
	windowMs: 20 * 60 * 1000, // 20 minutes
	max: 3,
	message: {
		errorMessage:
			"Too many attempts. Please try again after 20 minutes.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});
export const resetPassRateLimiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 5,
	message: {
		errorMessage:
			"Too many attempts. Please try again after 20 minutes.",
	},
	standardHeaders: true,
	legacyHeaders: false,
});