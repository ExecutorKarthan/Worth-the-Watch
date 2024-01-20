const reviewQueryCreate = async (event) => {
    event.preventDefault();
    
    const movie_id = document.querySelector('#title-create').getAttribute("movie_id");
    var poster_path = document.querySelector('#overview').getAttribute("poster_path");
    const body = document.querySelector('#review-create').value.trim();
    const title = document.querySelector('#title-create').innerText
    const overview = document.querySelector('#overview').innerText;
    const releaseDate = document.querySelector('#release-date').innerText

    if(poster_path.length > 0){
        poster_path = "https://image.tmdb.org/t/p/original"+ poster_path;
    }else{
        poster_path = "/No-Image-Placeholder.svg";
    }
    console.log(title, movie_id, poster_path, overview, releaseDate, body)
    if(title && body && overview && releaseDate) {
        var movieMissingLocal = true
        try{
            checkReviews = await fetch(`/api/tmdb/movie/local-query/${title}`, {
                 method: 'GET',
             }).then((response) => response.json())
             if(checkReviews.length > 0){
                movieMissingLocal = false;
             }
         }
         catch (err) {
             console.log(err)
        }

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
        

        if(title && body && overview && releaseDate) {
            const reviewResponse = await fetch('/api/review/create-review', {
                method: 'POST',
                body: JSON.stringify({ title, body, movie_id}),
                headers: { 'Content-Type': 'application/json' }
            });
            if(reviewResponse.ok) {
                document.location.replace('/dashboard');
                alert('Review successfully posted!');
            } else {
                alert(reviewResponse.statusText);
            }
        }
    }
};

const reviewScratchCreate = async (event) => {
    event.preventDefault();

    console.log("reviewScratch button clicked")

    const movie_id = document.querySelector('#title-create').getAttribute("movie_id");
    var poster_path = document.querySelector('#overview').getAttribute("poster_path");
    const body = document.querySelector('#review-create').value.trim();
    const title = document.querySelector('#title-create').value.trim();
    const overview = document.querySelector('#overview').value.trim();
    const releaseDate = document.querySelector('#release-date').value.trim();

    if(poster_path.length > 0){
        poster_path = "https://image.tmdb.org/t/p/original"+ poster_path;
    }else{
        poster_path = "/No-Image-Placeholder.svg";
    }

    console.log(title, movie_id, poster_path, overview, releaseDate, body)
    if(title && body && overview && releaseDate) {
        var movieMissingLocal = true
        try{
            checkReviews = await fetch(`/api/tmdb/movie/local-query/${title}`, {
                 method: 'GET',
             }).then((response) => response.json())
             if(checkReviews.length > 0){
                movieMissingLocal = false;
             }
         }
         catch (err) {
             console.log(err)
        }

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
        
        if(title && body && overview && releaseDate) {
            localMovieData = await fetch(`/api/tmdb/movie/local-query/${title}`, {
                method: 'GET',
            }).then((response) => response.json())
            const movie_id = localMovieData[0].id
            console.log(localMovieData)
            console.log(localMovieData[0])

            const reviewResponse = await fetch('/api/review/create-review', {
                method: 'POST',
                body: JSON.stringify({ title, body, movie_id}),
                headers: { 'Content-Type': 'application/json' }
            });
            if(reviewResponse.ok) {
                document.location.replace('/dashboard');
                alert('Review successfully posted!');
            } else {
                alert(reviewResponse.statusText);
            }
        }
    }
};

const addAnotherReview = async (event) => {
    event.preventDefault();
    
    const movie_id = document.querySelector('#movie_id').getAttribute("movie_id");
    const body = document.querySelector('#review-create').value.trim();
    const title = document.querySelector('#movie_id').innerText;

        if(title && body) {
            const reviewResponse = await fetch('/api/review/create-review', {
                method: 'POST',
                body: JSON.stringify({ title, body, movie_id}),
                headers: { 'Content-Type': 'application/json' }
            });
            if(reviewResponse.ok) {
                document.location.replace('/dashboard');
                alert('Review successfully posted!');
            } else {
                alert(reviewResponse.statusText);
            }
        }
};



const reviewUpdate = async (event) => {
    event.preventDefault();
    console.log()
    const review_id = document.querySelector('#id_label').getAttribute('review_id');
    const title = document.querySelector('#title-create').innerText;
    const body = document.querySelector('#review-create').value.trim();
    const releaseDate = document.querySelector('#release-date').innerText;
    if(title && body && releaseDate) {
        const response = await fetch(`/api/review/${review_id}`, {
            method: 'PUT',
            body: JSON.stringify({ review_id, title, body, releaseDate }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            document.location.replace('/dashboard');
            alert('Review successfully updated!');
        } else {
            alert(response.statusText);
        }
    }

};

const reviewDelete = async (event) => {
    event.preventDefault();
    const id = document.querySelector('#delete-btn').getAttribute('delete_id');
    const response = await fetch(`/api/review/${id}`, {
        method: 'DELETE'
    });
    if(response.ok) {
        document.location.replace('/dashboard');
        alert('Review successfully deleted!');
    } else {
        alert(response.statusText);
    }
};


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