// export function checkName(value: string) {
//   const regex = /[\p{L} ]/gu;

//   if (!value || value.length < 2) return false;
//   if (value.match(regex)?.length !== value.length) return false;

//   return true;
// }

export function checkUsername(value: string) {
  if (!value || value.length < 2) return false;
  return true;
}

export function checkEmail(value: string) {
  const regex = /[a-z0-9.]/gi;

  if (!value) return false;
  if (value.match(/@/g)?.length !== 1) return false;
  const [root, domain] = value.split("@");

  //Checking the root
  if (root.match(regex)?.length !== root.length) return false;
  if (root.startsWith(".") || root.endsWith(".")) return false;

  const regexDots = /\.{2,}/;
  if (regexDots.test(root)) return false;

  //Checking domain
  if (domain.match(/[.]/g)?.length !== 1) return false;
  const [initial, com] = domain.split(".");

  if (!initial) return false;
  if (!com.endsWith("com")) return false;

  return true;
}

export function checkPassword(value: string, reValue: string) {
  const upper = /[A-Z]/.test(value);
  const lower = /[a-z]/.test(value);
  const number = /[0-9]/.test(value);
  const special = /[!@#$%^&*(),.?":{}|<>]/.test(value);
  const length = value.length >= 8 ? true : false;
  const equal = value === reValue;

  if (upper && lower && number && special && equal && length) return true;
  return false;
}
