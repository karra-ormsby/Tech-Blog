 const btn = document.querySelector("#create-post");



btn.addEventListener("click", function (event) {
    event.preventDefault();

    const title = document.getElementById("blog-title").value;
    const content = document.getElementById("blog-content").value;

    if (title === '' || content === '') {
        alert ("Please make sure to enter both a title and content to your post before clicking 'Create'");
    } else {
        fetch('/api/post', {
            method: 'POST',
            body: JSON.stringify({
                title,
                content,
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
    }
});