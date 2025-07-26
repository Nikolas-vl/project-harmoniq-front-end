export const getDescription = text => {
  const sentenceMatch = text.match(/[^.!?]+[.!?]/);
  if (sentenceMatch) {
    const sentence = sentenceMatch[0].trim();
    if (sentence.length >= 10) {
      return sentence;
    }
  }
  if (text.length > 50) {
    return text.slice(0, 50).trim() + '...';
  }
  return text.trim();
};
