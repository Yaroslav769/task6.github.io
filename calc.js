function getPrices() {
	return {
		goods: [80000, 126000, 117000, 110000], 
		prodOptions: {
			option1: 30000,
			option2: 40000,
			option3: 50000,
		},
		prodProperties: {
			prop1: 20000,
			prop2: 40000,
		},
	};
}

function update() {
	const radioProduct = document.querySelector("input[name='tovarrr']:checked");

	let selectDiv = document.getElementById('selectt');
	let checkDiv = document.getElementById('checkboxes');

	if (radioProduct) {
		const selectedProductId = radioProduct.id;

		selectDiv.style.display = (selectedProductId === 'tov2') ? 'block' : 'none';
		checkDiv.style.display = (selectedProductId === 'tov3') ? 'block' : 'none';
	}
}

function calculateTotalPrice() {
	let price = 0;
	const prices = getPrices();
	const radioProduct = document.querySelector("input[name='tovarrr']:checked");

	if (!radioProduct) {
		alert('Пожалуйста, выберите товар!');
		return;
	}

	const productIndex = parseInt(radioProduct.value);
	price += prices.goods[productIndex];

	const selectedProductId = radioProduct.id;

	if (selectedProductId === 'tov2') {
		const selectElement = document.querySelector('#selectt select');
		if (selectElement) {
			const selectedOption = selectElement.value;
			const optionPrice = prices.prodOptions[selectedOption];
			if (optionPrice !== undefined) {
				price += optionPrice;
			}
		}
	}

	if (selectedProductId === 'tov3') {
		const checkboxes = document.querySelectorAll('#checkboxes input:checked');
		checkboxes.forEach(function (checkbox) {
			const propPrice = prices.prodProperties[checkbox.name];
			if (propPrice !== undefined) {
				price += propPrice;
			}
		});
	}

	const quantityInput = document.getElementById('kol').value;
	const regular = /^[1-9][0-9]*$/;

	if (!regular.test(quantityInput)) {
		alert('Введите корректное количество товара!');
	} else {
		const quantity = parseInt(quantityInput);
		price *= quantity;

		const resultDiv = document.getElementById('result');
		resultDiv.innerHTML = 'Итоговая стоимость: ' + price.toLocaleString() + ' рублей';
	}
}

window.addEventListener('DOMContentLoaded', function () {
	document.getElementById('btn').addEventListener('click', calculateTotalPrice);
	document.querySelectorAll("input[name='tovarrr']").forEach(function (radio) {
		radio.addEventListener('change', update);
	});

	document.getElementById('selectt').style.display = 'none';
	document.getElementById('checkboxes').style.display = 'none';
});