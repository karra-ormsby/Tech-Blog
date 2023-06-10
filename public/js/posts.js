const blogPost = document.querySelectorAll(".blog-cards");

blogPost.forEach(function (button) {
    button.addEventListener('click', function () {
        var element = event.target;
        var post = element.getAttribute("data-id");
        console.log(post);
    });
});