const uploadFile = document.querySelector('.upload--file');
const imgArea = document.querySelector('.preview');
const storage = localStorage;
const saveImg = storage.getItem('img');
const ctx = imgArea.getContext('2d');
const color = document.querySelector('.color');

function uploadPreview(data) {
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
        uploadPreview(reader.result);
        storage.setItem('img',JSON.stringify(reader.result));
    };
    reader.readAsDataURL(file);
}

function pickerColor(point) {
    let pointX = point.layerX;
    let pointY = point.layerY;
    const pixel = ctx.getImageData(pointX,pointY,1,1);
    const data = pixel.data;
    const rgba = `${data[0]},${data[1]},${data[2]}`;
    
    color.style.cssText = `top:${pointY}px; left:${pointX}px; background:rgb(${rgba});`;

    if(point.type == "click") {
        const pickArea = document.querySelector('.picker--list');
        const pickList = document.createElement('li');
        const pickEvent = document.createElement('button');
        const pickColor = document.createElement('span');
        const pickInfo = document.createElement('span');

        pickList.classList.add('picker--item');
        pickEvent.classList.add('picker--wrap');
        pickColor.classList.add('picker--colorchip');
        pickInfo.classList.add('picker--name');
        pickInfo.innerText = `RGB:${rgba}`;
        pickColor.style.background =  `rgb(${rgba})`;

        pickEvent.append(pickColor,pickInfo);
        pickList.appendChild(pickEvent)
        pickArea.appendChild(pickList)
    }
}

function init() {
    if(saveImg !== null ) {
        let currentImg = JSON.parse(saveImg);
        uploadPreview(currentImg);
    }
     uploadFile.addEventListener('change', uploadHandler);
     imgArea.addEventListener('mousemove', pickerColor);
     imgArea.addEventListener('click', pickerColor);
}

init();