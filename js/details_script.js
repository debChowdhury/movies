document.getElementById("data-div").style.visibility = "hidden";
//getting movie data from id
function getMovieData(id){
    var xhrReq = new XMLHttpRequest();
    xhrReq.onload = function() {
        var resJSON = JSON.parse(xhrReq.response);
        if(resJSON.Response == "True"){
            //if no poster is available, then placeholder no_image_found image is shown
            var poster = "./images/no_image.svg";
            if(resJSON.Poster != "N/A"){
                poster = resJSON.Poster;
            }
            document.querySelector("img").src = poster;
            document.getElementById("name").innerHTML = resJSON.Title;
            document.getElementById("plot").innerHTML = resJSON.Plot;
            document.getElementById("metaScore").innerHTML = resJSON.Metascore;
            document.getElementById("actors").innerHTML = resJSON.Actors;
            document.getElementById("boxOffice").innerHTML = resJSON.BoxOffice;
            document.getElementById("released").innerHTML = resJSON.Released;
            document.getElementById("writer").innerHTML = resJSON.Writer;
            document.getElementById("imdbRating").innerHTML = resJSON.imdbRating;
        }
        else{
            alert("No data found");
        }
        document.getElementById("loader").style.visibility = "hidden";
        document.getElementById("data-div").style.visibility = "visible";
    };
    xhrReq.open("get", "https://www.omdbapi.com/?apikey=975df2fe&i="+id, true);
    xhrReq.send();
}
window.onload = function(){
    //getting movie id from url query
    let params = (new URL(document.location)).searchParams;
    let id = params.get("id");
    getMovieData(id);
}