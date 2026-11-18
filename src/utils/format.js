export function formatPrice(amount) {
  return `₱${amount.toLocaleString('en-PH')}`;
}

export function formatStorage(gb) {
  return gb >= 1024 ? `${gb / 1024} TB` : `${gb} GB`;
}

export function osLabel(os) {
  return os === 'mac' ? 'macOS' : 'Windows';
}
