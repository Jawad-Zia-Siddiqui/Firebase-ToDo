var dbRef = firebase.database().ref();

// function create(){
//           var a = document.getElementById("item").value;
//           var b = document.createTextNode(a);
//           var c = document.createElement("li");
//           c.appendChild(b);

//           document.getElementById("bricks").appendChild(c);
//           document.getElementById("item").value = "";

//           var bt = document.createElement("input");
//           bt.setAttribute("type", "button");
//           bt.setAttribute("id", "one");
//           bt.setAttribute("value", "update");
//           bt.setAttribute("onClick", "update()");
//           document.getElementById("bricks").appendChild(bt);

//           var bt = document.createElement("input");
//           bt.setAttribute("type", "button");
//           bt.setAttribute("id", "two");
//           bt.setAttribute("value", "delete");
//           bt.setAttribute("onClick", "delete()");
//           document.getElementById("bricks").appendChild(bt);



// }

function update(){

var x = document.getElementById("one").value;
}

function signIn(event){
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(function(data){
            localStorage.setItem("uid", JSON.stringify(data.uid));
            window.location.href='./todo.html';
            
        })
        .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)

        // ...
      });
}
function signUp(event){
     event.preventDefault();
     
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    console.log(email + " " + password);
    firebase.auth().createUserWithEmailAndPassword(email, password)
    .then(function(result){
        console.log(result)
        localStorage.setItem("uid", JSON.stringify(result.uid));
        saveDataToDb(result.uid, {
            email: email
        })
        window.location.href='./todo.html';

    }
    )
    .catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        alert(errorMessage)
        // ...
    });
}


function saveDataToDb(uid, obj) {
    dbRef.child("users").child(uid).set(obj)
}



//add todo
 var user = localStorage.getItem("uid");
      user = JSON.parse(user);

        function addTodo(){
            
            var item=document.getElementById("item").value;
            document.getElementById("item").value= '';
            dbRef.child("users").child(user).child("todolist").push(item);
            document.getElementById("list").innerHTML ='';


             dbRef.child("users").child(user).child("todolist").on('child_added', function (data) {
                var a= document.createElement('li');
                a.setAttribute("id", "li");
                var b= document.createTextNode(data.val());
                a.appendChild(b);
               document.getElementById("list").appendChild(a);
               var btn = document.createElement("button");
               var txt = document.createTextNode("update");
               btn.appendChild(txt);
               btn.setAttribute("type", "button");
               
               a.appendChild(btn);
               document.getElementById("list").appendChild(a);
                          })
        }

        function show(){
            dbRef.child("users").child(user).child("todolist").on('child_added', function (data) {
               var a= document.createElement('li');
                var b= document.createTextNode(data.val());
                a.appendChild(b);
                var btn = document.createElement("button");
               var txt = document.createTextNode("update");
               btn.appendChild(txt);
               btn.setAttribute("type", "button");
               
               a.appendChild(btn);
               document.getElementById("list").appendChild(a);
            })
        }