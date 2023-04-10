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


## 5. 참고 자료 📂

### 5.1. 링크

[newgraphics 네이버 카페 : 7강 인공지능과 그래픽스, Face-API 얼굴 추출 및 표정인식](https://cafe.naver.com/newgraphics/153)

[Github : justadudewhohacks/face-api.js](https://github.com/justadudewhohacks/face-api.js)

[Youtube : Build Real Time Face Detection With JavaScript](https://www.youtube.com/watch?v=CVClHLwv-4I)
