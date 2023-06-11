const blogPost = document.querySelectorAll(".blog-cards");

blogPost.forEach(function (button) {
    button.addEventListener('click', function () {
        var element = event.target;
        var post = element.getAttribute("data-id");
        console.log(post);
        fetchPost(post);
    });
});

async function fetchPost(id) {
    const response = await fetch(`/api/post/${id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace(`/post/${id}`);
    } else {
        alert('Failed to fetch post');
    }
}