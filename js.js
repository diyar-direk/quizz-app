let catogery = document.querySelector(".catogery >span");
let numberOfQuastionInHtml = document.querySelector(".qwastion-count >span");
let qwastionArea = document.querySelector(".qwastion-area");
let inputsArea = document.querySelector(".inputs");
let button = document.querySelector(".button");
let spansArea = document.querySelector(".spans");
let timeInPage = document.querySelector(".timer");
let h2 = document.querySelector(".heading");
let counter = 0;
let rghitAnswer = 0;
////
let interval;
////
fetch(
  "https://opentdb.com/api.php?amount=10&category=27&difficulty=hard&type=multiple"
)
  .then((response) => response.json())
  .then((res) => {
    results = res.results;
    qCount = results.length;
    console.log(results);
    /////
    for (let j = 0; j < qCount; j++) {
      let spanCircel = document.createElement("span");
      if (j == 0) {
        spanCircel.className = "active";
      }
      spansArea.appendChild(spanCircel);
    }
    /////
    addTOpage(results[counter], qCount);

    timer(60, qCount);

    button.onclick = () => {
      if (counter < qCount) {
        let rghitAnswer = results[counter].correct_answer;
        check(rghitAnswer, qCount);
        counter++;
        catogery.innerHTML = "";
        h2.innerHTML = "";
        inputsArea.innerHTML = "";
        addTOpage(results[counter], qCount);
        active(qCount);
        show(qCount);
        clearInterval(interval);
        timer(60, qCount);
      }
    };
  });

function addTOpage(e, c) {
  if (counter < c) {
    numberOfQuastionInHtml.innerHTML = c;
    catogery.innerHTML = e.category;
    h2.innerHTML = e.question;
    ///
    let qwastionsArray = e.incorrect_answers;
    qwastionsArray.push(e.correct_answer);
    ///
    qwastionsArrayFun(qwastionsArray);
    ///
    for (i = 0; i < e.incorrect_answers.length; i++) {
      let div = document.createElement("div");
      div.className = "input";
      /////
      let input = document.createElement("input");
      input.type = "radio";
      input.className = "i";
      input.dataset.answer = qwastionsArray[i];
      input.id = `answer${i + 1}`;
      input.name = "answer";
      if (i == 0) {
        input.checked = true;
      }
      //////
      let label = document.createElement("label");
      label.innerHTML = qwastionsArray[i];
      label.htmlFor = `answer${i + 1}`;
      /////
      div.appendChild(input);
      div.appendChild(label);
      inputsArea.appendChild(div);
    }
  }
}

function qwastionsArrayFun(array) {
  let arryIndex = array.length,
    random,
    newIndex;
  while (arryIndex > 0) {
    random = Math.floor(Math.random() * arryIndex);
    arryIndex--;
    newIndex = array[arryIndex];
    array[arryIndex] = array[random];
    array[random] = newIndex;
  }
  return array;
}

function check(ranswer, c) {
  let inputsSelect = document.querySelectorAll(".inputs .i");
  if (counter < c) {
    let chosen;
    for (let i = 0; i < inputsSelect.length; i++) {
      if (inputsSelect[i].checked == true) {
        chosen = inputsSelect[i];
      }
    }
    if (chosen.dataset.answer === ranswer) {
      rghitAnswer++;
      console.log("true");
    }
  }
}

function active(c) {
  if (counter < c) {
    for (let i = 0; i <= counter; i++) {
      document.querySelectorAll(".spans span")[i].className = "active";
    }
  }
}

function show(c) {
  if (counter >= c) {
    let span = document.createElement("span");
    if (rghitAnswer >= rghitAnswer / 2 && rghitAnswer < c) {
      span.className = "good";
    } else if (rghitAnswer == c) {
      span.className = "perfect";
    } else {
      span.className = "bad";
    }
    span.innerHTML = `${rghitAnswer} from ${c}`;
    document.body.appendChild(span);
  }
}

function timer(durations, c) {
  let minuts, seconds;
  if (counter < c) {
    interval = setInterval(() => {
      minuts = parseInt(durations / 60);
      seconds = parseInt(durations % 60);
      minuts = minuts < 10 ? `0${minuts}` : minuts;
      seconds = seconds < 10 ? `0${seconds}` : seconds;
      timeInPage.innerHTML = `${minuts}:${seconds}`;
      if (durations-- == 0) {
        clearInterval(interval);
        button.click();
      }
    }, 1000);
  }
}
