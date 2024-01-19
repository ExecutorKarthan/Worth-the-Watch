const reviewCreate = async (event) => {
    event.preventDefault();
    console.log('Button Clicked');
    const title = document.querySelector('#title-create').innerText.trim();
    const overview = document.querySelector('#overview').innerText.trim();
    const releaseDate = document.querySelector('#release-date').innerText.trim()
    const body = document.querySelector('#review-create').value.trim();

    console.log(title, overview, releaseDate, body)

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