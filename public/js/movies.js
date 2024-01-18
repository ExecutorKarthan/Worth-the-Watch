function queryRefiner(rawQuery){
    var processedString = rawQuery.toLowerCase()
    if(rawQuery.indexOf(" ") != -1){
        processedString = processedString.split(" ");
        var readyString = "";
        for(var i = 0; i< processedString.length; i++){
            if(i == 0){
                readyString = processedString[i];
            }
            else{
                readyString = readyString + "+" + processedString[i];
            }
        }
        return readyString;    
    }
    else{
        return processedString
    }
}

const search = async (event) => {
    event.preventDefault();
    const searchQuery = document.querySelector(".search-bar").value.trim();
    const query = queryRefiner(searchQuery);
    if (query != "") {
        let localMovieData
        try{
            localMovieData = await fetch(`/tmdb/movie/local-query/${query}`, {
                 method: 'GET',
             }).then((response) => response.json())
         }
         catch (err) {
             console.log(err)
        }

        if(!localMovieData){

            try{
                const remoteMovieData = await fetch(`/api/tmdb/movie/remote-query/${query}`, {
                    method: 'GET',
                }).then((response) => response.json())
                if(remoteMovieData.results.length > 0){
                    document.location.replace(`/search-results-list`)
                }
                //Add a message that no movie was found
            }
            catch (err){
                console.log(err)
            }
        }     
    }     
};

document.querySelector("#search-btn").addEventListener("click", search);
