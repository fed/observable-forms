export default function isEmail(email) {
  const regex = /\S+@\S+\.\S+/;

  return regex.test(email);
}
