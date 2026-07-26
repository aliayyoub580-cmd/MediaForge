import QRCode from 'qrcode';

export async function generateQRCode(url: string): Promise<string> {
  return QRCode.toDataURL(url, {
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: '#6366f1', light: '#ffffff' },
    width: 300,
  });
}
