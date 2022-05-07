console.log('im in');
showall();
let starIsOn=false;

// adding a note 
let adding=document.getElementById('adding');
adding.addEventListener("click",function(){
    let heading=document.getElementById('heading');
    let addTxt=document.getElementById('inputTxt');
    let store=localStorage.getItem('store');
    if(store===null){
        noteObj=[];
    }
    else{
        noteObj=JSON.parse(store);
    }
    const newObj={
        heade:heading.value,
        txt:addTxt.value,
        star:false
    };
    noteObj.push(newObj);
    localStorage.setItem('store',JSON.stringify(noteObj));
    heading.value="";
    addTxt.value="";
    showall();
});
////////////////


// show all notes function 
function showall(){
    let store=localStorage.getItem('store');
    if(store===null){
        noteObj=[];
    }
    else{
        noteObj=JSON.parse(store);
    }
    let html="";
    noteObj.forEach(function(elemennt,index){
        btnid="btncheck"+String(index+1);
        html+=`<div class="my-2 mx-2 card"> 
                    <div class="card-body">
                        <h5 class="card-title">${elemennt.heade}</h5>
                        <p class="card-text">${elemennt.txt}</p>
                        <button class="btn btn-danger" id="${index}" onclick="delete_note(this.id)" >DELETE NOTE</button>
                        <div class="btn-group" role="group" aria-label="Basic checkbox toggle button group">
                            <input type="checkbox" class="btn-check " id="${btnid}" autocomplete="on" ${elemennt.star==true?"checked":""} />
                            <label class="btn btn-outline-warning" onclick="staring(${index})" for="btncheck1">Star</label>
                        </div>
                    </div>
                </div>`;
    });
    let noteArea=document.getElementById("notesDisplay");
    if(noteObj.length===0){
        noteArea.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes.`;
    }
    else{
        noteArea.innerHTML=html;
    }
}
///////////////////////////

//function to delete a note
function delete_note(index) {
    let store=localStorage.getItem('store');
    noteObj=JSON.parse(store);
    noteObj.splice(index,1);
    localStorage.setItem('store',JSON.stringify(noteObj));
    showall();
}
//////////////////////

//funciton to star checkbox
function staring(index) {
    let store=localStorage.getItem('store');
    noteObj=JSON.parse(store);
    if(noteObj[index].star===true){
        noteObj[index].star=false;
    }
    else{
        noteObj[index].star=true;
    }
    localStorage.setItem('store',JSON.stringify(noteObj));
    showall();
}
///////////////////////////

//search function
let search=document.getElementById("search");
search.addEventListener("input",function(){
    let searchTxt=search.value.toLowerCase();
    let card=document.getElementsByClassName("card");
    Array.from(card).forEach(function(element){
        let checking=element.getElementsByTagName("p")[0].innerText;
        if(checking.includes(searchTxt)){
            element.style.display = "block";
        }
        else{
            element.style.display = "none";
        }
    });
});
/////////////////////

//stared view
let starEd=document.getElementById("starClick");
starEd.addEventListener("click",function(){
    console.log(starIsOn);
    if(starIsOn===true){
        starIsOn=false;
        let store=localStorage.getItem('store');
        if(store===null){
            noteObj=[];
        }
        else{
            noteObj=JSON.parse(store);
        }
        if(noteObj.length===0){
            noteArea.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes.`;
        }
        else{
            let card=Array.from(document.getElementsByClassName("card"));
            for (let index = 0; index < noteObj.length; index++) {
                card[index].style.display="block";
            }
        }
    }
    else{
        starIsOn=true;
        let store=localStorage.getItem('store');
        if(store===null){
            noteObj=[];
        }
        else{
            noteObj=JSON.parse(store);
        }
        if(noteObj.length===0){
            noteArea.innerHTML=`Nothing to show! Use "Add a Note" section above to add notes.`;
        }
        else{
            let card=Array.from(document.getElementsByClassName("card"));
            for (let index = 0; index < noteObj.length; index++) {
                if(noteObj[index].star===true){
                    card[index].style.display="block";
                }
                else{
                    card[index].style.display="none";
                }
            }
        }
    }
});