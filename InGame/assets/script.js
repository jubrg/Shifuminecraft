let selectedButton = document.querySelectorAll(".item-img");
let itemOfSkin1 = document.querySelector(".leftItemHand");
let itemOfSkin2 = document.querySelector(".rightItemHand");
let Skin1 = document.querySelector(".skinleft");
let Skin2 = document.querySelector(".skinright");
let isRunning = 0;
let BoxInfo = document.querySelector(".BoxInfo");
let roundCounter = 0;
let MatchCounter = 0;
let humanCounter = 0;
const delay = (ms) => new Promise((res) => setTimeout(res, ms));

function reset() {
  itemOfSkin1.style.display = "none";
  itemOfSkin2.style.display = "none";
  itemOfSkin2.style.transform = "matrix(-1, 0, 0, 1, 0, 0)";
  isRunning = false;
  Skin1.src = "./assets/images/skinleft.png";
  Skin2.src = "./assets/images/skinright.png";
}
reset();

async function active(humanSelection, robotSelection) {
  itemOfSkin1.style.display = "block";
  itemOfSkin2.style.display = "block";
  Skin1.src = "./assets/images/skinleftActive.png";
  Skin2.src = "./assets/images/skinrightActive.png";
  switch (humanSelection) {
    case 1:
      itemOfSkin1.src = "./assets/images/frame-11.png";
      break;
    case 2:
      itemOfSkin1.src = "./assets/images/frame-4.png";
      break;
    case 3:
      itemOfSkin1.src = "./assets/images/paper.png";
      break;
  }
  switch (robotSelection) {
    case 1:
      itemOfSkin2.src = "./assets/images/frame-11.png";
      break;
    case 2:
      itemOfSkin2.src = "./assets/images/frame-4.png";
      break;
    case 3:
      itemOfSkin2.src = "./assets/images/paper.png";
      break;
  }
  await delay(500);
  reset();
}

function getResult(humanSelection) {
  if (!isRunning) {
    isRunning = true;
    let getRobotNumber = Math.floor(Math.random() * (3 - 1 + 1) + 1);
    let getHumanNumber = humanSelection;
    let result = "Tu a perdue";
    if (getRobotNumber != getHumanNumber)
      switch (getRobotNumber) {
        case 1:
          if (getHumanNumber == 3) result = "tu a gagné";
          break;
        case 2:
          if (getHumanNumber == 1) result = "tu a gagné";
          break;
        case 3:
          if (getHumanNumber == 2) result = "tu a gagné";
          break;
      }
    else {
      result = "Il y a égalité";
    }
    console.log(result);
    if (result == "tu a gagné") {
      addHeart("Human");
    } else if (result == "Tu a perdue") {
      addHeart("Robot");
    }
    roundCounter++;

    if (roundCounter == 10) {
      if (heartHuman > heartRobot - 10) {
        humanCounter++;
        whoWin("gagner");
      } else if (heartRobot - 10 > heartHuman) {
        whoWin("perdue");
      }
      else
      {
        whoWin("égalité");
      }
    }
    active(getHumanNumber, getRobotNumber);
  }
}

function whoWin(result) {
  MatchCounter++;
  BoxInfo.style.display = "block";
  document.querySelector(
    ".BoxInfo p:nth-child(1)"
  ).textContent = `Vous avez ${result} !`;
  console.log(humanCounter + "     " + MatchCounter)
  document.querySelector(".BoxInfo p:nth-child(2)").textContent = `Votre pourcentage de reussite est de ${Math.round((100*humanCounter/MatchCounter))}%`;
  heartHuman = 0;
  heartRobot = 10;
  roundCounter = 0;
}

document.querySelector(".items1").onclick = function () {
  getResult(1);
};

document.querySelector(".items2").onclick = function () {
  getResult(2);
};

document.querySelector(".items3").onclick = function () {
  getResult(3);
};

let heartHuman = 0;
let heartRobot = 10;
let currentHeartList = document.querySelectorAll(".heart");

function addHeart(type) {
  if (type == "Robot") {
    currentHeartList[heartRobot].classList.toggle("redHeart");
    heartRobot += 1;
  } else {
    currentHeartList[heartHuman].classList.toggle("redHeart");
    heartHuman += 1;
  }
}

function resetHeart() {
  for (let index = 0; index < 20; index++) {
    currentHeartList[index].classList.remove("redHeart");
  }
}

console.log(localStorage.getItem("name"));

document.querySelector(".BoxInfo button").onclick = function () {
  BoxInfo.style.display = "none";
  resetHeart();
};