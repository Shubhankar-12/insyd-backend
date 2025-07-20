export const generateDisplayId = (): string => {
  const letters = Array.from({ length: 3 }, () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26))
  ).join("");

  const numbers = Array.from({ length: 5 }, () =>
    Math.floor(Math.random() * 10)
  ).join("");

  return `${letters}${numbers}`;
};
