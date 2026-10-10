let startButton = document.querySelector("#startButton");
let message = document.querySelector("#message");
let exerciseInput = document.querySelector("#exerciseInput");
let setsInput = document.querySelector("#sets");
let repsInput = document.querySelector("#reps");
let addButton = document.querySelector("#addButton");
let exerciseMessage = document.querySelector("#exerciseMessage");
let exercises = [];


//==============================================

function startNow() {
  startButton.style.backgroundColor = "green";
  message.textContent = "Alright! Let's do this.";
}

startButton.addEventListener("click", startNow);

//============== FUNCTION ADD EXERCISES =================
//======================================================

function addExercise() {
  let exercise = exerciseInput.value;

  if (exercise.trim() === "" || setsInput.value === "" || repsInput.value === "") {
    return;
  }

  let sets = Number(setsInput.value);
  let reps = Number(repsInput.value);

  if (sets <= 0 || reps <= 0) {
    message.style.color = "#e74c3c";
    message.textContent = "Sets and reps must be greater than 0!";
    message.style.fontStyle = "Italic";
    message.style.fontWeight = "200"; 
    return;
  }

  let newWorkout = {
    name: exercise,
    sets: sets,
    reps: reps,
  };

  exercises.push(newWorkout);

  displayExercise();

  exerciseInput.value = "";
  setsInput.value = "";
  repsInput.value = "";
 
}

addButton.addEventListener("click", addExercise);


document.addEventListener("keydown", function (e) {
  if (
    e.key === "Enter" &&
    (e.target === exerciseInput ||
      e.target === setsInput ||
      e.target === repsInput)
  ) {
    addExercise();
  }
});

//======================== FUNCTION DISPLAY EXERCISE =======
//===========================================================

function displayExercise() {
  exerciseMessage.innerHTML = "";
   message.innerHTML = "";

  for (let i = 0; i < exercises.length; i++) {
    let li = document.createElement("li");
    let editButton = document.createElement("Button");
    let deleteButton = document.createElement("button");

    li.textContent =
      exercises[i].name + " - " + exercises[i].sets + " x " + exercises[i].reps;
    
      editButton.textContent = "Edit";
      deleteButton.textContent = "Delete";

    exerciseMessage.appendChild(li);
    li.appendChild(editButton);
    li.appendChild(deleteButton);

    editButton.addEventListener("click", function (){
      editExercise (i);
    })

    deleteButton.addEventListener("click", function () {
      deleteExercise(i);
    });
  }
}

//=====================================
//=================================================

function deleteExercise(index) {
  exercises.splice(index, 1);
  displayExercise();
}


function editExercise (index) {
  
  let workout = exercises [index];

  let newName = prompt("Enter the new exercise name: ");

  workout.name = newName;

  displayExercise ();
}