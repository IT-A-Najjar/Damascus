import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { serialize } from 'cookie';

// بيانات مستخدمين افتراضية
const users = [
  { email: 'admin@example.com', password: '$2a$10$EwqP8u3TOy2rZnq/7E1nZOKcsu1Efy6HQFXnC7vkp6NNLoNrZJf/O', role: 'admin' }, // كلمة المرور: admin123
];

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const { email, password } = req.body;

    const user = users.find((u) => u.email === email);
    if (!user) {
      return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ error: 'البريد الإلكتروني أو كلمة المرور غير صحيحة' });
    }

    const token = jwt.sign({ email: user.email, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    res.setHeader(
      'Set-Cookie',
      serialize('authToken', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        path: '/',
      })
    );

    return res.status(200).json({ message: 'تم تسجيل الدخول بنجاح' });
  }

  res.setHeader('Allow', ['POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
