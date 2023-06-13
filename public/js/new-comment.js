const btn = document.querySelector("#add-comment");
const blog = document.getElementById("blog")
const blog_id = blog.getAttribute("data-id");


btn.addEventListener("click", function (event) {
    event.preventDefault();

    const comment = document.getElementById("blog-comment").value;

    fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment,
            blog_id
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    })
    .then(response => {
        if (response.ok) {
            document.location.replace(`/post/${blog_id}`);
        } else {
            console.error('Failed to save data');
        }
    })
    .catch(error => {
        console.error('Error', error);
    })
});