const deleteBtn = document.querySelector("#deleteBtn");
const updateBtn = document.querySelector("#updateBtn");


deleteBtn && deleteBtn.addEventListener("click" , (e)=>{
    e.preventDefault()
    const endpoint =`blogs/${e.target.getAttribute("data-doc")}`;
    fetch(endpoint,{method:'DELETE'})
    .then(response=>response.json())
    .then(data=>{
       location.href = data.redirect;
    })
    .catch(err=>{
        console.log(err)
    })
})

updateBtn && updateBtn.addEventListener("click" , (e)=>{
    e.preventDefault()
    
    const endpoint =`/blogs/update/${e.target.getAttribute("data-doc")}`;
    const formData = getFormData('#updateForm')
    fetch(endpoint,{
        method:'PUT',
        body:JSON.stringify(formData),
        headers: {
            'Content-Type':'application/json',
        },
    })
    .then(data=>{
       location.href = "/blogs";
    })
    .catch(err=>{
        console.log(err)
    })
})

function getFormData(selector){
    return Object.fromEntries(new FormData(document.querySelector(selector)))
}