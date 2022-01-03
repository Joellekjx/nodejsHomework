import jwt from 'jsonwebtoken';

export const checkToken = (req, res, next) => {
	if (req.path.search('/login') === -1) {
		const token = req.headers['x-access-token'];
		if (!token) {
			res.status(401).send({ success: false, message: 'No token provided' });
		}

		jwt.verify(token, 'secret', (err, decoded) => {
			if (err) {
				console.log(err);
				res
					.status(403)
					.send({ success: false, message: 'Failed to authenticate token.' });
			}
		});
	}
	next();
};
