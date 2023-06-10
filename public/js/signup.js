const signupFormHandler = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#name').value.trim();
    const password = document.querySelector('#password').value.trim();

    console.log(username);
    console.log(password);

    if (name && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });

        console.log(response);

        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to sign up.');
        }
    }
};


document.querySelector('.signup-form').addEventListener('submit', signupFormHandler);