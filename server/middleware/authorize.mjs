export const authorize = (roles = [], access = []) => (req, res, next) => {
  if (roles.length && !roles.includes(req.user.role)) {
    return res.status(403).json({ error: "Forbidden: Insufficient role" });
  }
  if (
    access.length &&
    (!req.user.access || !access.every(a => req.user.access.includes(a)))
  ) {
    return res.status(403).json({ error: "Forbidden: Insufficient access" });
  }
  next();
};