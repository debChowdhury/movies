let moviesDiv = document.getElementById("movies-div");
let arr = null;
let pageNo = 1;
let totalRes = 0;
let moviesDivStr = "";

function goToDetails(id){
    window.open("./movie_details.html?id="+id,'_blank');
}

//removing from fav list
function removeFromFav(id){
    //fav ids stored in local storage
    let favouritesIdStr = localStorage.getItem("favouritesIds");
    let favIdArr = favouritesIdStr.split(",")
    //all data related to fav ids are fetched from local storage
    let favouritesAllDataStr = localStorage.getItem("favouritesAllData");
    let favAllDataArr = JSON.parse(favouritesAllDataStr);
    for(let i in favAllDataArr){
        if(favAllDataArr[i].imdbID == id){
            favAllDataArr.splice(i, 1);
            break;
        }
    }
    favIdArr.splice(favIdArr.indexOf(id), 1);
    localStorage.setItem("favouritesIds", favIdArr.toString());
    localStorage.setItem("favouritesAllData", JSON.stringify(favAllDataArr));
    moviesDivStr = "";
    for(let jsonData of favAllDataArr){
        let poster = "./images/no_image.svg";
        let id = jsonData.imdbID;
        let title = jsonData.Title;
        let year = jsonData.Year;
        if(jsonData.Poster != "N/A"){
            poster = jsonData.Poster;
        }
        moviesDivStr += "<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3' style=padding:5px;>"+
        "<div class=card>"+
        "<img src="+poster+" onclick=goToDetails('"+id+"') class=card-img-top alt=poster style='width:100%; height:450px;'> "+
        "<div class=card-body>"+
        "<p class='row'><span class='col-10' onclick=goToDetails('"+id+"')>"+title+"</span>"+
        "<span class='col-2'><i onclick=removeFromFav('"+id+"') style=color:red class=\"fa-solid fa-heart\"></i></span></p>"+
        "<p  onclick=goToDetails('"+id+"') class=card-text>"+year+"</p>"+
        "</div></div></div>";
    }
    moviesDiv.innerHTML = moviesDivStr;
}
let favArr = [];
// fetching all fav data from local storage
let favouritesAllDataStr = localStorage.getItem("favouritesAllData");
if(favouritesAllDataStr != null){
    let favAllDataArr = JSON.parse(favouritesAllDataStr);
    for(let i in favAllDataArr){
        let poster = "./images/no_image.svg";
        let id = favAllDataArr[i].imdbID;
        let title = favAllDataArr[i].Title;
        let year = favAllDataArr[i].Year;
        if(favAllDataArr[i].Poster != "N/A"){
            poster = favAllDataArr[i].Poster;
        }
        moviesDivStr += "<div class='col-sm-12 col-md-6 col-lg-4 col-xl-3' style=padding:5px;>"+
        "<div class=card>"+
            "<img src="+poster+" onclick=goToDetails('"+id+"') class=card-img-top alt=poster style='width:100%; height:450px;'> "+
            "<div class=card-body>"+
            "<p class='row'><span class='col-10' onclick=goToDetails('"+id+"')>"+title+"</span>"+
             "<span class='col-2'><i onclick=removeFromFav('"+id+"') style=color:red class=\"fa-solid fa-heart\"></i></span></p>"+
                "<p  onclick=goToDetails('"+id+"') class=card-text>"+year+"</p>"+
            "</div></div></div>";
    }
    moviesDiv.innerHTML = moviesDivStr;
}