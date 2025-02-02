export const trimText = (text: string, length: number) => {
  if (!text) return "";
  if (text?.length > length) {
    return `${text.substring(0, length - 3)}...`;
  }
  return text;
};
