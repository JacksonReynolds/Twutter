class Post {
  constructor(post) {
    (this.id = post.id), (this.content = post.content), (this.user = post.user);
    Post.allPosts.push(this);
  }

  static allPosts = [];

  static fetchPosts() {
    fetch("http://localhost:3000/posts")
      .then((res) => res.json())
      .then((posts) => {
        for (const post of posts) {
          new Post(post);
        }
        this.renderPosts();
      });
  }

  renderPost() {
    const postContainer = document.createElement("div");
    postContainer.id = this.id;
    postContainer.className = "post";

    const userName = document.createElement("h3");
    userName.innerHTML = this.user.name;

    const content = document.createElement("p");
    content.innerText = this.content;

    const deleteButton = document.createElement("button");
    deleteButton.innerText = "Delete";
    deleteButton.className = "delete";
    deleteButton.addEventListener("click", () => this.deletePost());

    postContainer.append(userName, content, deleteButton);
    document.querySelector(".post-container").appendChild(postContainer);
  }

  static renderPosts() {
    for (const userPost of this.allPosts) {
      userPost.renderPost();
    }
  }

  static createPost() {
    event.preventDefault();
    const content = document.querySelector(".twit").value;

    fetch("http://localhost:3000/posts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({ content: content }),
    })
      .then((res) => {
        // debugger;
        res.json();
      })
      .then((post) => {
        // console.log(post);
        // debugger;
        const newPost = new Post(post);
        newPost.renderPost();
      });
  }

  deletePost() {
    fetch(`http://localhost:3000/posts/${this.id}`, {
      method: "DELETE",
    }).then(document.getElementById(this.id).remove());
  }
}
