let boxes = document.querySelectorAll(".box");
let sz=boxes.length;
let nums = document.querySelectorAll(".num");
let suffleNum = [];

let visited = [];
let count = 0;
let start=false;

function giveNumber(className){
  let splitBox = className.split('-');
  let num = Number(splitBox[1]) ;
  return num;
}

function swap(a,b){
  boxes[b].classList.remove("empty-box");
  boxes[a].classList.add("empty-box");

  let c = boxes[a].innerHTML;
  boxes[a].innerHTML = boxes[b].innerHTML;
  boxes[b].innerHTML = c;

  let d = suffleNum[a];
  suffleNum[a] = suffleNum[b];
  suffleNum[b] = d;
}

function winningCond(){
  if(count === 25){
    document.querySelector(".puzzle").classList.add("hide");
    document.querySelector(".heading").classList.remove("hide");
    start = false;
    count = 0 ;
  }
}

function toggle(box_a,box_b){
  //for box 1 to check if a number it's correct position or not.
  //if-> box is at correct pos but earlier at wrong pos
  // then inc count by 1 and make visited[box 1] = true.
  if( suffleNum[box_a] === box_a){
    if(visited[box_a] === false){
      visited[box_a] = true;
      count++;
    }
  }
  else{
    if(visited[box_a] === true){
      visited[box_a] = false;
      count--;
    }
  }
  console.log(count);

//same as above statement but for box b.
  if( suffleNum[box_b] === box_b){
    if(visited[box_b] === false){
      visited[box_b] = true;
      count++;
    }
  }
  else{
    if(visited[box_b] === true){
      visited[box_b] = false;
      count--;
    }
  }
  console.log(count);
  winningCond();
}


function boxClicked(num){
  if( (num-5) >= 0 ){
    let cl = boxes[num-5].classList;
    if(cl.length === 3){
      swap(num,num-5);
      toggle(num,num-5);
    }
  }
  if( (num+5) < 25 ){
    let cl = boxes[num+5].classList;
    if(cl.length === 3){
      swap(num,num+5);
      toggle(num,num+5);
    }
  }
  if( (num+1)%5 !== 0 && (num+1) < 25 ){
    let cl = boxes[num+1].classList;
    if(cl.length === 3){
      swap(num,num+1);
      toggle(num,num+1);
    }
  }
  if( (num)%5 !== 0 && num!== 0 ){
    let cl = boxes[num-1].classList;
    if(cl.length === 3){
      swap(num,num-1);
      toggle(num,num-1);
  }
}

}

for(let i=0;i<sz;i++){
  boxes[i].addEventListener("click",function(){
    let cl = this.classList;
    let num = giveNumber(cl[1]);
    boxClicked(num-1);
  });
}

boxes[24].classList.add("empty-box");

function check(){
  for(let i=0;i<sz;i++){

    if( i === suffleNum[i] )
    {
       visited[i]=true;
       count++;
     }
    else
      visited[i]=false;
  }
  console.log(count);
}

function suffle(){
  boxes[24].classList.remove("empty-box");
  let visited = [];
  for(let i=0;i<25;i++){
    visited[i]=false;
  }

  let j=0;
  while(j < 25){
    let ranNum = Math.floor(Math.random()*25);
    if(visited[ranNum] === false){
      if(ranNum === 24){
        boxes[j].innerHTML = "<h1 class=\"num\" > </h1> ";
        boxes[j].classList.add("empty-box");
      }
      else
        boxes[j].innerHTML = "<h1 class=\"num\" >" + (ranNum+1) + "</h1>";

      suffleNum[j]=ranNum;
      j++;
      visited[ranNum]=true;
    }
  }
  check();
}

let btn = document.querySelector(".btn");
btn.addEventListener("click",function(){
  if(!start){
    document.querySelector(".puzzle").classList.remove("hide");
    document.querySelector(".heading").classList.add("hide");
    suffle();
    start=true;
  }
});
