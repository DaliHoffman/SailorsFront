// fetch data from backend

// production url: https://bitpurplemonkey.herokuapp.com/api/v1/comments

//staging url: https://apistaging22.herokuapp.com/api/v1/comments

let commentBox = document.querySelector(".comments_section");

(async () => {
    const res = await fetch("https://bitpurplemonkey.herokuapp.com/api/v1/comments"); 
    const json = await res.json();
    let commentsData = json['data'];

    commentsData.forEach(commentList => {

        console.log(commentList)
        // making variables to comments and rating data 
        let comments = commentList.comment;
        //console.log(comments);

        let rating = commentList.rating;
        //console.log(rating);

        //the boatramp that the comment is relating to based on data, which is an int
        let boatramp = commentList.boatramp.name; 
        console.log(boatramp);

        let user = commentList.user.name;
        console.log(user);

        // displaying all the comment information 
        let commentBoxDiv = document.createElement("div");
        commentBoxDiv.innerHTML = user + "<br />" + "<br />" + "Boatramp: "+ boatramp + "<br />" + comments + "<br />" + "<br />" + rating + " stars"; 
        //user string being a placeholder for the actual user data for now


        //implementing css styles here
        commentBoxDiv.style.display = "flex";
        commentBoxDiv.style.border = "1px solid grey"; 
        commentBoxDiv.style.borderRadius = "5px"; 
        commentBoxDiv.style.padding = "10px";
        commentBoxDiv.style.margin = "10px";
        commentBoxDiv.style.backgroundColor = "darkgrey";
        
        commentBox.append(commentBoxDiv);

    })

})();

