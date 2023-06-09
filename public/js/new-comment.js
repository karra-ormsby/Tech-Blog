const btn = document.querySelector("#add-comment");

btn.addEventListener("click", function (event) {
    event.preventDefault();

    const comment = document.getElementById("blog-comment").value;
    
    console.log(comment)

    const user_id = 1;
    const blog_id = 2;

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
            console.log('Data saved successfully');
            alert("Post Added")
        } else {
            console.error('Failed to save data');
        }
    })
    .catch(error => {
        console.error('Error', error);
    })
});