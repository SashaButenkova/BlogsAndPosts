import { NextFunction, Request, Response } from 'express'
import { body, validationResult } from 'express-validator'

export const inputValidationMiddleware = (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const errors = validationResult(req)
	if (!errors.isEmpty()) {
		res.send(400).json({ errors: errors.array() })
	} else {
		next()
	}
}