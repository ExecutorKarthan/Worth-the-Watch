//Create a function that allows users to sign up
const reviewerSignUp = async (event) => {
    //Prevent the page from resetting after data submission
    event.preventDefault();
    //Collect a username and password from the text in the entered fields
    const username = document.querySelector('#username-signup').value.trim();
    const password = document.querySelector('#password-signup').value.trim();
    //If there is a username and password submitted, create a user with those credentials in the database
    if (username && password) {
        const response = await fetch('/api/reviewers/signup', {
            method: 'POST',
            body: JSON.stringify({ username,password }),
            headers: { 'Content-Type': 'application/json' },            
        });
        //If there is a successful user creation event, provide a confirmation message
        if (response.ok) {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-2';
            successMessage.innerHTML = 'Account created successfully';
            document.querySelector('.signup-form').appendChild(successMessage);
            //Delete the confirmation after 2.25 seconds
            setTimeout(function () {
                document.location.replace('/dashboard');
            }, 2250);
        } 
        //If there is NOT a successful user creation, provide the user with that information
        else {
            const responseData = await response.json();
            //Alert the user that their username has already been taken
            if (response.status === 400 && responseData.message.includes('Username already exists')) {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger mt-2';
                errorMessage.innerHTML = 'Username already exists';
                document.querySelector('.signup-form').appendChild(errorMessage);
                //Delete the alert after 2 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 2000);
            } else {
                alert(responseData.message);
            }
        }
    }
};

//Create a link between the submit button the reviewerSignUp function
document.querySelector('.signup-form').addEventListener('submit', reviewerSignUp);