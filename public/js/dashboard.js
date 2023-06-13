const addPostBtn = document.getElementById("new-post");

const newPost = async () => {
    const response = await fetch(`/dashboard/new`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        document.location.replace(`/dashboard/new`);
    } else {
        alert('Failed to fetch post');
    }
}

addPostBtn.addEventListener("click", function(event) {
    newPost();
});

