const BASE_URL = "http://localhost:3000";
const USERS_URL = `${BASE_URL}/users`;
const POSTS_URL = `${BASE_URL}/posts`;
const body = document.querySelector("body");

// document.addEventListener("DOMContentLoaded", () => loadPosts());

const loadPosts = () => {
  fetch(POSTS_URL)
    .then((res) => res.json())
    .then((json) => {
      json.forEach((post) => renderPost(post));
    });
};

const renderPost = (postHash) => {
  const div = document.createElement("div");
  const userName = document.createElement("a");
  const content = document.createElement("p");
  const deleteButton = document.createElement("button");
  const user = (div.className = "post-container");
  // userName.innerHTML = postHash.user.name;
  content.innerText = postHash.content;
  deleteButton.innerText = "Delete";
  // deleteButton.addEventListener("click", deletePost());
  div.appendChild(content);
  div.appendChild(deleteButton);
  div.appendChild(userName);
  body.appendChild(div);
};

loadPosts();
