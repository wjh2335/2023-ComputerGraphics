# [3팀] 영상에서 AI 얼굴인식을 활용하여 얼굴 추출 하기

## 1. 구성원 👩‍👧‍👦

|이름|학년|학과|
|---|---|---|
|김형진|2학년|컴퓨터공학과|
|우제현|3학년|컴퓨터공학과|
|이수용|3학년|컴퓨터공학과|
|박성욱|4학년|컴퓨터공학과|
|이정빈|2학년|컴퓨터공학과|
|조인철|2학년|컴퓨터공학과|
|김재호|3학년|컴퓨터공학과|
|권승인|2학년|컴퓨터공학과|


## 2. 프로젝트 계획 🕗 
  * 일정: 2023.04.04. PM 04:31 ~ 2023.04.10. PM 11:59
 
## 2.1. 아이디어 구상

```
샘플 영상에서 사진을 하나 캡처하고 그 사진에서 사람 모습을 찾는다.
그 후 찾은 사람에서 선택해서 사진 파일을 다운받을 수 있게 한다.
```


## 3. 코드 💻 [링크](https://github.com/anulabgit/face-api/tree/main/face-api)

### 3-1. index.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <script defer src="face-api.min.js"></script>
    <script defer src="main.js"></script>
    <title>비디오 이미지 추출</title>
    <style>
    body {
      margin: 0;
      padding: 0;
      width: 100vw;
      height: 100vh;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column
    }

  .modal {
    display: none;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    background-color: rgba(0,0,0,0.7);
  }

  .modal-content {
    margin: auto;
    display: block;
    width: 80%;
    max-width: 800px;
    max-height: 80%;
  }

  .close {
    position: absolute;
    top: 10px;
    right: 10px;
    color: #ffffff;
    font-size: 24px;
    font-weight: bold;
    cursor: pointer;
  }
  #capture-btn{
    position:absolute;
    top: 500px;
    left: 0;
  }
  #detection-btn{
    position:absolute;
    top: 550px;
    left: 0;
  }
  video {
    position: absolute;
    top: 0;
    left: 0;
    width: 800px;
    height: 450px;
  }
  canvas {
      position: absolute;
      top: 0;
      left: 0;
    }
    </style>
  </head>
  <body>
    <canvas id="p_canvas" ref="{canvasRef}" width="800" height="450"></canvas>
    <video id="video" src="test.mp4" controls></video>
    <button id="capture-btn">Capture</button>
    <button id="detection-btn">Detection</button>
  </body>
</html>
```

## 4. 실행 결과 🎮

![21](/img/21.png)

![22](/img/22.png)


## 5. 소감

### 5-1. 김형진

```
```

### 5-2. 우제현

```
AI 얼굴 인식 영상처리 프로그램을 개발하면서, 다양한 알고리즘과 라이브러리를 활용해 프로그래밍 기술과 지식이 크게 향상됐습니다.
팀원들과 함께 문제를 해결하면서 협력과 소통의 중요성을 느낄 수 있었습니다.
웹 페이지에서 AI 얼굴 인식이 동작하도록 구현하면서, 기술 발전 가능성과 중요성을 체감할 수 있었습니다.
프로젝트 진행 중 발생한 문제를 해결하면서 문제 해결 능력이 향상되었고, 더 나은 솔루션을 찾는 방법을 배울 수 있었습니다.
이번 프로젝트를 통해 새로운 기술과 도전에 대한 열정과 자신감을 얻을 수 있었습니다.
```

### 5-3. 이수용

```
```

### 5-4. 박성욱

```
```

### 5-5. 이정빈

```
```

### 5-6. 조인철

```
```

### 5-7. 김재호

```
```

### 5-8. 권승인

```
```


## 6. 참고 자료 📂

### 6.1. 링크

[newgraphics 네이버 카페 : 7강 인공지능과 그래픽스, Face-API 얼굴 추출 및 표정인식](https://cafe.naver.com/newgraphics/153)

[Github : justadudewhohacks/face-api.js](https://github.com/justadudewhohacks/face-api.js)

[Youtube : Build Real Time Face Detection With JavaScript](https://www.youtube.com/watch?v=CVClHLwv-4I)
