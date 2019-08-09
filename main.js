var dataURL = 'https://jsonstorage.net/api/items/aa5ea59c-da25-4c76-a8ad-c8f2cd825b27';

var app = new Vue({
    el: '#app',
    data: {
        urlData: []
    },
    mounted() {
        var self = this
        $.getJSON(dataURL, function(data) {
            console.log(arguments);
            self.urlData = data;
        });
    }
})