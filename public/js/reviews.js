//Create a function to handle adding a review and possibly a movie to the database using the API's returned data
const reviewQueryCreate = async (event) => {
    //Prevent the page from reloading and wiping the data
    event.preventDefault();
    //Collect the movie's information from the HTML to be passed to the database route
    const movie_id = document.querySelector('#title-create').getAttribute("movie_id");
    var poster_path = document.querySelector('#overview').getAttribute("poster_path");
    const body = document.querySelector('#review-create').value.trim();
    const title = document.querySelector('#title-create').innerText
    const overview = document.querySelector('#overview').innerText;
    const releaseDate = document.querySelector('#release-date').innerText
    //If a poster path exists, collect it. If not, set the path to the placeholder image
    if(poster_path.length > 0){
        poster_path = "https://image.tmdb.org/t/p/original"+ poster_path;
    }else{
        poster_path = "/No-Image-Placeholder.svg";
    }
    //Assuming there is data, proceed with the function
    if(title && body && overview && releaseDate) {
        //Set a placeholder to control logic flow
        var movieMissingLocal = true
        //Check the local database to see if the movie is in the local database
        try{
            checkMovie = await fetch(`/api/tmdb/movie/local-query/${title}`, {
                 method: 'GET',
             }).then((response) => response.json())
             //If there is no movie, set the variable to false to skip adding the movie to the local database
             if(checkMovie.length > 0){
                movieMissingLocal = false;
             }
         }
         catch (err) {
             console.log(err)
        }
        //If the movie is missing, add it to the database with a put request and the collected data (lines 6-10)
        if(movieMissingLocal){
            const movieResponse = await fetch('/api/tmdb/create-movie', {
                method: 'POST',
                body: JSON.stringify({ title, overview, releaseDate, movie_id, poster_path}),
                headers: { 'Content-Type': 'application/json' }
            });
            if(movieResponse.ok) {
                console.log('Movie successfully posted!');
            } else {
                alert(movieResponse.statusText);
            }    
        }
        //Regardless of the movie's recent addition or not, add a review to the database for the movie
        if(title && body && overview && releaseDate) {
            const reviewResponse = await fetch('/api/review/create-review', {
                method: 'POST',
                body: JSON.stringify({ title, body, movie_id}),
                headers: { 'Content-Type': 'application/json' }
            });
            //Create a confirmation message if the review was added successfully
            if(reviewResponse.ok) {
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-2';
                successMessage.innerHTML = 'Review successfully posted!';
                document.querySelector('.search-section').appendChild(successMessage);
                //Clear the message after 1 second and redirect to the dashboard
                setTimeout(function () {
                    successMessage.remove();
                    document.location.replace('/dashboard');
                }, 1000);
            } 
            //Create a message citing that the review was not created
            else {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger mt-2';
                errorMessage.innerHTML = 'Error posting review.';
                document.querySelector('.search-section').appendChild(errorMessage);
                //Clear the message after 2 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 2000);
            }
        }
    }
};

//Create a function to handle adding a review and possible a movie to the database assuming the user filled out all the move information
const reviewScratchCreate = async (event) => {
    //Prevent the page from reloading and wiping the data
    event.preventDefault();
    //Collect the movie's information from the HTML to be passed to the database route
    const movie_id = document.querySelector('#title-create').getAttribute("movie_id");
    var poster_path = document.querySelector('#overview').getAttribute("poster_path");
    const body = document.querySelector('#review-create').value.trim();
    const title = document.querySelector('#title-create').value.trim();
    const overview = document.querySelector('#overview').value.trim();
    const releaseDate = document.querySelector('#release-date').value.trim();
    //If a poster path exists, collect it. If not, set the path to the placeholder image
    if(poster_path.length > 0){
        poster_path = "https://image.tmdb.org/t/p/original"+ poster_path;
    }else{
        poster_path = "/No-Image-Placeholder.svg";
    }
    //Assuming there is data, proceed with the function
    if(title && body && overview && releaseDate) {
        //Set a placeholder to control logic flow
        var movieMissingLocal = true
        //Check the local database to see if the movie is in the local database
        try{
            checkMovie = await fetch(`/api/tmdb/movie/local-query/${title}`, {
                 method: 'GET',
             }).then((response) => response.json())
             //If there is no movie, set the variable to false to skip adding the movie to the local database
             if(checkMovie.length > 0){
                movieMissingLocal = false;
             }
         }
         catch (err) {
             console.log(err)
        }
        //If the movie is missing, add it to the database with a put request and the collected data (lines 87-92)
        if(movieMissingLocal){
            const movieResponse = await fetch('/api/tmdb/create-movie', {
                method: 'POST',
                body: JSON.stringify({ title, overview, releaseDate, poster_path}),
                headers: { 'Content-Type': 'application/json' }
            });
            if(movieResponse.ok) {
                console.log('Movie successfully posted!');
            } else {
                alert(movieResponse.statusText);
            }    
        }
        //Regardless of the movie's recent addition or not, add a review to the database for the movie
        if(title && body && overview && releaseDate) {
            //Locate the movie to gets its ID value
            localMovieData = await fetch(`/api/tmdb/movie/local-query/${title}`, {
                method: 'GET',
            }).then((response) => response.json())
            const movie_id = localMovieData[0].id
            //Create a review for the submitted movie
            const reviewResponse = await fetch('/api/review/create-review', {
                method: 'POST',
                body: JSON.stringify({ title, body, movie_id}),
                headers: { 'Content-Type': 'application/json' }
            });
            //Create a confirmation message if the review was added successfully
            if(reviewResponse.ok) {
                const successMessage = document.createElement('div');
                successMessage.className = 'alert alert-success mt-2';
                successMessage.innerHTML = 'Review successfully posted!';
                document.querySelector('.search-section').appendChild(successMessage);
                //Clear the message after 1 second and redirect to the dashboard
                setTimeout(function () {
                    successMessage.remove();
                    document.location.replace('/dashboard');
                }, 1000);
            } 
            //Create a message citing that the review was not created
            else {
                const errorMessage = document.createElement('div');
                errorMessage.className = 'alert alert-danger mt-2';
                errorMessage.innerHTML = 'Error posting review.';
                document.querySelector('.search-section').appendChild(errorMessage);
                //Clear the message after 2 seconds
                setTimeout(() => {
                    errorMessage.remove();
                }, 2000);
            }
        }
    }
};

