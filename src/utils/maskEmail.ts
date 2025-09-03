export const maskEmail = (email: string): string => {
  const [localPart, domain] = email.split('@');
  if (localPart.length <= 3) {
    return `${localPart[0]}***@${domain}`;
  }

  const visiblePart = localPart.slice(0, 3);
  return `${visiblePart}***@${domain}`;
};
