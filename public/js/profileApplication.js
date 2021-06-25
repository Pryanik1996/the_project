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
	const $containerBuy = document.querySelector("[data-accordbuy]");
	const $containerSell = document.querySelector("[data-accordsell]");

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
			$containerBuy.innerHTML = updateAccordBuy(response.share);
			$containerSell.innerHTML = updateAccordSell(response.user);
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
			$containerSell.innerHTML = updateAccordSell(response.user);
			$containerBuy.innerHTML = updateAccordBuy(response.share);
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

const updateAccordBuy = (share) => `
<div class="accordion-body">
  <label for="customRange3" class="form-label">select quantity</label>
  <div><p>Price - ${share.price}$</p></div>
  <div><p data-quantity>Quantity - ${share.quantity} pix</p></div>
    <input
      type="range"
      class="form-range"
      min="0"
      max="${share.quantity}"
      step="1"
      id="customRange3"
      oninput="this.nextElementSibling.value = this.value"
    />
<output id="buy"></output>
<div class="d-flex" style="justify-content:space-between">
  <button id="buyBtn" class="btn btn-primary" type="submit">Buy</button>
</div>
`;

const updateAccordSell = (user) => `
<div class="accordion-body">
<label for="customRange3" class="form-label">select quantity</label>
<div><p data-yourshares>Your Shares - ${user.countShare} pix</p></div>
  <input
    type="range"
    class="form-range"
    min="0"
    max="${user.countShare}"
    step="1"
    value=""
    id="customRange3"
    oninput="this.nextElementSibling.value = this.value"
  />
<output id="sell"></output>
<div class="d-flex" style="justify-content:space-between">
  <button id="sellBtn" class="btn btn-primary" type="submit">Sell</button>
</div>
</div>
`;
