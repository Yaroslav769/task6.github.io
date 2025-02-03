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

function updateVisibility() {
    const selectedProduct = document.querySelector("input[name='tovar']:checked");

    if (!selectedProduct) return;

    document.getElementById('select').style.display = selectedProduct.id === 'tov2' ? 'block' : 'none';
    document.getElementById('checkboxes').style.display = selectedProduct.id === 'tov3' ? 'block' : 'none';
}

function calculateTotalPrice() {
    const prices = getPrices();
    let totalPrice = 0;
    const selectedProduct = document.querySelector("input[name='tovar']:checked");

    if (!selectedProduct) {
        alert('Пожалуйста, выберите товар!');
        return;
    }

    totalPrice += prices.goods[parseInt(selectedProduct.value)];

    if (selectedProduct.id === 'tov2') {
        const selectedOption = document.querySelector('#select select')?.value;  
        if (selectedOption) {
            totalPrice += prices.prodOptions[selectedOption] || 0;
        }
    }

    if (selectedProduct.id === 'tov3') {
        document.querySelectorAll('#checkboxes input:checked').forEach(checkbox => {
            totalPrice += prices.prodProperties[checkbox.name] || 0;
        });
    }

    const quantityInput = document.getElementById('kol').value;
    if (!/^[1-9][0-9]*$/.test(quantityInput)) {
        alert('Введите корректное количество товара!');
        return;
    }

    totalPrice *= parseInt(quantityInput);
    document.getElementById('result').textContent = `Итоговая стоимость: ${totalPrice.toLocaleString()} рублей`;
}

window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('button').addEventListener('click', calculateTotalPrice);
    document.querySelectorAll("input[name='tovar']").forEach(radio => radio.addEventListener('change', updateVisibility));

    updateVisibility();
});
