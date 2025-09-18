import jwt from 'jsonwebtoken';
import type { Request, Response, NextFunction } from 'express';

interface JwtPayload {
  id: string;
  role: string;
  iat?: number;
  exp?: number;
}

interface AuthRequest extends Request {
  user?: JwtPayload;
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
    const token = req.cookies?.token || req.headers.authorization?.split(" ")[1];
    if(!token) return res.status(401).json({message: 'Không có token'});
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY as string) as JwtPayload;
      req.user = decoded;
      next();
    } catch {
      return res.status(403).json({ message: "Token không hợp lệ" });
    }
}