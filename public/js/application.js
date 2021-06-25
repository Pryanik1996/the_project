const $buttonPost = document.querySelector("[data-postsContainer]");
console.log($buttonPost);


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
    const newLike = await response.json()
    const $button = $parentDiv.querySelector('[data-likeCount]')
    const $disLikeCount = $parentDiv.querySelector('[data-disLikeCount')
    if($button) {
      $button.innerText = `${newLike.likes.length}`
      $disLikeCount .innerText = `${newLike.dislikes.length}`
    } else {
      $disLikeCount .innerText = `${newLike.dislikes.length}`
      $button.innerText = `${newLike.likes.length}`
    }
  }
});
