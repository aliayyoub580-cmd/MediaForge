import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { prisma } from '../database/prisma';
import { JwtPayload } from '../types';

const JWT_SECRET = process.env.JWT_SECRET || 'fallback-secret';
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || '7d';

export async function loginAdmin(email: string, password: string) {
  const admin = await prisma.adminUser.findUnique({ where: { email } });
  if (!admin) throw new Error('Invalid credentials');

  const valid = await bcrypt.compare(password, admin.password);
  if (!valid) throw new Error('Invalid credentials');

  const payload: JwtPayload = { id: admin.id, email: admin.email, role: admin.role };
  const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN } as jwt.SignOptions);
  return { token, admin: { id: admin.id, email: admin.email, name: admin.name, role: admin.role } };
}

export async function seedAdminUser() {
  const existing = await prisma.adminUser.findFirst();
  if (existing) return;

  const password = process.env.ADMIN_PASSWORD || 'changeme123';
  const hashed = await bcrypt.hash(password, 12);
  await prisma.adminUser.create({
    data: {
      email: process.env.ADMIN_EMAIL || 'admin@media-forge-sage.vercel.app',
      password: hashed,
      name: 'Admin',
      role: 'admin',
    },
  });
}
