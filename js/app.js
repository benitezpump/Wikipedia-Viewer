/**
 * Created by carlos on 24/08/15.
 */

var app = angular.module('wikipediaViewer',[]);

app.controller('viewer', ['$http', function ($http) {
    
    var search = this;

    search.resultados = [];
    search.title = '';

    this.wikiSearch = function () {
        if(arguments.length == 0 || arguments[0].charCode == 13){
            search.resultados = [];
            $http.jsonp('https://en.wikipedia.org/w/api.php?action=query&generator=search&gsrsearch='+search.title+'&format=json&gsrprop=snippet&prop=info&inprop=url&callback=JSON_CALLBACK').success(function (data) {
                for (key in data.query.pages) {
                    search.resultados.push(data.query.pages[key]);
                }
                search.resultados.forEach(function (item) {
                    $http.jsonp('https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exchars=100&exintro=&explaintext=&titles='+item.title+'&callback=JSON_CALLBACK').success(function (data) {
                        for (key in data.query.pages) {
                            item.extract = data.query.pages[key].extract;

                        }
                    });
                });

            });
        }
    };

}]);
