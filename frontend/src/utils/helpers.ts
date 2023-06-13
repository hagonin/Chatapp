export const formatPhone = (phone: string) => {
  return phone.replace(/-|(|)/g, '').split(' ').join('');
};
