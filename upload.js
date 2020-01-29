const uploadFile = document.querySelector('.upload--file');
const pickArea = document.querySelector('.picker--list');
const imgArea = document.querySelector('.preview');
const storage = localStorage;
const saveImg = storage.getItem('img');
const ctx = imgArea.getContext('2d');
const pointer = document.querySelector('.preview--pointer');

function showPreview(data) {
    const img = new Image;
    let canvasHeight = imgArea.height;
    let canvasWidth = imgArea.width;
    img.src = data;
    imgArea.toDataURL("image/jpg");

    img.onload = ()=>{
        ctx.drawImage(img,0,0);
    }
}

function uploadHandler() {
    const file = uploadFile.files[0];
    const reader = new FileReader();

    reader.onload = () => {
        showPreview(reader.result);
        storage.setItem('img',JSON.stringify(reader.result));
    };
    reader.readAsDataURL(file);
}

function pickerColor(point) {
    let pointX = point.layerX;
    let pointY = point.layerY;

    const pixel = ctx.getImageData(pointX,pointY,1,1);
    const data = pixel.data;
    const R = data[0];
    const G = data[1];
    const B = data[2];
    const RGB = `${R},${G},${B}`;
    
    pointer.style.cssText = `top:${pointY}px; left:${pointX}px; background:rgb(${RGB});`;

    if(point.type == "click") {
        const pickList = document.createElement('li');
        const pickEvent = document.createElement('button');
        const pickColor = document.createElement('span');
        const pickInfo = document.createElement('span');

        pickList.classList.add('picker--item');
        pickEvent.classList.add('picker--wrap');
        pickColor.classList.add('picker--colorchip');
        pickInfo.classList.add('picker--name');
        pickInfo.innerText = `RGB:${RGB}`;
        pickColor.style.background =  `rgb(${RGB})`;

        pickEvent.append(pickColor,pickInfo);
        pickList.appendChild(pickEvent)
        pickArea.appendChild(pickList)
    }
}

function clipCopy(target) {
    const aaa = target.innerText.replace(/RGB:/gi,'rgb(')
    const tempElem =document.createElement('textarea');

    tempElem.value = aaa + ')';
    document.body.appendChild(tempElem);

    tempElem.select();
    document.execCommand('copy');
    document.body.removeChild(tempElem);
}

function clickHendler(event) {
    let pickElem = event.target;
   
    while(!pickElem.classList.contains('picker--wrap')){
        pickElem = pickElem.parentNode;
        clipCopy(pickElem);
    }
}

function init() {
    if(saveImg !== null ) {
        let currentImg = JSON.parse(saveImg);
        showPreview(currentImg);
    }
     uploadFile.addEventListener('change', uploadHandler);
     imgArea.addEventListener('mousemove', pickerColor);
     imgArea.addEventListener('click', pickerColor);
     pickArea.addEventListener('click',clickHendler);
}

init();