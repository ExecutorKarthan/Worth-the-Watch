const reviewerLogin = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (username && password) {
        const response = await fetch('/api/reviewers/login', {
            method: 'POST',
            body: JSON.stringify({ username,password }),
            headers: { 'Content-Type': 'application/json' },
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};


const reviewerSignUp = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/reviewers', {
            method: 'POST',
            body: JSON.stringify({ username,password }),
            headers: { 'Content-Type': 'application/json' },            
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};


document.querySelector('.login-form').addEventListener('submit', reviewerLogin);

document.querySelector('.signup-form').addEventListener('submit', reviewerSignUp);