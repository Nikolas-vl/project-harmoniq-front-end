export const getDescription = text => {
  const maxLength = 100;

  const sentenceMatch = text.match(/[^.!?]+[.!?]/);
  if (sentenceMatch) {
    const sentence = sentenceMatch[0].trim();
    if (sentence.length >= 10) {
      return sentence.slice(0, maxLength).trim();
    }
  }

  if (text.length > maxLength) {
    return text.slice(0, maxLength - 3).trim() + '...';
  }

  return text.trim();
};
