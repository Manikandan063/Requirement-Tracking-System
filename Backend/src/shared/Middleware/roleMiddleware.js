import fs from 'fs';

export const roleMiddleware = (roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      const debugInfo = `403 Forbidden! User role: ${req.user?.role}, Allowed roles: ${roles}, URL: ${req.originalUrl}\n`;
      fs.appendFileSync('debug.log', debugInfo);
      console.log('403 Forbidden! User role:', req.user?.role, 'Allowed roles:', roles, 'URL:', req.originalUrl);
      return res.status(403).json({ success: false, message: 'Forbidden' });
    }
    next();
  };
};
