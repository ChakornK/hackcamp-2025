export const createToken = (username) => {
  return `${username}-${crypto.randomUUID()}`;
};
