export const mockAuthors = Array.from({ length: 25 }).map((_, index) => ({
  id: index + 1,
  name: `Author ${index + 1}`,
  avatar: `https://via.placeholder.com/262?text=A${index + 1}`,
}));
