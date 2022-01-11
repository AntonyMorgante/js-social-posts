const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];

var likedPosts=[]; // id list of liked posts

function createPost(post){
    let authorImage = ""  
    if (post.author.image == null){ //checks if the author has no profile picture
        let a = post.author.name; 
        let b = a.split(` `); // identifies name and surname of the author
        authorImage =`
        <div class="post-meta__icon profile-pic-default">  
            <span> ` + b[0][0] + ` ` + b[1][0] + `</span>                
        </div>` //uses as profile pic the initials of the author
    } else { //if the post author has a profile pic, visualises it
        authorImage =`
        <div class="post-meta__icon">
            <img class="profile-pic" src="`+ post.author.image +`" alt="`+ post.author.name +`">                    
        </div>`
    }    
    const container = document.querySelector(".posts-list");   
    container.innerHTML +=`
    <div class="post" id="` + post.id + `">
        <div class="post__header">
            <div class="post-meta">` + authorImage + `                   
                <div class="post-meta__data">
                    <div class="post-meta__author">`+ post.author.name +`</div>
                    <div class="post-meta__time">`+ new Date(post.created).toLocaleDateString(`en-GB`) +`</div>
                </div>                    
            </div>
        </div>
        <div class="post__text">`+ post.content +`</div>
        <div class="post__image">
            <img src="`+ post.media +`" alt="">
        </div>
        <div class="post__footer">
            <div class="likes js-likes">
                <div class="likes__cta">
                    <div class="like-button  js-like-button" data-postid="` + post.id + `">
                        <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                        <span class="like-button__label">Mi Piace</span>
                    </div>
                </div>
                <div class="likes__counter">
                    Piace a <b id="like-counter-1" class="js-likes-counter">`+ post.likes +`</b> persone
                </div>
            </div> 
        </div>            
    </div>`;
}

function likeAction(id){ 
    likedPosts.push(id); 
    posts[id -1].likes +=1;
    postLikes[id -1].innerHTML=posts[id -1].likes;
}

function unlikeAction(id){
    likedPosts = likedPosts.filter(function(value, index, likedPosts){
        return value != id;
    })
    posts[id -1].likes -=1;
    postLikes[id -1].innerHTML=posts[id -1].likes;
}

function likedPost(){
    this.classList.toggle("like-button--liked");
    let id = parseInt(this.dataset.postid);
    if (this.classList.contains("like-button--liked")){ //checks if it's a like or unlike action
        likeAction(id);
    } else {
        unlikeAction(id);
    }

}

for (let i=0;i<posts.length;i++){
    createPost(posts[i]); 
}

var likeButtons = document.querySelectorAll(".like-button");
var postLikes = document.querySelectorAll(".js-likes-counter");

for (let i=0; i<likeButtons.length;i++){
    likeButtons[i].addEventListener("click", likedPost);
}