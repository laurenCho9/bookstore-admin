export const mockBooks = Array.from({ length: 100 }, (_, index) => ({
  id: index + 1,
  title: `책 제목 ${index + 1}`,
  author: `저자 ${index + 1}`,
  publishedDate: `202${index % 10}-0${(index % 9) + 1}-15`,
}));
