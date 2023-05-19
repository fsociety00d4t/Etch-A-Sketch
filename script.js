let mainGrid = document.getElementById('grid');

for (let i=0;i<256;i++) {
    let divs = document.createElement('div');
    divs.classList.add('grid-elem')
    mainGrid.appendChild(divs);
} 


/*
let cell = document.createElement("div");
cell.innerHTML = "TEXT";
mainGrid.appendChild(cell);
*/