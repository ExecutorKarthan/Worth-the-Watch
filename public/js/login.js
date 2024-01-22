//Create a function that will log in the user
const reviewerLogin = async (event) => {
    //Prevent the page from reloading on form submission
    event.preventDefault();
    //Collect the data in the user name and password fields
    const username = document.querySelector('#username-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();
    //Assuming a username and password exist, continue the function
    if (username && password) {
        //Query the database and see if the username and hashed password match the database
        const response = await fetch('/api/reviewers/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-Type': 'application/json' },
        });
        //If the username and password match, provide a confirmation message 
        if (response.ok) {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-2';
            successMessage.innerHTML = 'Login Successful';
            document.querySelector('.login-form').appendChild(successMessage);
            //Remove the confirmation message after 1 second
            setTimeout(function () {
                document.location.replace('/dashboard');
            }, 1000);
        } 
        //If the username and password do not match, provide a message citing the lack of login
        else {
            const responseData = await response.json();
            //Provide the user the error message
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger mt-2';
            errorMessage.innerHTML = 'Incorrect email or password';
            document.querySelector('.login-form').appendChild(errorMessage);
            //Have the message fade after 2 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 2000); 
        }
    }
};

//Create an event listener for the submit button to load the reviewerLogin function
document.querySelector('.login-form').addEventListener('submit', reviewerLogin);