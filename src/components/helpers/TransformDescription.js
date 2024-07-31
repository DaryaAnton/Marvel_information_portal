

const transformDescription = (text, maxLength = 200) => {
  if (!text) return 'Описание персонажа отсутствует';
  return text.length <= maxLength ? text : `${text.slice(0, maxLength)}...`;
};
export default transformDescription;