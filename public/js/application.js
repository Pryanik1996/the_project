const $buttonPost = document.querySelector("[data-postsContainer]");


const $postform = document.querySelector("[data-form]");


$buttonPost?.addEventListener("click", async (event) => {
  // event.preventDefault();
  if (event.target.tagName === "BUTTON") {
    const $parentDiv = event.target.closest("[data-id]");
    const { id } = $parentDiv.dataset;
    const { like, dislike } = event.target.dataset;
    const response = await fetch(`/posts/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        id,
        like: Boolean(like),
        dislike: Boolean(dislike),
      }),
    });
    const newLike = await response.json();
    // console.log(newLike, "88");
    const $button = $parentDiv.querySelector("[data-likeCount]");
    const $disLikeCount = $parentDiv.querySelector("[data-disLikeCount");
    if ($button) {
      $button.innerText = `${newLike.likes.length}`;
      $disLikeCount.innerText = `${newLike.dislikes.length}`;
    } else {
      $disLikeCount.innerText = `${newLike.dislikes.length}`;
      $button.innerText = `${newLike.likes.length}`;
    }
  }
});

$postform?.addEventListener("click", async (event) => {
  const dataId = event.target.closest('[data-id]')
const postId = dataId.dataset.id
  const clickBut = event.target
  const buttonDel = clickBut.querySelector('[data-deleteBut]')
  if(event.target.hasAttribute('data-deleteBut')) {
    const response = await fetch(`/posts/edit/${postId}`, {
      method: 'DELETE',
    }) 
    if(response.status === 200) dataId.remove()
  }
  
  console.log(buttonDel)

});
