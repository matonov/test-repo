var DATA_URL = 'https://jsonstorage.net/api/items/aa5ea59c-da25-4c76-a8ad-c8f2cd825b27';

var app = new Vue({
    el: '#app',
    data: {
        jsonData: [],
        cart: 0
    },
    mounted () {
        axios
            .get(DATA_URL)
            .then(response => (this.jsonData = response.data))
    },
    computed: {
        price() {
            return getPrice(this.jsonData.Price, this.jsonData.CurrencyCode);
        },
        oldPrice() {
            return getPrice(this.jsonData.OldPrice, this.jsonData.CurrencyCode);
        },
        discount() {
            return getDiscount(this.jsonData.Discount);
        },
        colorName() {
            return 'červená';
        }
    }
});

function getPrice(priceValue, currencyCode) {
    if (priceValue == null && currencyCode == null) {
        return '';
    }

    return priceValue + (currencyCode === 'EUR' ? '€': currencyCode);
}

function getDiscount(discount) {
    if (discount == null) {
        return '';
    }

    return discount + ' zľava';
}
