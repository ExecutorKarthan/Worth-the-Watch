const reviewCreate = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-create').value.trim();
    const body = document.querySelector('#review-create').value.trim();
    const overview = document.querySelector('#overview').value.trim();
    const releaseDate = document.querySelector('#release_date').value.trim();


    if(title && body && overview && releaseDate) {
        const response = await fetch('/api/review-routes/', {
            method: 'POST',
            body: JSON.stringify({ title, body, overview, releaseDate }),
            headers: { 'Content-Type': 'application/json' }
        });
        if(response.ok) {
            document.location.replace('/dashboard');
            alert('Review successfully posted!');
        } else {
            alert(response.statusText);
        }
    }
};

document.querySelector('.review-form').addEventListener('submit', reviewCreate);