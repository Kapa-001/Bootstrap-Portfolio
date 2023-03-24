// Defining my variables and const
let timeLimit = 60;
const choiceBlock = document.querySelector('.choices button'); 
const submit = document.getElementById('submit'); 
// const quizContainer = document.getElementById('start-screen');
const startBtn = document.getElementById('start')
const timeDisplay = document.getElementById('time');

// Event listener added to start button, starts the timer as well
startBtn.addEventListener('click',
    function() {
        startBtn.style.display = 'none';
        // Defining the function to update the timer every second
        const countDown = setInterval(() => {
            timeDisplay.innerHTML = timeLimit;
            timeLimit--;
            if (timeLimit < 0) {
                clearInterval(countDown); // stops the timer once it reaches 0
                timeDisplay.innerHTML = 'Time is up!';
            }
        }, 1000);
    }
);



const quizContainer = document.getElementById("quiz");

function buildQuiz() {
  // Loop through each question
  questions.forEach((question, index) => {
    // Create a new div for the question
    const questionDiv = document.createElement("div");
    questionDiv.classList.add("question");

    // Add the question text to the div
    const questionText = document.createElement("p");
    questionText.innerText = question.question;
    questionDiv.appendChild(questionText);

    // Loop through each answer option and create an input element and label
    question.options.forEach((option, optionIndex) => {
      const optionLabel = document.createElement("label");
      optionLabel.innerText = option;

      const optionInput = document.createElement("input");
      optionInput.setAttribute("type", "radio");
      optionInput.setAttribute("name", `q${index}`);
      optionInput.setAttribute("value", optionIndex);

      // Append the label and input to the question div
      questionDiv.appendChild(optionInput);
      questionDiv.appendChild(optionLabel);
    });

    // Add the question div to the quiz container
    quizContainer.appendChild(questionDiv);
  });
}
