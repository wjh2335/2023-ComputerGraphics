# 1. 실행방법
1) Web Server for Chrome 설치
2) 압축폴더 다운 & 압축풀기 후 Web Server 폴더 지정
3) http://127.0.0.1:8887 (설정한 포트번호로) 접속

# 2. 시스템 시연 및 실행 결과
### 2.1. 얼굴 인식 출석 시스템 접속 
<br>
<img src="https://raw.githubusercontent.com/wjh2335/2023-ComputerGraphics/main/img/%EC%96%BC%EA%B5%B4%EC%9D%B8%EC%8B%9D%EC%B6%9C%EC%84%9D%EC%8B%9C%EC%8A%A4%ED%85%9Cgui(1).jpg"></img>
<br>

```
1) 얼굴 인식 출석 시스템을 사용하기 위한 웹 서버를 실행시킨다. 
2) 실행시킨 이후 얼굴 인식 출석 시스템에 접속한다. 

출석을 하기 이전의 시스템의 초기 화면은 위의 그림과 같다. 
이 시스템은 사용자가 사용할 수 있는 기능으로 사진 캡처, 출석 체크, 엑셀 생성의 3가지 기능을 제공한다.
```

### 2.2. 학생 사진 캡처, 출석 체크
<br>
<img src="https://raw.githubusercontent.com/wjh2335/2023-ComputerGraphics/main/img/%EC%96%BC%EA%B5%B4%EC%9D%B8%EC%8B%9D%EC%B6%9C%EC%84%9D%EC%8B%9C%EC%8A%A4%ED%85%9Cgui(2).jpg"></img>
<br>

```
1) 학생이 카메라에 얼굴을 인식하기 위해 사진 캡처 버튼을 누른다. 
2) 캡처된 영상의 사진을 사용하여 출석 체크 버튼을 눌러서 출석을 한다. 

얼굴 인식 출석 시스템은 얼굴 인식을 위한 학습 학생 데이터를 가지고 있어야 한다. 
시스템은 학습된 데이터셋을 이용하여 영상에서 캡처된 얼굴을 인식한다면 출석부에 O 표시를 한다. 
```

### 2.3. 출석 정보 엑셀 추출
<br>
<img src="https://raw.githubusercontent.com/wjh2335/2023-ComputerGraphics/main/img/%EC%96%BC%EA%B5%B4%EC%9D%B8%EC%8B%9D%EC%B6%9C%EC%84%9D%EC%8B%9C%EC%8A%A4%ED%85%9Cgui(3).jpg"></img>
<br>

```
1) 생성된 출석 정보를 받기 위해 엑셀 생성 버튼을 누른다. 
2) 엑셀이 생성되면 출석부는 리셋된다. 
```

**▲ 웹 페이지**

---

<br>
<img src="https://raw.githubusercontent.com/wjh2335/2023-ComputerGraphics/main/img/result_ex.jpg"></img>
<br>

**▲ 엑셀 파일**
