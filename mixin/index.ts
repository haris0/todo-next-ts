export const generateCurrentDate = () => {
  const date = new Date().toISOString();
  const dateLong = date.split('T')[0];
  const time = date.split('T')[1].split('.')[0];
  return `${dateLong} ${time}`;
};
