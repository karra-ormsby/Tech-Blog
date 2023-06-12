const btn = document.querySelector("#create-post");



btn.addEventListener("click", function (event) {
    event.preventDefault();

    const title = document.getElementById("blog-title").value;
    const content = document.getElementById("blog-content").value;

    console.log(title);
    console.log(content)

    const user_id = 1;

    fetch('/api/post', {
        method: 'POST',
        body: JSON.stringify({
            title,
            content,
            user_id
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            document.location.replace(`/dashboard`);
        } else {
            console.error('Failed to save data');
        }
    })
    .catch(error => {
        console.error('Error', error);
    })
});