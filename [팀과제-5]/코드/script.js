const video = document.getElementById('video');
const canvas = document.createElement('canvas'); // 캔버스 요소 생성
const startBtn = document.getElementById('startBtn');
const excelBtn = document.getElementById('excelBtn');
const table = document.querySelector('table tbody');
const img = document.createElement('img');
let isCanvasCreated = false; // 캔버스 요소 생성 여부

Promise.all([
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models')
]).then(start)

function startVideo()
{
    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    );
}

startVideo();

function capture()
{
    const context = canvas.getContext('2d');
    context.drawImage(video, 0, 0, canvas.width, canvas.height); // 캡처한 이미지 그리기
}

function capturePicture()
{
    if (!isCanvasCreated)
    {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        isCanvasCreated = true;
    }

    capture(); // 캡처한 이미지 그리기
    img.src = canvas.toDataURL(); // 캔버스에서 그린 이미지를 img 요소의 src 속성에 할당

    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="2"><img src="${img.src}" /></td>`; // tr 요소 생성 및 추가

    const firstRow = table.querySelector('tr:first-child');
    table.replaceChild(tr, firstRow); // 테이블 첫 번째 행 앞에 새로운 행 추가

    const tr1 = table.querySelector(`tr[data-name="Woo"]`);
    const td1 = tr1.querySelector('td:last-child');
    td1.textContent = 'X';

    const tr2 = table.querySelector(`tr[data-name="Su"]`);
    const td2 = tr2.querySelector('td:last-child');
    td2.textContent = 'X';

    const tr3 = table.querySelector(`tr[data-name="Sin"]`);
    const td3 = tr1.querySelector('td:last-child');
    td3.textContent = 'X';

    const tr4 = table.querySelector(`tr[data-name="Captain America"]`);
    const td4 = tr1.querySelector('td:last-child');
    td4.textContent = 'X';
}

async function start()
{
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);

    attendBtn.addEventListener('click', async () => {
        // 얼굴 인식
        const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

        // 인식된 얼굴과 일치하는 라벨 찾기
        const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
        const labels = results.map(r => r.label);

        // 일치하는 라벨이 있는 경우
        if (labels.length > 0) {
            for (let i = 0; i < labels.length; i++) {
                const label = labels[i];
                if (label == "unknown") continue;

                const tr = table.querySelector(`tr[data-name="${label}"]`);
                const td = tr.querySelector('td:last-child');
                td.textContent = 'O';
            }
        }
    });
}

function loadLabeledImages()
{
    const labels = ['Woo', 'Captain America']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let i = 1; i <= 2; i++)
            {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/wjh2335/test4/main/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

function createExcel()
{
    // 엑셀 파일 생성
    const workbook = XLSX.utils.book_new();

    // 시트 생성
    const sheet = XLSX.utils.table_to_sheet(table);

    // 시트를 워크북에 추가
    XLSX.utils.book_append_sheet(workbook, sheet, 'Attendance');

    // 엑셀 파일 다운로드
    XLSX.writeFile(workbook, 'attendance.xlsx');
}

captureBtn.addEventListener('click', capturePicture);
excelBtn.addEventListener('click', createExcel);