//Create a function to add another review to a movie present in the database
const addAnotherReview = async (event) => {
    //Prevent the page from reloading and wiping the data
    event.preventDefault();
    //Collect the movie's information from the HTML to be passed to the database route
    const movie_id = document.querySelector('#movie_id').getAttribute("movie_id");
    const body = document.querySelector('#review-create').value.trim();
    const title = document.querySelector('#movie_id').innerText;
    //Assuming there is data, proceed with the function
    if(title && body) {
        //Create a review for the movie and add it to the database
        const reviewResponse = await fetch('/api/review/create-review', {
            method: 'POST',
            body: JSON.stringify({ title, body, movie_id}),
            headers: { 'Content-Type': 'application/json' }
        });
        //Create a confirmation message if the review was added successfully
        if(reviewResponse.ok) {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-2';
            successMessage.innerHTML = 'Review successfully posted!';
            document.querySelector('.search-section').appendChild(successMessage);
        //Clear the message after 1 second and redirect to the dashboard
            setTimeout(function () {
                successMessage.remove();
                document.location.replace('/dashboard');
            }, 1000);
            } 
        //Create a message citing that the review was not created
        else {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger mt-2';
            errorMessage.innerHTML = 'Error posting review.';
            document.querySelector('.search-section').appendChild(errorMessage);
            //Clear the message after 2 seconds
             setTimeout(() => {
                errorMessage.remove();
            }, 2000);
        }
    }
};
//Create a function to handle changing a review's body/comment
const reviewUpdate = async (event) => {
    //Prevent the page from reloading and wiping the data
    event.preventDefault();
    //Collect the movie's information from the HTML to be passed to the database route
    const review_id = document.querySelector('#id_label').getAttribute('review_id');
    const title = document.querySelector('#title-create').innerText;
    const body = document.querySelector('#review-create').value.trim();
    const releaseDate = document.querySelector('#release-date').innerText;
    //Assuming there is data, proceed with the function
    if(title && body && releaseDate) {
        const response = await fetch(`/api/review/${review_id}`, {
            method: 'PUT',
            body: JSON.stringify({ review_id, title, body, releaseDate }),
            headers: { 'Content-Type': 'application/json' }
        });
        //Create a confirmation message if the review was updated successfully
        if(response.ok) {
            const successMessage = document.createElement('div');
            successMessage.className = 'alert alert-success mt-2';
            successMessage.innerHTML = 'Review successfully updated!';
            document.querySelector('.search-section').appendChild(successMessage);
            //Clear the message after 1 second and redirect to the dashboard
            setTimeout(function () {
                successMessage.remove();
                document.location.replace('/dashboard');
            }, 1000);
        } 
        //Create a message citing that the review was not updated
        else {
            const errorMessage = document.createElement('div');
            errorMessage.className = 'alert alert-danger mt-2';
            errorMessage.innerHTML = 'Error updating review.';
            document.querySelector('.search-section').appendChild(errorMessage);
            //Clear the message after 2 seconds
            setTimeout(() => {
                errorMessage.remove();
            }, 2000);
        }
    }
};

//Create a function to delete posts
const reviewDelete = async (event) => {
    //Prevent the page from reloading
    event.preventDefault();
    //Locate the post ID from the HTML
    const id = document.querySelector('#delete-btn').getAttribute('delete_id');
    //Send a request to delete the post
    const response = await fetch(`/api/review/${id}`, {
        method: 'DELETE'
    });
    //Create a confirmation message if the review was deleted successfully
    if(response.ok) {
        const successMessage = document.createElement('div');
        successMessage.className = 'alert alert-success mt-2';
        successMessage.innerHTML = 'Review successfully deleted!';
        document.querySelector('.search-section').appendChild(successMessage);
        //Clear the message after 1 second and redirect to the dashboard
        setTimeout(function () {
            successMessage.remove();
            document.location.replace('/dashboard');
        }, 1000);
    } 
    //Create a message citing that the review delete was unsuccessful
    else {
        const errorMessage = document.createElement('div');
        errorMessage.className = 'alert alert-danger mt-2';
        errorMessage.innerHTML = 'Error deleting review.';
        document.querySelector('.search-section').appendChild(errorMessage);
        //Clear the message after 2 seconds
        setTimeout(() => {
            errorMessage.remove();
        }, 2000);
    }
};

//Detect which type of button is present, then  add an event listener to the proper function
if(document.querySelector('#post-query-btn')){
    document.querySelector('#post-query-btn').addEventListener('click', reviewQueryCreate);
}
if(document.querySelector('#post-scratch-btn')){
    document.querySelector('#post-scratch-btn').addEventListener('click', reviewScratchCreate);
}
if(document.querySelector('#review-btn')){
    document.querySelector('#review-btn').addEventListener('click', addAnotherReview);
}
if(document.querySelector('#edit-review-btn')){
    document.querySelector('#edit-review-btn').addEventListener('click', reviewUpdate);
}
if(document.querySelector('#delete-btn')){
    const delBtns = document.querySelectorAll('#delete-btn')
    delBtns.forEach((button) => {
        button.addEventListener('click', reviewDelete);
    });
}