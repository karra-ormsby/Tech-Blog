const btn = document.querySelector("#add-comment");
const blog = document.getElementById("blog")
const blog_id = blog.getAttribute("data-id");


btn.addEventListener("click", function (event) {
    event.preventDefault();

    const comment = document.getElementById("blog-comment").value;
    
    console.log(comment)

    const user_id = 1;
    // const blog_id = blogId;

    fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({
            comment,
            user_id,
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