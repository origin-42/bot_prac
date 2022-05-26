const makeProject = async (event) => {
    event.preventDefault();

    const title = $("#projectTitle").val().trim();
    const text = $("#projectText").val().trim();
    const user = $(".currentUserProjects").attr('id').slice(8);
  
    const response = await fetch('/api/users/projects', {
        method: 'POST',
        body: JSON.stringify({ title, text, user }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/dashboard/`);
    } else {
        alert('Failed to create project.');
    }

}

let displayed = false;
const showProjects = async () => {
   
    if (!displayed) {
        $('#makeProject').css("display", "flex");
        displayed = true
    } else {
        $('#makeProject').css("display", "none");
        displayed = false
    }
    
}

document.querySelector('#create').addEventListener('click', makeProject);
document.querySelector('#newPost').addEventListener('click', showProjects);