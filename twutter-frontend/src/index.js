const post = document.querySelector(".post");

post.addEventListener("submit", Post.createPost);

Post.fetchPosts();
