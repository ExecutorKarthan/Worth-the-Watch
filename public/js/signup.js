const reviewerSignUp = async (event) => {
    event.preventDefault();

    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();

    if (username && password) {
        const response = await fetch('/api/reviewers/signup', {
            method: 'POST',
            body: JSON.stringify({ username,password }),
            headers: { 'Content-Type': 'application/json' },            
        });
        if (response.ok) {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-2';
            successMessage.innerHTML = 'Account created successfully';
            document.querySelector('.signup-form').appendChild(successMessage);


            setTimeout(function () {
                document.location.replace('/dashboard');
            }, 2250);
        } else {
            const responseData = await response.json();


            if (response.status === 400 && responseData.message.includes('Username already exists')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger mt-2';
                errorMessage.innerHTML = 'Username already exists';
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

document.querySelector('.signup-form').addEventListener('submit', reviewerSignUp);