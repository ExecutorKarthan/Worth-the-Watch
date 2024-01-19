const reviewCreate = async (event) => {
    event.preventDefault();

    const title = document.querySelector('#title-create').innerText;
    const movie_id = document.querySelector('#title-create').getAttribute("movie_id");
    const poster_path = document.querySelector('#overview').getAttribute("poster_path");
    const overview = document.querySelector('#overview').innerText;
    const releaseDate = document.querySelector('#release-date').innerText;
    const body = document.querySelector('#review-create').value.trim();

    console.log(title, movie_id, poster_path, overview, releaseDate, body)

    if(title && body && overview && releaseDate) {
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
            body: JSON.stringify({ title, body, overview}),
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

document.querySelector('#post-btn').addEventListener('click', reviewCreate);