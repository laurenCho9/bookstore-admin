export const mockBooks = (() => {
  const books = [
    { title: "1984", author: "조지 오웰" },
    { title: "동물 농장", author: "조지 오웰" },
    { title: "노인과 바다", author: "어니스트 헤밍웨이" },
    { title: "위대한 개츠비", author: "F. 스콧 피츠제럴드" },
    { title: "호밀밭의 파수꾼", author: "J.D. 샐린저" },
    { title: "파우스트", author: "요한 볼프강 폰 괴테" },
    { title: "돈키호테", author: "미겔 데 세르반테스" },
    { title: "변신", author: "프란츠 카프카" },
    { title: "안나 카레니나", author: "레프 톨스토이" },
    { title: "죄와 벌", author: "표도르 도스토옙스키" },
    { title: "인간 실격", author: "다자이 오사무" },
    { title: "데미안", author: "헤르만 헤세" },
    { title: "이방인", author: "알베르 카뮈" },
    { title: "고도를 기다리며", author: "사뮈엘 베케트" },
    { title: "어린 왕자", author: "앙투안 드 생텍쥐페리" },
    { title: "달과 6펜스", author: "서머싯 몸" },
    { title: "분노의 포도", author: "존 스타인벡" },
    { title: "대지", author: "펄 벅" },
    { title: "위대한 유산", author: "찰스 디킨스" },
    { title: "오만과 편견", author: "제인 오스틴" },
    { title: "폭풍의 언덕", author: "에밀리 브론테" },
    { title: "닥터 지바고", author: "보리스 파스테르나크" },
    { title: "롤리타", author: "블라디미르 나보코프" },
    { title: "벨아미", author: "기 드 모파상" },
    { title: "파리의 노트르담", author: "빅토르 위고" },
    { title: "레 미제라블", author: "빅토르 위고" },
    { title: "한여름 밤의 꿈", author: "윌리엄 셰익스피어" },
    { title: "햄릿", author: "윌리엄 셰익스피어" },
    { title: "리어왕", author: "윌리엄 셰익스피어" },
    { title: "맥베스", author: "윌리엄 셰익스피어" },
  ];

  // ✅ 랜덤으로 30개 선택 후 reverse 적용
  const shuffled = books
    .sort(() => Math.random() - 0.5)
    .slice(0, 30)
    .reverse();

  return shuffled.map((book, index) => ({
    id: index + 1,
    title: book.title,
    author: book.author,
    publishedDate: `20${Math.floor(Math.random() * 20)}-${String(
      Math.floor(Math.random() * 12) + 1
    ).padStart(2, "0")}-15`,
    quantity: 5, // ✅ 기본 수량을 5로 고정
  }));
})();
