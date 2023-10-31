import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;

export const generateToken = (payload, options) => {
  return jwt.sign(payload, JWT_SECRET, { ...options });
};

export const verifyToken = (token) => {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return {
      expired: false,
      decoded,
    };
  } catch (e) {
    return {
      expired: e.message === 'jwt expired',
      decoded: null,
    };
  }
};
