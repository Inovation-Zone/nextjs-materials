import crypto from 'crypto';

function hashPassword(password: string) {
  const hash = crypto.createHmac('sha512', 'hunghao').update(password).digest("base64");
  const hashPassword = hash;
  return hashPassword;
}

export {
  hashPassword
}