const makeComment = async (event) => {
    event.preventDefault();

    const comment = $("#commentText").val().trim();
    const projectId = $(`.currentProject`).attr('id').split("").slice(8).join("").trim();
    const usernameData = $(`#makeComment`).attr('data-username').trim();
    
    const response = await fetch('/api/users/comment', {
        method: 'POST',
        body: JSON.stringify({ comment, projectId, usernameData }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/projects/${projectId}`);
    } else {
        alert('Failed to log in.');
    }

}

let displayed = false;
const showComments = async () => {
   
    if (!displayed) {
        $('#makeComment').css("display", "flex");
        displayed = true
    } else {
        $('#makeComment').css("display", "none");
        displayed = false
    }
    
}

document.querySelector('#comment').addEventListener('click', makeComment);
document.querySelector('.currentProject').addEventListener('click', showComments);