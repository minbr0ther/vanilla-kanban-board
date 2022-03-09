<p align="middle" >
  <img src="https://user-images.githubusercontent.com/24728385/157555298-7d423e28-aa2e-4fbd-9e24-665ae26aefc4.png"/>
</p>
<h1 align="middle">vanilla kanban board</h1>

# 🔗 배포

[![Netlify Status](https://api.netlify.com/api/v1/badges/bb70b8c6-9367-4134-ad64-f63e11637a25/deploy-status)](https://app.netlify.com/sites/musing-swanson-73b1d4/deploys)

https://musing-swanson-73b1d4.netlify.app

<br>

# 📱 기술스택

<img src="https://img.shields.io/badge/html-E34F26?style=for-the-badge&logo=html5&logoColor=white"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white">

<br>

# 🏹 구현사항

- 컴포넌트 형태로 추상화 하여 DOM 접근을 최소화 했습니다.
- 명령형 프로그래밍 방식을 벗어나 최대한 선언적인 프로그래밍 방식으로 접근했습니다.

<br/>

## Drag & Drop

- 원하는 `column & row`로 이동 가능

![1](https://user-images.githubusercontent.com/24728385/157557497-727f8bcd-c64b-4a74-8f68-e09227ee4fd6.gif)

<br/>

## Create

- `localStorage` 사용해서 새로고침해도 데이터 보존

![2](https://user-images.githubusercontent.com/24728385/157557495-a6d7cbfd-bdcd-4d6c-86ef-99ac6dbff3ca.gif)

<br/>

## Update

- `contenteditable` 속성으로 `div` 수정 가능

![3](https://user-images.githubusercontent.com/24728385/157557494-21d5c3f6-4d83-40c8-9c53-9e54dd1e96c3.gif)

<br/>

## Delete

- `dblclick` 이벤트로 더블 클릭 시 삭제 가능

![4](https://user-images.githubusercontent.com/24728385/157557534-3764b831-c1d5-4a9a-b977-d7c6458d6dc6.gif)

<br>

## ✅ Git - Commit Message Convention [🔗](https://doublesprogramming.tistory.com/256)

- feat : 새로운 기능 추가
- fix : 버그 수정
- docs : 문서 수정
- style : 코드 포맷팅, 세미콜론 누락, 코드 변경이 없는 경우
- refactor : 코드 리펙토링
- chore : 빌드 업무 수정, 패키지 매니저 수정
