const pickerContent = document.querySelector('.picker--list');

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
   pickerContent.addEventListener('click',clickHendler) 
}

init();