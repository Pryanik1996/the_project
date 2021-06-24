const $containerAccord = document.querySelector("[data-accord]");

const fetchToAPI = async (method, body) =>
	fetch(`/profile/share`, {
		method,
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(body),
	});

$containerAccord.addEventListener("click", async (e) => {
	const $buyBtn = document.getElementById("buyBtn");
	const $sellBtn = document.getElementById("sellBtn");
	const $sellContainer = document.getElementById("sell");
	const $buyContainer = document.getElementById("buy");

	const $wallet = document.querySelector("[data-wallet]");
	const $progressBar = document.querySelector("[data-progressbar]");
	const $quantity = document.querySelector("[data-quantity]");
	const $yourShare = document.querySelector("[data-yourshares]");

	if (e.target === $buyBtn) {
		let reqData = {};
		reqData.count = $buyContainer.innerText;
		reqData._id = $containerAccord.id;
		reqData.transaction = "buy";

		const request = await fetchToAPI("POST", reqData);

		if (request.ok) {
			const response = await request.json();

			$wallet.innerText = `Wallet - ${response.user.money}$`;
			$progressBar.innerHTML = updateProgressBar(response.user, response.percentShares);
			$quantity.innerText = `Quantity - ${response.share.quantity} pix`;
			$yourShare.innerText = `Your Shares - ${response.user.countShare} pix`;
		}
	}
	if (e.target === $sellBtn) {
		let reqData = {};
		reqData.count = $sellContainer.innerText;
		reqData._id = $containerAccord.id;
		reqData.transaction = "sell";

		const request = await fetchToAPI("POST", reqData);

		if (request.ok) {
			const response = await request.json();

			$wallet.innerText = `Wallet - ${response.user.money}$`;
			$progressBar.innerHTML = updateProgressBar(response.user, response.percentShares);
			$quantity.innerText = `Quantity - ${response.share.quantity} pix`;
			$yourShare.innerText = `Your Shares - ${response.user.countShare} pix`;
		}
	}
});

const updateProgressBar = (user, percentShares) => `
<div class="card my-2">
  <h5 class="card-header">Share</h5>
  <div class="card-body">
    <h5 class="card-title">tut tipo nazvannie akcii</h5>
    <p class="card-text"> Your count of Shares - ${user.countShare}</p>

  </div>

  <div class="progress">
    <div
      class="progress-bar progress-bar-striped progress-bar-animated"
      role="progressbar"
      aria-valuenow="75"
      aria-valuemin="0"
      aria-valuemax="100"
      style="width: ${percentShares}% "
    >${percentShares}%</div>
  </div>
</div>

`;
