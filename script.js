//-------- Tic-Tac-Toe --------//
// It has 8 Winning Patterns-{(0,1,2);(3,4,5);(6,7,8);(0,3,6);(1,4,7);(2,5,8);(0,4,8);(2,4,6)}

let boxes=document.querySelectorAll(".box");

let turnX=true;
let gameOver=false;

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

boxes.forEach((box,index)=>{
    box.addEventListener("click",()=>{

        if(box.innerText!==""||gameOver){
            return;
        }
        if(turnX){
            box.innerText="X";
            box.classList.add("X");
            turnX=false;
        }
        else{
            box.innerText="O";
            box.classList.add("O");
            turnX=true;
        }
        checkWinner();
    });
});

function confetti(){
    for(let i=0;i<500;i++){ // 50 confetti boxes
        let p=document.createElement("div");
        p.className="pixels";

        p.style.left=Math.random()*100+"vw";  // random horizontal position of confetti
        p.style.top=Math.random()*-200+"px";           // falling start randomly from -200px to 0px
        
        let size=Math.random()*8+4;
        p.style.width=size+"px";
        p.style.height=size+"px";

        const colors=["#0f380f","#306230","#8bac0f","#9bbc0f"];
        p.style.background=colors[Math.floor(Math.random()*colors.length)];

        let duration=Math.random()*1+1;
        p.style.animationDuration=duration+"s";

        p.style.animationDelay=Math.random()*0.5+"s";

        document.body.appendChild(p);
        setTimeout(()=>p.remove(),2000);
    }
}
function checkWinner(){
     for(let pattern of winPatterns){
        let val1=boxes[pattern[0]].innerText;
        let val2=boxes[pattern[1]].innerText;
        let val3=boxes[pattern[2]].innerText;

        if(val1 !=="" && val1==val2 && val2==val3){
            gameOver=true;

            boxes[pattern[0]].classList.add("win");
            boxes[pattern[1]].classList.add("win");
            boxes[pattern[2]].classList.add("win");

            const winnerText = document.getElementById("winnerText");
            winnerText.innerText = val1 + " WINS!";
            document.body.classList.add("flash");
            confetti();

            setTimeout(()=>{
                document.body.classList.remove("flash"); // if not removed, flash animation will last forever
            },1200);
            return;
        }
     }

     //check draw
    let filled=true;

    boxes.forEach(box=>{
        if(box.innerText==="")
            filled=false;
    });

    if(filled){
    gameOver=true;

    const winnerText = document.getElementById("winnerText");
    winnerText.innerText = "DRAW!";
    }
}

document.getElementById("reset").onclick=()=>{
    boxes.forEach(box=>{
        box.innerText="";
        box.classList.remove("X","O","win");
    });
    turnX=true;
    gameOver=false;

    document.getElementById("winnerText").innerText="";
    document.body.classList.remove("flash");
}

