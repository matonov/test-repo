var dataURL = 'https://jsonstorage.net/api/items/aa5ea59c-da25-4c76-a8ad-c8f2cd825b27';

var app = new Vue({
    el: '#app',
    data: {
        urlData: [],
        cart: 0
    },
    mounted() {
        var self = this
        $.getJSON(dataURL, function(data) {
            console.log(arguments);
            self.urlData = data;
        })
    },
    computed: {
        price() {
            return getPrice(this.urlData.Price, this.urlData.CurrencyCode);
        },
        oldPrice() {
            return getPrice(this.urlData.OldPrice, this.urlData.CurrencyCode);
        },
        discount() {
            return getDiscount(this.urlData.Discount);
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
