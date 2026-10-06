//assign variable for each action
var form = document.getElementById('addForm');
var taskList = document.getElementById('tasks');
var filter = document.querySelectorAll('[data-filter]');

// Form add event
form.addEventListener('submit', addTask);

//Delete and complete event
taskList.addEventListener('click', removeTask);
taskList.addEventListener('click', completeTask);

//filter event
filter.forEach(btn => btn.addEventListener('click', handleClick));

//function for add new task
function addTask (e){
    e.preventDefault();
    //get input value
    var newTask = document.getElementById('task').value ; 
     //create new li element
    var li = document.createElement('li');
    //add class name for new li element
    li.className = 'list-group-item d-flex align-items-center rounded-2 m-1';

    var checkBox = document.createElement('input');
    checkBox.className = 'check form-check-input me-2';
    checkBox.type = 'checkbox';

    li.appendChild(checkBox);

    var label = document.createElement('label');
    label.className = 'form-check-label';

    //add text node with input value
    label.appendChild(document.createTextNode(newTask));
    li.appendChild(label);

    var deleteBtn = document.createElement('button');

    deleteBtn.className = 'delete btn btn-outline-danger btn-sm ms-auto'

    deleteBtn.appendChild(document.createTextNode('Delete'));

    li.appendChild(deleteBtn);
    // li append on the list element
    taskList.appendChild(li);

    updateCounter();
}

//task remover function
function removeTask(e){
    var count = document.querySelectorAll('#tasks li') .length ;
    if(e.target.classList.contains('delete')){
        if(confirm('Are you sure?')){
            var li = e.target.parentElement;
            li.remove();
            count--;

            updateCounter();
            if(count == 0){
                if(!document.querySelector('#noCompletedTask')){
                   const h1 = document.createElement('h1')
                   h1.id = 'noCompletedTask' ; 
                   h1.textContent = 'NO TASK';
                   h1.className  = 'fs-3 fw-bold text-center text-muted m-4'
                   document.querySelector('.listTask').appendChild(h1);
                } 
            }
        }
    } 
}

//Complete task function
function completeTask(e){
   if(e.target.classList.contains('check')){
    var li = e.target.closest('li');
    li.classList.toggle('complete1')
    var text = e.target.nextElementSibling;//find the label of check box 
    text.classList.toggle('complete');

    updateCounter();
   }
}
// Bootstrap wins over css
function handleClick(e){
    //First remove the message if it exists
    var existMessage = document.querySelector('#noCompletedTask')
    if(existMessage){
        existMessage.remove();
    }
    //complete button
    if(e.target.dataset.filter == 'complete'){
        var checking = document.querySelectorAll('#tasks li');
        var count = 0; 
        checking.forEach(function(check){
            var checkbox = check.querySelector('.check');
            if (checkbox.checked) {
                check.style.display = '';
                check.classList.add('d-flex');
                count ++;
            } else {
                check.style.display = 'none';//set inline style to none
                check.classList.remove('d-flex');//remove bootstrap's flex class then hide non-complete tasks
            }
        });
        if(count == 0){
                //check if the the message already exists
                if(!document.querySelector('#noCompletedTask')){
                   const h1 = document.createElement('h1')
                   h1.id = 'noCompletedTask' ; 
                   h1.textContent = 'NO COMPLETED TASK YET';
                   h1.className  = 'fs-3 fw-bold text-center text-muted m-4'
                   document.querySelector('.listTask').appendChild(h1);
                }
            }
    }
    //All button
    if(e.target.dataset.filter =='all'){
        var checking = document.querySelectorAll('#tasks li');
        var count = 0;
        checking.forEach(function(check){
            var checkbox = check.querySelector('.check')
            check.style.display = '';
            check.classList.add('d-flex');
            count ++;
        });
          if(count == 0){
                //check if the the message already exists
                if(!document.querySelector('#noCompletedTask')){
                   const h1 = document.createElement('h1')
                   h1.id = 'noCompletedTask' ; 
                   h1.textContent = 'NO TASK';
                   h1.className  = 'fs-3 fw-bold text-center text-muted m-4'
                   document.querySelector('.listTask').appendChild(h1);
                }
            }   
    }

    //Active button
    if(e.target.dataset.filter =='active'){
        var checking = document.querySelectorAll('#tasks li');
        var count = 0;
        checking.forEach(function(check){
            var checkbox = check.querySelector('.check');
            
           if (checkbox.checked == false) {
                check.style.display = '';
                check.classList.add('d-flex');
                count ++;
            } else {
                check.style.display = 'none';
                check.classList.remove('d-flex');
            }
        }); 
        //display something in html " NO ACTIVE TASK "
         if(count == 0){
                //check if the the message already exists
                if(!document.querySelector('#noCompletedTask')){
                   const h1 = document.createElement('h1')
                   h1.id = 'noCompletedTask' ; 
                   h1.textContent = 'NO ACTIVE TASK';
                   h1.className  = 'fs-3 fw-bold text-center text-muted m-4'
                   document.querySelector('.listTask').appendChild(h1);
                }
            } 
    }
    updateCounter();
}

//Counting the remaining task
function updateCounter() {
    var counterDisplay = document.getElementById('counter');
    var remaining = document.querySelectorAll('#tasks li');
    var count = 0 ;
    
    remaining.forEach(function(remain) {
        var checkbox = remain.querySelector('.check');
        if (checkbox.checked == false) {
            count++;
        }
    });
    counterDisplay.textContent = count + ' tasks remaining';
}

//Calling update counter b/c when the page refresh its start to count current active remaining tasks
// Initial count on page load
updateCounter();

