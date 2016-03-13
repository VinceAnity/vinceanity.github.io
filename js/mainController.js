app.controller("mainController", function($scope, $http) {
    $scope.tinymceOptions = {
        format: 'text',
        setup: function(editor) {
            //Focus the editor on load
            editor.on("change", function() {
                $http({
                    url: 'http://gateway-a.watsonplatform.net/calls/text/TextGetRankedKeywords',
                    method: 'GET',
                    params: {
                        'apikey': 'cd8e58f29967a60d898bdf9810f16a97e0206ad6',
                        'text': $scope.tinymceModel,
                        'outputMode': 'json'
                    }
                }).then(function(response) {
                    var keyword1 = response.data.keywords[0].text;
                    var keyword2 = response.data.keywords[1].text;

                    console.log("keyword1 " + keyword1);
                    console.log("keyword2 " + keyword2);

                    $scope.keywords = keyword1 + " " + keyword2;

                    $http({
                        url: 'https://api.shutterstock.com/v2/images/search',
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic ZGNiN2M3NTU0Y2Q4ZjcwMjk0NmE6MjM5ZDI4M2NiOGRiYmEzN2JjZDI3MmY4MDdmYjQzMjNmZDQ2Mzc0MQ=='
                        },
                        params: {
                            'query': keyword1
                        }
                    }).then(function(response) {
                        $scope.images1 = response.data.data;
                    }, function(response) {
                        console.log("Rip en pièces.");
                    });

                    $http({
                        url: 'https://api.shutterstock.com/v2/images/search',
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic ZGNiN2M3NTU0Y2Q4ZjcwMjk0NmE6MjM5ZDI4M2NiOGRiYmEzN2JjZDI3MmY4MDdmYjQzMjNmZDQ2Mzc0MQ=='
                        },
                        params: {
                            'query': keyword2
                        }
                    }).then(function(response) {
                        $scope.images2 = response.data.data;
                    }, function(response) {
                        console.log("Rip en pièces.");
                    });
                }, function(response) {
                    console.log("Rip en pièces.");
                });
            });
        }
    };
});
