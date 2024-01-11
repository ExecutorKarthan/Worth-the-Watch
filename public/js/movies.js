const search = () => {
    const searchQuery = document.querySelector(".search-bar").value.trim();

    if (searchQuery !== null) {
        // needs specific path
            document.location.replace(`/${searchQuery}`);
        } 
    };

document.querySelector(".search-btn").addEventListener("click", search);
