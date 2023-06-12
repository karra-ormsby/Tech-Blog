const updateBtn = document.querySelector("#update-post-button");
const deleteBtn = document.querySelector("#delete-post");
const blog = document.getElementById("update-post")
const blog_id = blog.getAttribute("data-id");

updateBtn.addEventListener("click", function (event) {
    event.preventDefault();

    const title = document.getElementById("blog-title").value;
    const content = document.getElementById("blog-content").value;

    fetch(`/api/post/${blog_id}`, {
        method: 'PUT',
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
                console.error('Failed to update post');
            }
        })
        .catch(error => {
            console.error('Error', error);
        })
});


deleteBtn.addEventListener("click", function (event) {
    event.preventDefault();

    fetch(`/api/post/${blog_id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
        .then(response => {
            if (response.ok) {
                document.location.replace(`/dashboard`);
            } else {
                console.error('Failed to delete post');
            }
        })
        .catch(error => {
            console.error('Error', error);
        })
});