export const toCamelCase = (str: string): string => {
  const camelCase = str
    .toLowerCase()
    .split('_')
    .map((e, i) => {
      if (i === 0) {
        return e.toLowerCase();
      }
      const first = e.charAt(0).toUpperCase();
      const another = e.slice(1).toLowerCase();
      return first + another;
    });

  return camelCase.join('');
};
