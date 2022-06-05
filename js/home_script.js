let input = document.getElementById("name-input");
let movieUl = document.getElementById("movie-ul");
let moviesDiv = document.getElementById("movies-div");
let errP = document.getElementById("error-p");
let loadMoreBtn = document.getElementById("loadMoreBtn");
let arr = null;
let pageNo = 1;
let totalRes = 0;
let moviesDivStr = "";
let totalArr = [];

// function to go to details page 
function goToDetails(i){
    localStorage.setItem("pageNo", pageNo);
    localStorage.setItem("moviesDivStr", moviesDivStr);
    localStorage.setItem("totalRes", totalRes);
    input.value = "";
    window.location.href = "./movie_details.html?id="+i;
}

// adding to or removing from watchlist
function watchlist(id, elem){
    let favArr = [];
    let favAllDataArr = [];
    let favourites = localStorage.getItem("favouritesIds");
    let favouritesAllDataStr = localStorage.getItem("favouritesAllData");
    if(favourites != null){
        favArr = favourites.split(",");
    }
    if(favouritesAllDataStr != null){
        favAllDataArr = JSON.parse(favouritesAllDataStr);
    }
    // if imdbId id is not present in favid localstorage then push it else delete it from localstorage 
    if(favArr.indexOf(id) == -1){
        favArr.push(id);
        for(let i=0;i<totalArr.length;i++){
            if(totalArr[i].imdbID == id){
                favAllDataArr.push(totalArr[i]);
                break;
            }
        }
        elem.classList.add("fa-solid");
        elem.classList.remove("fa-regular");
    }
    else{
        for(let i=0;i<totalArr.length;i++){
            if(totalArr[i].imdbID == id){
                favAllDataArr.splice(i, 1);
                break;
            }
        }
        favArr.splice(favArr.indexOf(id), 1);
        elem.classList.add("fa-regular");
        elem.classList.remove("fa-solid");
    }
    localStorage.setItem("favouritesIds", favArr.toString());
    localStorage.setItem("favouritesAllData", JSON.stringify(favAllDataArr));
    moviesDivStr = moviesDiv.innerHTML;
}

// getting movie data 
function getMovieData(name, page){
    document.getElementById("loader").style.visibility = "visible";
    var xhrReq = new XMLHttpRequest();
    xhrReq.onload = function() {
        var resJSON = JSON.parse(xhrReq.response);
        if(resJSON.Response == "True"){
            errP.style.display = "none"
            errP.innerText = "";
            arr = resJSON.Search;
            totalArr.push(...arr);
            totalRes += arr.length;
            let favArr = new Array();
            let favourites = localStorage.getItem("favouritesIds");
            if(favourites != null){
                favArr = favourites.split(",");
            }
            for(let i=0;i<arr.length;i++){
                let title = arr[i].Title;
                let poster = "./images/no_image.svg";
                let id = arr[i].imdbID;
                let year = arr[i].Year;
                if(arr[i].Poster != "N/A"){
                    poster = arr[i].Poster;
                }
                if(favArr.indexOf(id) == -1){
                    moviesDivStr += "<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3' style=padding:5px;>"+
                    "<div class=card>"+
                    "<img src="+poster+" onclick=goToDetails('"+id+"') class=card-img-top alt=poster style='width:100%; height:450px;'> "+
                    "<div class=card-body>"+
                    "<p class='row'><span class='col-10' onclick=goToDetails('"+id+"')>"+title+"</span>"+
                    "<span class='col-2'><i onclick=watchlist('"+id+"',this) style=color:red class=\"fa-regular fa-heart\"></i></span></p>"+
                    "<p  onclick=goToDetails('"+id+"') class=card-text>"+year+"</p>"+
                    "</div></div></div>";
                }
                else{
                    moviesDivStr += "<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3' style=padding:5px;>"+
                    "<div class=card>"+
                    "<img src="+poster+" onclick=goToDetails('"+id+"') class=card-img-top alt=poster style='width:100%; height:450px;'> "+
                    "<div class=card-body>"+
                    "<p class='row'><span class='col-10' onclick=goToDetails('"+id+"')>"+title+"</span>"+
                    "<span class='col-2'><i onclick=watchlist('"+id+"',this) style=color:red class=\"fa-solid fa-heart\"></i></span></p>"+
                    "<p  onclick=goToDetails('"+id+"') class=card-text>"+year+"</p>"+
                    "</div></div></div>";
                }
            }
            moviesDiv.innerHTML = moviesDivStr;
            if(totalRes == resJSON.totalResults){
                loadMoreBtn.style.display = "none";
            }
            else{
                loadMoreBtn.style.display = "inline-block";
            }
        }
        else{
            loadMoreBtn.style.display = "none";
            moviesDiv.innerHTML = "";
            errP.style.display = "block"
            errP.innerHTML = resJSON.Error;
            moviesDivStr = "";
        }
        document.getElementById("loader").style.visibility = "hidden";
    };
    xhrReq.open("get", "http://www.omdbapi.com/?apikey=975df2fe&type=movie&page="+page+"&s="+name, true);
    xhrReq.send();
}

// fetching movie data when user inputs a name 
input.addEventListener("input", function(event){
    moviesDivStr = "";
    pageNo = 1;
    totalRes = 0;
    totalArr = [];
    getMovieData(event.target.value, pageNo);
});

// clicking on load more button will fetch the next page movies 
loadMoreBtn.addEventListener("click", function(event){
    pageNo++;
    getMovieData(input.value, pageNo);
});