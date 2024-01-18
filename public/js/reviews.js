const reviewCreate = async (event) => {
    event.preventDefault();
    const title = document.querySelector('#title-create').value.trim();
    const body = document.querySelector('#review-create').value.trim();
    const overview = document.querySelector('#overview').value.trim();
    const releaseDate = document.querySelector('#release-date').value.trim();

    console.log(title, body, overview, releaseDate)

    if(title && body && overview && releaseDate) {
        const response = await fetch('/api/review/create-review', {
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

document.querySelector('#post-btn').addEventListener('click', reviewCreate);