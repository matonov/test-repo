var DATA_URL = 'https://jsonstorage.net/api/items/aa5ea59c-da25-4c76-a8ad-c8f2cd825b27';

var app = new Vue({
    el: '#app',
    data: {
        jsonData: [],
        cart: 0,
        colorsTranslateMap: {
            'čierna': 'black',
            'biela': 'white',
            'červená': 'red',
            'modrá': 'blue',
            'žltá': 'yellow',
            'fialová': 'purple'
        },
        colorName: 'čierna'
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
            return this.colorName;
        },
        colors() {
            if (this.jsonData == null || this.jsonData.params == null) {
                return [];
            }

            return this.jsonData.params[1];
        }
    },
    methods: {
        colorFormatter: function (color) {
            var resultStyle = {};
            var resultColor = this.colorsTranslateMap[color];
            if (resultColor === 'white') {
                resultStyle.border = '1px solid black';
            }
            resultStyle.backgroundColor = resultColor;

            return resultStyle;
        },
        selectColor: function (color) {
            this.colorName = color;
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
