import crypto from 'crypto';

export const hashPassword = (password: string) => {
  const hash = crypto.createHmac('sha512', 'hunghao').update(password).digest("base64");
  const hashPassword = hash;
  return hashPassword;
}
