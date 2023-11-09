let label = document.getElementById("label");
let shoppingCard =  document.getElementById("shopping-card");

let basket = JSON.parse(localStorage.getItem("data")) || [];


let calculation = () =>{
	let cardIcon = document.getElementById("AmountOfCard");
	cardIcon.innerHTML = basket.map((x)=> x.item).reduce((x,y) => x+y,0);
}

calculation();

let generateCardItems = () =>{
	if(basket.length !==0){
		return(shoppingCard.innerHTML = basket.map((x)=>
		{
			let {id, item } = x;
			let search = shopItemsData.find((y) => y.id ===id) || [];
			let {img, name, price} = search;
			return `
			<div class="cart-item">
				<img width="100" src="${img}" alt="book">
				<div class="details">
					<div class="title-price-x">
						<h4 class="title-price">
							<p class="name">${name}</p>
							<p class="cart-item-price">$ ${price}</p>
						</h4>
						<i onclick="removeItem(${id})" class="bi bi-x-lg"></i>
					</div>
					<div class="buttons">
						<i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
						<div id=${id} class="quantity"> ${item}</div>
						<i onclick="increment(${id})" class="bi bi-plus-lg"></i>
					</div>
					<h3>
					$ ${item * search.price}
					</h3>
				</div>
			</div>
			`
		}).join(""))
	}
	else{
		label.innerHTML = `
		<h2>Card is empty.</h2>
		<a href="index.html">
			<button class="BtnToHome">Back to Home Page.</button>
		</a>
		`;
		shoppingCard.innerHTML = ``;
	}
}

generateCardItems();

let increment = (id) =>{
	let selectedItem = id;
	let search = basket.find((x)=> x.id === selectedItem.id);

	if(search === undefined){
		basket.push({
			id: selectedItem.id,
			item : 1
		})
	}
	else{
		search.item+=1;
	}

	generateCardItems();
	update(selectedItem.id);
	localStorage.setItem("data", JSON.stringify(basket));
}

let decrement = (id) =>{
	let selectedItem = id;
	let search = basket.find((x)=> x.id === selectedItem.id)

	if(search === undefined) return;
	else if(search.item ===0) return;
	else{
		search.item-=1;
	}

	basket = basket.filter((x)=>x.item!==0);

	generateCardItems();
	update(selectedItem.id);
	localStorage.setItem("data", JSON.stringify(basket));
}

let update = (id) =>{
	let search = basket.find((x) => x.id ===id);
	document.getElementById(id).innerHTML = search.item;
	calculation();
	TotalAmount();
}

let removeItem = (id) =>{
	let selectedItem = id;
	basket = basket.filter((x)=>x.id!==selectedItem.id)

	generateCardItems();
	TotalAmount();
	calculation();
	localStorage.setItem("data", JSON.stringify(basket));
}

let clearCart = () =>{
	basket = [];
	generateCardItems();
	calculation();
	localStorage.setItem("data", JSON.stringify(basket))
}

let TotalAmount =()=>{
	if(basket.length !==0){
		let amount = basket.map((x)=>{
			let {item, id} =x;
			let search = shopItemsData.find((y)=>y.id===id) || [];
			return item  * search.price;
		}).reduce((x, y)=>x+y,0);

		label.innerHTML = 
		`
		<h2>Total Bill: $ ${amount}</h2>
		<button class="checkout">Checkout</button>
		<button onclick = "clearCart()" class="removeAll">Clear Cart</button>
		`
	}
	else return;
}

TotalAmount();





