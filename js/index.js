document.addEventListener("DOMContentLoaded", () => {
    
const search = document.getElementById('search')
const submitt = document.querySelector("#github-form > input[type=submit]:nth-child(2)")
const user = document.getElementById('user-list')
const repo = document.getElementById('repos-list')

// addeventlistener for the submit button
submitt.addEventListener('click', function(e){
    e.preventDefault()
    fetchUser()
    search.value = ''
})

// function which fetch the data of the search value (input of the user)
function fetchUser(){
    fetch(`https://api.github.com/search/users?q=${search.value}`)
    .then(resp => resp.json())
    .then(data => pushdata(data))
    .catch(err => console.log(err))
}


// function which fetch repo's users we click on.
function fetchRepo(){
    fetch(`https://api.github.com/users/${li.id}/repos`)
    .then(resp => resp.json())
    .then(data => pushrepo(data))
    .catch(err => console.log(err))
}


//function which push the user name, profil's url and avatar
const pushdata = function(data){
 //console.log(data.items)   data.items is passing the object to an array 
 //so I can iterate  with for loop classic
let arrayobj = data.items

for(let i=0;i<arrayobj.length;i++){
    li = document.createElement('li')
    let img = document.createElement('img')
     
    user.appendChild(li)
    user.appendChild(img)
    li.textContent = arrayobj[i].login + '  profil url : ' + arrayobj[i].html_url
    img.src = arrayobj[i].avatar_url
    li.classList = 'lilist'
    li.id = arrayobj[i].login
    console.log(arrayobj[i])
    
    
}
let lilist = document.querySelectorAll('.lilist')
    lilist.forEach(listt => listt.addEventListener('click', function(e){
        console.log(e.value)
        
        // remove ALL the child from the first one to the last.
        // good for deleting UL children
        while(user.firstChild){
            user.removeChild(user.firstChild)
        }
        fetchRepo()
        
    }))
    
}


//function which push the repo's user on the DOM 
const pushrepo = function(data){
 
    // in this case DATA is already array, so I can for through with for loop
   console.log(data)

   for(let i=0;i<data.length;i++){
       let li = document.createElement('li')
       let aa = document.createElement('a') 
       li.appendChild(aa)
       user.appendChild(li)
       aa.setAttribute('href',data[i].clone_url)
       aa.innerHTML = data[i].clone_url
       li.classList = 'lilist'
   }}



});

