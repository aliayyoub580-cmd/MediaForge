import crypto from 'crypto';

export function hashIp(ip: string): string {
  const salt = process.env.IP_HASH_SALT || 'mediaforge-salt-2024';
  return crypto.createHmac('sha256', salt).update(ip).digest('hex');
}

export function hashUrl(url: string): string {
  return crypto.createHash('sha256').update(url).digest('hex');
}
