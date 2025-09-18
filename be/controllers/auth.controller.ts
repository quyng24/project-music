import bcrypt from 'bcryptjs';
import type {Request, Response} from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/user.model.ts';

interface AuthRequest extends Request {
  user?: {
    id: string;
    role?: string;
  };
}

export const register = async (req: Request, res: Response) => {
    try {
      const { name, email, password, role } = req.body;
      const existingUser = await User.findOne({ email });
      if (existingUser)return res.status(400).json({ message: "Email đã tồn tại" });
      const hashedPassword = await bcrypt.hash(password, 10);
      const newUser = await User.create({name, email, password: hashedPassword, role: role || "user"});
      res.status(201).json({ message: "Đăng ký thành công", user: newUser });
    } catch (err: any) {
      res.status(500).json({ message: err.message });
    }
}

export const login = async (req: Request, res: Response) => {
  try {
    const {email, password} = req.body;
    const user = await User.findOne({email});
    if(!user) return res.status(400).json({message: 'Email không đúng'});
    const isMatch = await bcrypt.compare(password, user.password);
    if(!isMatch) return res.status(400).json({message: 'Sai mật khẩu'});
    const token = jwt.sign({id: user._id, role: user.role}, process.env.SECRET_KEY as string, {expiresIn: "1h"});
    res.cookie("token", token, {httpOnly: true, secure: false, sameSite: "strict", maxAge: 60 * 60 * 1000});
    res.json({message: 'Đăng nhập thành công', user: {id: user._id, name: user.name, email: user.email, role: user.role}});
  } catch (error: any) {
    res.status(500).json({message: error.message});
  }
}

export const tokenInfoUser = async (req: AuthRequest, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ message: 'Unauthorized' });
    const user = await User.findById(req.user.id).select("-password");
    if(!user) return res.status(404).json({message: 'Không tìm thấy người dùng'});
    res.json(user);
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
}

export const logout = async (req: Request, res: Response) => {
  res.clearCookie('token');
  res.json({message: 'Dăng xuất thành công'});
}