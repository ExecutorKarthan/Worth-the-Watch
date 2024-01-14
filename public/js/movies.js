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

        // try{
        //     const localMovieData = await fetch('/movie/query', {
        //         method: 'GET',
        //     });
        // }
        // catch (err) {
        //     console.log(err)
        // }

        //if(localMovieData){

            try{
                const remoteMovieData = await fetch(`/api/tmdb/movie/remote-query/${query}`, {
                    method: 'GET',
                }).then((response) => response.json())
                console.log(remoteMovieData)
                console.log(remoteMovieData.results.length)
                if(remoteMovieData.results.length > 0){
                    document.location.replace(`/search-results-list`)
                }
            }
            catch (err){
                console.log(err)
            }
            
                //create db entry
                // const response = await fetch('/api/reviewers/logout', {
                //     method: 'POST',
                //     body: JSON.stringify({remoteMovieData}),
                //     headers: { 'Content-Type': 'application/json' },
                // });

                //render to a page
            //} 
            //else {
            //    alert(remoteMovieData.statusText);
            //};
        //} 
        //else {
                  
    }     
};

document.querySelector("#search-btn").addEventListener("click", search);
