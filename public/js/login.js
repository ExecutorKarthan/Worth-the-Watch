const reviewerLogin = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (email && password) {
        const response = await fetch('/api/reviewers/login', {
            method: 'POST',
            body: JSON.stringify({ email,password }),
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

    const name = document.querySelector('#name-signup').value.trim();
    const email = document.querySelector('#email-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (name && email && password) {
        const response = await fetch('/api/reviewers', {
            method: 'POST',
            body: JSON.stringify({ name,email,password }),
            headers: { 'Content-Type': 'application/json' },            
        });

        if (response.ok) {
            document.location.replace('/profile');
        } else {
            alert(response.statusText);
        }
    }
};


document
    .querySelector('.login-form')
    .addEventListener('submit', reviewerLogin);

document
    .querySelector('.signup-form')
    .addEventListener('submit', reviewerSignUp);