//Create a function to process the query text put into the search bar
function queryRefiner(rawQuery){
    //For ease of formatting, drop all the letters in the query to lowercase
    var processedString = rawQuery.toLowerCase()
    //If there are spaces in the query, meainng multiple words, process the string for searching
    if(rawQuery.indexOf(" ") != -1){
        //Split the query string into an array 
        processedString = processedString.split(" ");
        //Create a result variable to store the processed output
        var readyString = "";
        //Go through the split string and add a "+" between each individual word, ignoring the ending word
        for(var i = 0; i< processedString.length; i++){
            if(i == 0){
                readyString = processedString[i];
            }
            else{
                readyString = readyString + "+" + processedString[i];
            }
        }
        //Return the processed query
        return readyString;    
    }
    //If the query is just one word, return it in lowercase to match in the database
    else{
        return processedString
    }
}

//Create a function to search both the local and API database for the movie that was searched for
const search = async (event) => {
    //Prevent the page from reloading
    event.preventDefault();
    //Find the text entered into the search bar
    const searchQuery = document.querySelector(".search-bar").value.trim();
    //Process the text entered into the search bar
    const query = queryRefiner(searchQuery);
    //If the query is not blank, proceed
    if (query != "") {
        //Set a variable to track if the movie is in the local database
        let localMovieData = ""
        //Pass the query text into the local database and retrieve the data
        try{
            localMovieData = await fetch(`/api/tmdb/movie/local-query/${query}`, {
                 method: 'GET',
             }).then((response) => response.json())
             //If the movie is found in the local database, replace the current page with the search-results-list page with the searched movie
             if(localMovieData.length > 0){
                document.location.replace(`/search-results-list`)
             }
         }
         catch (err) {
             console.log(err)
        }
        //If no movie is found in the local database, query the API database
        if(localMovieData.length == 0){
            try{
                const remoteMovieData = await fetch(`/api/tmdb/movie/remote-query/${query}`, {
                    method: 'GET',
                }).then((response) => response.json())
                //If the movie is found in the local database, replace the current page with the search-results-list page with a list of possible movies
                if(remoteMovieData.results.length > 0){
                    document.location.replace(`/search-results-list`)
                }
                //Of the move is NOT found in the API database, return a message that the movie was not found at all
                else{
                    const errorMessage = document.createElement('div');
                    errorMessage.className = 'alert alert-danger mt-2';
                    errorMessage.innerHTML = 'Movie could not be found. Be sure to check the spelling of the film to ensure it is correct.';
                    document.querySelector('.search-section').appendChild(errorMessage);
                    //Clear the message after 2 seconds
                    setTimeout(() => {
                        errorMessage.remove();
                    }, 2000);
                }   
            }
            catch (err){
                console.log(err)
            }
        }     
    }     
};

//Add an event listener to run the search function
document.querySelector("#search-btn").addEventListener("click", search);