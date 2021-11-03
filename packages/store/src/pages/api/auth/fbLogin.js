// import
import fbLogin from './fb-login';

export default async (req, res) => {
  const { logger } = req;

  logger.warn('should use /api/auth/fb-login');
  await fbLogin(req, res);
};
