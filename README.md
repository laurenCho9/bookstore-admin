# 온라인 서점 관리자페이지
상점 주인이 책을 검색하고, 상세 정보를 보고 편집하며, 각 책의 판매 수량을 확인할 수 있습니다.

## Stack
- Back-end: MSW 목데이터
- Front-end: Vite, React + TypeScript, SCSS
- Etc library: React-router, SCSS-reset, Axios

## Deploy
**도메인 등록을 하지 않아 로컬에서 확인 가능합니다.**

## Feature
### Front-end
1) 책 목록 페이지 구현
   - 페이지네이션(한페이지당 10개 항목)
   - 제목과 저자로 필터링 검색 기능
2) 책 상세 정보 페이지 구현
3) 책 추가/제거 및 수량 조절 기능
   - 목록페이지 상단에 추가 버튼(Modal Open)
   - 상세페이지 상단에 수정 버튼(수량 조절 외의 데이터 disabled 처리, Modal Open)
   - 상세페이지 하단에 삭제 버튼
4) 그 외 반응형 구현

### Back-end
1) 책 목록 조회 (GET/api/books)
2) 책 상세 조회 (GET/api/books/:id)
3) 책 추가 (POST/api/books)
4) 책 정보 수정 (PUT/api/books/:id)
5) 책 삭제 (DELETE/api/books/:id)
  
