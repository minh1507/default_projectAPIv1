import rateLimit from 'express-rate-limit'

export const auth = rateLimit({
	windowMs: 60 * 1000, 
	max: 5, 
	message:
		'Too many requests. Please wait 1 minute until the next request is allowed',
	standardHeaders: true, 
	legacyHeaders: false,
})

export const portal_trade = rateLimit({
	windowMs: 60 * 1000, 
	max: 1000, 
	message:
		'Too many requests. Please wait 1 minute until the next request is allowed',
	standardHeaders: true, 
	legacyHeaders: false,
})