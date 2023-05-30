const RngColor = document.getElementById('rng');
const backgroundColor = document.getElementById('bgrnd');
const OpacityColor = document.getElementById('opacity');
const Picker = document.getElementById('colorpicker');
const bgrdPicker = document.getElementById('bgrdColorPicker');
const eraser = document.getElementById('erase');
const clr = document.getElementById('clr');

let grid = document.getElementById('grid');

let currrentMode = 'paint';

let slide = document.querySelector('.slider');
let info = document.querySelector('.sliderInfo');
info.innerHTML=slide.value + " X " + slide.value ;
slide.addEventListener("click",function(){
     columns = slide.value;
     rows = slide.value;
     clearGrid ();
     newGrid ();
     defCol();
})

slide.oninput = function() {
    info.innerHTML=this.value + " X " + this.value;
}

let columns =slide.value;
let rows =slide.value;



function clearGrid() {
    document.querySelectorAll(".grid-element")
    .forEach((e)=> e.parentNode.removeChild(e));
}


function newGrid () {
    
    grid.style.gridTemplateColumns = `repeat(${columns}, 1fr)`;
    grid.style.gridTemplateRows = `repeat(${rows}, 1fr)`;
    
    let newgrid = document.getElementById('grid');
    for (let i=0; i<columns*rows;i++) {
    const element = document.createElement('div');
    element.classList.add('grid-element');
    newgrid.appendChild(element);
}
}

function defaultColor (ele) {
    ele.addEventListener('mouseover',function(){   //   HERE
       if (currrentMode!='erase')
        ele.style.backgroundColor ="black";
    })
}


function changeColor (ele,value) {
    ele.addEventListener('mouseover',function(){   //HERE
        if (currrentMode!='erase') {
            ele.style.backgroundColor = value;
        changeOpacityStatic (ele,value);
        }
        
},{once:true});
}

function changeToRandomColor (ele) {

    ele.addEventListener('mouseover',function(){   //HERE   
        let count = 0;
        let r = RNG();
        let g = RNG();
        let b = RNG();
        if (currrentMode!='erase') {
             let temp = ele.style.backgroundColor = "rgba(" + r + ", " + g + ", " + b + ", 1)";
                changeOpacity(ele,r,g,b);
        }
       

        
    },{once:true});
}

function RNG () {
    let rand = Math.floor(Math.random()*255)+1;
    return rand;
}

function changeOpacity (ele,r,g,b,) {
    let i=2;
    ele.addEventListener('mouseover',function(){  //HERE
     if (currrentMode!='erase') {
            console.log(i);
    ele.style.backgroundColor = "rgba(" + r*1/i + ", " + g*1/i + ", " + b*1/i + ", 1)";
        i++;
        }
        
    });
    
    }

function changeOpacityStatic (ele,color) {
    let i=2;
    let red = parseInt (color.substring(1,3),16);
    let green = parseInt (color.substring(3,5),16);
    let blue = parseInt (color.substring (5,7),16);
    ele.addEventListener('mouseover',function(){    //HERE
        if (currrentMode!='erase') {
            ele.style.backgroundColor = "rgba(" + red*1/i + ", " + green*1/i + ", " + blue*1/i + ", 1)";
        i++;
        }
         
    });
    
}

RngColor.addEventListener('click',function(){
    currrentMode='color';
    let element = document.querySelectorAll('.grid-element');
    element.forEach((e)=> changeToRandomColor(e));
});

backgroundColor.addEventListener('click',function(){
    bgrdPicker.style.display="block";
})
    
   Picker.addEventListener('input', ()=> {
            currrentMode='color';
            test = Picker.value;
            console.log(test);
       let element = document.querySelectorAll('.grid-element')
        element.forEach((e)=> changeColor(e,test));
        }); 

    bgrdPicker.addEventListener('input',()=> {
        grid.style.backgroundColor = bgrdPicker.value;
        
    });

    eraser.addEventListener('click',function(){
        currrentMode='erase';
        let element = document.querySelectorAll('.grid-element');
        element.forEach((e)=>eraseElement(e));
    })

    clr.addEventListener('click',function() {
        clearGrid();
        newGrid();
    })

    function eraseElement (ele) {
      ele.addEventListener('mouseover',function(){     //HERE
       //   if (click)
        ele.style.backgroundColor=bgrdPicker.value;
      },{once:true});    
        
}

    function defCol () {
       let element = document.querySelectorAll('.grid-element')
       element.forEach((e)=> defaultColor(e));
    }



     window.onload = () => {
        newGrid();
        defCol();
}