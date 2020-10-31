const posts = document.querySelector(".post-container");
const post = document.querySelector(".post");

function fetchPosts() {
  fetch("http://localhost:3000/posts")
    .then((res) => res.json())
    .then((posts) => renderPosts(posts));
}

function renderPost(post) {
  const postContainer = document.createElement("div");
  postContainer.id = post.id;
  postContainer.className = "post";

  const userName = document.createElement("h3");
  userName.innerHTML = post.user.name;

  const content = document.createElement("p");
  content.innerText = post.content;

  const deleteButton = document.createElement("button");
  deleteButton.innerText = "Delete";
  deleteButton.className = "delete";
  deleteButton.addEventListener("click", () => deletePost(post));

  // const timeStamp = document.createElement("div");
  // timeStamp.innerText = post.created_at;

  postContainer.append(userName, content, deleteButton);
  posts.appendChild(postContainer);
}

function renderPosts(posts) {
  for (let userPost of posts) {
    renderPost(userPost);
  }
}

post.addEventListener("submit", createPost);

function createPost(e) {
  e.preventDefault();
  const content = document.querySelector(".twit").value;

  fetch("http://localhost:3000/posts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ content: content }),
  })
    .then((res) => res.json())
    .then((post) => renderPost(post));
}

function deletePost(post) {
  fetch(`http://localhost:3000/posts/${post.id}`, {
    method: "DELETE",
  }).then((obj = document.getElementById(post.id)), obj.remove());
}

fetchPosts();
