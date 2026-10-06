import QRCode from 'qrcode';

/** QR-code als inline SVG (transparante achtergrond). */
export function qrSvg(text: string, color = '#1c1a18') {
  return QRCode.toString(text, { type: 'svg', margin: 0, errorCorrectionLevel: 'M', color: { dark: color, light: '#0000' } });
}
