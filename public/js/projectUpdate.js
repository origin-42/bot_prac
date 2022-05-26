const updateProject = async (event) => {
    event.preventDefault();

    const title = $('#projectTitle').val();
    const description = $('#projectText').val();
    const projectId = $('.single-projects').attr('id').split("").slice(13).join("");

    const response = await fetch(`/dashboard/projects/${projectId}`, {
        method: 'PUT',
        body: JSON.stringify({ title, description }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to update project.');
    }

}

const deleteProject = async (event) => {
    event.preventDefault();

    const projectId = $('.single-projects').attr('id').split("").slice(13).join("");

    const response = await fetch(`/dashboard/projects/${projectId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace(`/dashboard`);
    } else {
        alert('Failed to delete project.');
    }
}

document.querySelector('#update').addEventListener('click', updateProject);
document.querySelector('#delete').addEventListener('click', deleteProject);