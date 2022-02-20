// SELECTORS
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");
const addButton = document.getElementById("add-btn");
const Completecounter = document.getElementById("task-count");
const clearButton = document.getElementById("clear-btn");
const modeButton = document.getElementById("mode-btn");


//counter for completed  task and pending  task intially at 0
let taskCompleteCount = 0;
let pendingTaskCount = 0;
Completecounter.innerText = `Completed Tasks : ${taskCompleteCount} | Pending Task: ${pendingTaskCount}`; // for display completed and pending




// class names
const CHECK = "fa-check-circle"; // for circle  html checkbox  style is not good
const UNCHECK = "fa-circle-thin"; // for green circle  with checked mark
const LINE_THROUGH = "lineThrough"; // line through 

//variables
// LIST array for storng id   job and done status 
let LIST = [],
    id = 0;

// date for displaying current date according to locale
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);


//function

//----------------------------  function addToDo----------------------------------------
function addToDo(_toDo, id, done, trash) {


    if (trash) {
        return;
    }

    const DONE = done ? CHECK : UNCHECK;
    const LINE = done ? LINE_THROUGH : "";
    const item = `<li class="item" ><i class="fa ${DONE} co" job="complete" id= ${id}></i>
                  <p class="text ${LINE}">  ${_toDo}</p > 
                  <i class="fa fa-trash-o de" job="delete" id=${id}></i></li> `;
    const position = "beforeend";
    list.insertAdjacentHTML(position, item); // insert adjacent for injecting html . can use append child but thats more lengthy so i choose this method over that



}
//------------------------------- adding event listner to plus icon so it can act as adding task item button------------------------------

addButton.addEventListener('click', function() {

    const _toDo = input.value;
    if (_toDo) {
        pendingTaskCount++; // increasing the pending count
        Completecounter.innerText = `Completed Tasks : ${taskCompleteCount} | Pending Task: ${pendingTaskCount}`;
        addToDo(_toDo);
        LIST.push({
            name: _toDo,
            id: id,
            done: false,
            trash: false
        });
    }
    // this will clear the input one the task has been added to the list
    input.value = '';
});


//complete to do
function completeToDo(element) {


    // for togglling the check uncheck and line through classes


    element.classList.toggle(CHECK);

    element.classList.toggle(UNCHECK);





    // moving to parent node to select the  text class 
    element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);
    // setting done to false if it was true or setting true if it was false
    LIST[element.id].done = LIST[element.id].done ? false : true;


}

//------------------------------------------- remove to do item------------------------------------
function removeToDo(element) {
    // moving to element grandparent node and removing its child
    // in simple way from trash icon to >li > ul
    // then removing ul< li so removing its child

    element.parentNode.parentNode.removeChild(element.parentNode);
    // setting trash== true
    LIST[element.id].trash = true;
}


//-------------------------------------- targetting item created dynamically-----------------------------

list.addEventListener('click', function(event) {

    const element = event.target; // return the clicked element inside the list
    const elementJob = element.attributes.job.value; //compelete or delete
    let elementStatus = element.classList;



    // if job is complete call complete todo
    // if job is delete call the remove todo
    if (elementJob == "complete") {



        taskCompleteCount++; // increasing the counter of compeleted and decreasing the counter of pending ones
        if (pendingTaskCount > 0) {
            pendingTaskCount--;
        }
        Completecounter.innerText = `Completed Tasks : ${taskCompleteCount} | Pending Task: ${pendingTaskCount}`;


        completeToDo(element);




    } else if (elementJob == "delete") {
        if (pendingTaskCount > 0) {
            pendingTaskCount--;

        }
        Completecounter.innerText = `Completed Tasks : ${taskCompleteCount} | Pending Task: ${pendingTaskCount}`;
        removeToDo(element);
    }

})

//----------------------------------------------refresh button -------------------------------------------
clearButton.addEventListener("click", function() {

        pendingTaskCount = 0;
        taskCompleteCount = 0;
        Completecounter.innerText = `Completed Tasks : ${taskCompleteCount} | Pending Task: ${pendingTaskCount}`;
        list.innerHTML = "";
        input.value = '';


    })
    //   day night mode switcher

modeButton.addEventListener('click', modeSwitch);

function modeSwitch() {


    document.body.classList.toggle("dark");
}