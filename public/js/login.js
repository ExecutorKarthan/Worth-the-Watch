const reviewerLogin = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    if (username && password) {
        const response = await fetch('/api/reviewers/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        if (response.ok) {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-2';
            successMessage.innerHTML = 'Login Successful';
            document.querySelector('.login-form').appendChild(successMessage);


            setTimeout(function () {
                document.location.replace('/dashboard');
            }, 1000);
        } else {
            const responseData = await response.json();


            if (response.status === 401 && responseData.message.includes('Incorrect email or password')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger mt-2';
                errorMessage.innerHTML = 'Incorrect email or password';
                document.querySelector('.signup-form').appendChild(errorMessage);


                setTimeout(() => {
                    errorMessage.remove();
                }, 2000);
            } else {
                alert(responseData.message);
            }
        }
    }
};

document.querySelector('.login-form').addEventListener('submit', reviewerLogin);