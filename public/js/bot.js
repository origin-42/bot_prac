const query = document.querySelector("#submit")
const text = document.querySelector("#query")
const body = document.querySelector("#body")

const queries = ["I want to create a new medication.", "I need to check the expiry dates of my medications.", "I need to update my medication information.", "I need to login"]
const renderOptions = () => {
    setTimeout(() => {
        let newOption = queries.shift();
        $("#body").append(`<p class="option">${newOption}</p>`);
        if (queries.length != 0) renderOptions()
    }, 2000);
}
setTimeout(() => {
    renderOptions();
}, 1500)

document.querySelector("#body").addEventListener("click", (e) => {
    let userRequest = e.target.innerHTML;
    const option = e.target.getAttribute("class");
    
    if (option === "option") {
        $("#body").append(`<p class="bot"><strong>MedBot</strong> Taking you there.</p>`);
        setTimeout(() => {
            fetch('/', {
                    method: 'POST',
                    body: JSON.stringify({ userRequest }),
                    headers: { 'Content-Type': 'application/json' },
                });
        },1000)
    }
    
})

// Execute a function when the user presses a key on the keyboard
query.addEventListener('click', async function(e) {
    e.preventDefault();

    const userRequest = text.value;

    const request = await fetch('/', {
        method: 'POST',
        body: JSON.stringify({ userRequest }),
        headers: { 'Content-Type': 'application/json' },
    })

    if (request) {
        const serverReply = await request.json();

        if (serverReply.username) {
            $("#body").append(`<p class="user"><strong>${serverReply.username}</strong> ${userRequest}</p>`);
        } else {
            $("#body").append(`<p class="user"><strong>User</strong> ${userRequest}</p>`);
        }
        setTimeout(() => {
            $("#body").append(`<p class="bot"><strong>MedBot:</strong> ${serverReply.botResponse}</p>`);
        }, 1000);

        text.value = "";
    }
})
