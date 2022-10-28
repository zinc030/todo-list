window.addEventListener('load', () => {
    const form = document.querySelector("#new-task-form"); //const form contains input field (type="text") and "Create New Task" button (type="submit")
    const input = document.querySelector("#new-task-input"); //const input = input field (type="text")
    const list_el = document.querySelector("#tasks"); //this is div where each div of text(class=task), checkbox, edit and delete button will be displayed
    let incomplete = 0; //this is a counter for number of tasks that are not done
    document.getElementById("numleft").value = incomplete;
    const myArray = [];

    form.addEventListener('submit', (e) => { /*큰 그림을 알려주는 설명서 
                                    할일을 입력하고 Enter를 치거나 "Create New Task" 버튼을 눌렀을 때 어떤 이벤트가 발생할까요?
                                    일단 추가되는 내용이 html에서 class=tasks라는 div에 들어가고, js의 list_el이 곧 html의 class=tasks라는 div인데,
                                    추가되는 내용(실제 화면에 보여지는 한 줄의 todo)에 다음과 같은 element들이 포함되어 있다고 보면 될 것 같아요:
                                    <div id="tasks">   <- const list_el이고, submit할 내용들이 여기에 들어감
                                        <div class="task"> <- addEventListener에서 추가되는 부분은 여기부터 23번째 줄까지. 새 instance마다 10줄~23줄이 추가됨
                                            <input type="checkbox" class="checkbox">
                                            <div class="content">
                                                <input
                                                type="text"
                                                class="text"
                                                value=const task = input.value; 즉  사용자가 입력한 "할일"
                                                readonly/>
                                            </div>
                                            <div class="actions">
                                                <button class="edit">Edit</button>
                                                <button class="delete">Delete</button>
                                            </div>
                                        </div>
                                    </div>
                                */

        e.preventDefault(); //prevents page from reloading
        const task = input.value; //const task holds type="text" submitted from input field

        if (!task){ //if user submits empty field, an alert will pop up
            alert("Please fill out the task");
            return;
        }

        incomplete++;
        document.getElementById("numleft").value = incomplete;
        
        const task_el = document.createElement("div"); //creates a div element which has class=task
        task_el.classList.add("task");
        task_el.completed = false; //task_el.completed is a property of task_el. It is set to false by default.

        const task_checkbox_el = document.createElement("input"); //Checkbox element
        task_checkbox_el.classList.add("checkbox");
        task_checkbox_el.type = "checkbox";
        task_checkbox_el.checked = false;

        task_el.appendChild(task_checkbox_el); //each class=task div contains class=checkbox input element

        const task_content_el = document.createElement("div");
        task_content_el.classList.add("content"); //adds class="content" to div element
        //task_content_el.innerText = task;

        task_el.appendChild(task_content_el);

        const task_input_el = document.createElement("input");  //creates input element with class=text. This is where the text of task is located
        task_input_el.classList.add("text");
        task_input_el.type = "text";
        task_input_el.value = task;
        task_input_el.setAttribute("readonly", "readonly");

        task_content_el.appendChild(task_input_el); //each class=content div contains class=text input element

        const task_actions_el = document.createElement("div"); //task_actions_el 삭제와 수정 버튼을 위한 공간이용
        task_actions_el.classList.add("actions");

        const task_edit_el = document.createElement("button");
        task_edit_el.classList.add("edit");
        task_edit_el.innerText = "Edit"; //"Edit" on  the button

        const task_delete_el = document.createElement("button");
        task_delete_el.classList.add("delete");
        task_delete_el.innerText = "Delete"; //"Delete" on the button

        task_actions_el.appendChild(task_edit_el);
        task_actions_el.appendChild(task_delete_el);  //task_actions_el contains "edit" and "delete" buttons

        task_el.appendChild(task_actions_el);

        list_el.appendChild(task_el);
        input.value = ""; //다음에 task 추가할 때 이전 내용이 또 들어가면 안되기 때문에 input.value를 비워주는 라인! 

        task_checkbox_el.addEventListener('click', () => {
            task_el.completed = !task_el.completed; //completed property is false by default.
            if (task_el.completed){
                task_checkbox_el.checked = true;
                incomplete--;
            } else {
                task_checkbox_el.checked = false;
                incomplete++;
            }
            document.getElementById("numleft").value = incomplete;
        });
        
        task_input_el.addEventListener('dblclick', () => { //사용자가 텍스트를 더블클릭 해서 수정!
            if (task_input_el.hasAttribute("readonly")) {
                task_input_el.removeAttribute("readonly"); //읽기전용 모드 없애줌!
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } 
        });

        task_edit_el.addEventListener('click', () => { //사용자가 Edit을 누름과 동시에 수정모드로 들어가고 버튼이 "Save"로 바뀜
            if (task_input_el.hasAttribute("readonly")) {
                task_input_el.removeAttribute("readonly"); 
                task_input_el.focus();
                task_edit_el.innerText = "Save";
            } else {
                task_input_el.setAttribute("readonly", "readonly"); //읽기전용 모드로 돌려줌!
                task_edit_el.innerText = "Edit";
            }
        });

        task_input_el.addEventListener('keypress', function (e) { //수정가능 상태에서만 Enter키 누르면 저장되면서 버튼도 Save에서 Edit으로 바뀜!
            if (e.key === 'Enter' && !task_input_el.hasAttribute("readonly")) {
                task_input_el.setAttribute("readonly", "readonly");
                task_edit_el.innerText = "Edit";
            }
        });

        task_delete_el.addEventListener('click', () =>{
            list_el.removeChild(task_el);
            incomplete--;
            document.getElementById("numleft").value = incomplete;
        });
        document.getElementById("numleft").value = incomplete;    
    
    
        const task_check_all = document.getElementByID("check-all");
        const task_all = document.getElementByID("all");
        const task_active = document.getElementByID("active");
        const task_completed = document.getElementByID("completed");
        const task_deletedone = document.getElementByID("delete-done");
    
        task_check_all.addEventListener('click', () =>{
            // const divs = Array.prototype.slice.call(document.querySelectorAll('#task'));
            // divs.removeChild(divs.firstChild);
            list_el.parentNode.removeChild(list_el);
        });
    
        task_all.addEventListener('click', () =>{
            const divs = Array.prototype.slice.call(document.querySelectorAll('div'));
    divs.forEach(function () {
      //...
    });filter('all');
        });
    
        task_active.addEventListener('click', () =>{
            const divs = Array.prototype.slice.call(document.querySelectorAll('div'));
            divs.forEach(function () {
              //...
            });filter('active');
        });
    
        task_completed.addEventListener('click', () =>{
            const divs = Array.prototype.slice.call(document.querySelectorAll('div'));
            divs.forEach(function () {
              //...
            });filter('completed');
        });
    
        task_deletedone.addEventListener('click', () =>{
            const divs = Array.prototype.slice.call(document.querySelectorAll('div'));
    divs.forEach(function () {
      //...
    });
        });
    });

});