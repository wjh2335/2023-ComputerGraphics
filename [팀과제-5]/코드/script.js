const video = document.getElementById('video');
const canvas = document.createElement('canvas'); // ĵ���� ��� ����
const startBtn = document.getElementById('startBtn');
const excelBtn = document.getElementById('excelBtn');
const table = document.querySelector('table tbody');
const img = document.createElement('img');
let isCanvasCreated = false; // ĵ���� ��� ���� ����

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
    context.drawImage(video, 0, 0, canvas.width, canvas.height); // ĸó�� �̹��� �׸���
}

function capturePicture()
{
    if (!isCanvasCreated)
    {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;
        isCanvasCreated = true;
    }

    capture(); // ĸó�� �̹��� �׸���
    img.src = canvas.toDataURL(); // ĵ�������� �׸� �̹����� img ����� src �Ӽ��� �Ҵ�

    const tr = document.createElement('tr');
    tr.innerHTML = `<td colspan="2"><img src="${img.src}" /></td>`; // tr ��� ���� �� �߰�

    const firstRow = table.querySelector('tr:first-child');
    table.replaceChild(tr, firstRow); // ���̺� ù ��° �� �տ� ���ο� �� �߰�
}

/* ********************** ������� ********************** */
async function start()
{
    // �� �ν�
    const labeledFaceDescriptors = await loadLabeledImages();
    const faceMatcher = new faceapi.FaceMatcher(labeledFaceDescriptors, 0.6);
    const detections = await faceapi.detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();

    // �νĵ� �󱼰� ��ġ�ϴ� �� ã��
    const results = detections.map(d => faceMatcher.findBestMatch(d.descriptor));
    const labels = results.map(r => r.label);

    // ��ġ�ϴ� ���� �ִ� ���
    if (labels.length > 0)
    {
        document.querySelector('h1').textContent = 'OOOOOOOOO';
    }
    // ��ġ�ϴ� ���� ���� ���
    else
    {
        document.querySelector('h1').textContent = 'XXXXXXXX';
    }
}
/* ********************** ������� ********************** */

function loadLabeledImages()
{
    const labels = ['Black Widow', 'Captain America', 'Captain Marvel', 'Hawkeye', 'Jim Rhodes', 'Thor', 'Tony Stark']
    return Promise.all(
        labels.map(async label => {
            const descriptions = []
            for (let i = 1; i <= 2; i++)
            {
                const img = await faceapi.fetchImage(`https://raw.githubusercontent.com/WebDevSimplified/Face-Recognition-JavaScript/master/labeled_images/${label}/${i}.jpg`)
                const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor()
                descriptions.push(detections.descriptor)
            }

            return new faceapi.LabeledFaceDescriptors(label, descriptions)
        })
    )
}

function createExcel()
{
    // ���� ���� ����
    const workbook = XLSX.utils.book_new();

    // ��Ʈ ����
    const sheet = XLSX.utils.table_to_sheet(table);

    // ��Ʈ�� ��ũ�Ͽ� �߰�
    XLSX.utils.book_append_sheet(workbook, sheet, 'Attendance');

    // ���� ���� �ٿ�ε�
    XLSX.writeFile(workbook, 'attendance.xlsx');
}

captureBtn.addEventListener('click', capturePicture);
attendBtn.addEventListener('click', start);
excelBtn.addEventListener('click', createExcel);