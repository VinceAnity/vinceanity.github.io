app.controller("mainController", function($scope, $http) {
    $scope.tinymceOptions = {
        format: 'text',
        setup: function(editor) {
            //Focus the editor on load
            editor.on("change", function() {
                $http({
                    url: 'https://api.aylien.com/api/v1/concepts',
                    method: 'GET',
                    headers: {
                        'X-AYLIEN-TextAPI-Application-ID': '8d91dbab',
                        'X-AYLIEN-TextAPI-Application-Key': "18ebd80c679342549fd098293c0cebcf"
                    },
                    params: {
                        'text': $scope.tinymceModel
                    }
                }).then(function(response) {
                    $scope.status = response.status;
                    $scope.concepts = response.data;

                    var keyword1 = response.data.concepts[Object.keys(response.data.concepts)[0]].surfaceForms[0].string;
                    var keyword2 = response.data.concepts[Object.keys(response.data.concepts)[1]].surfaceForms[0].string;

                    console.log("keyword1 " + keyword1);
                    console.log("keyword2 " + keyword2);

                    $http({
                        url: 'https://api.shutterstock.com/v2/images/search',
                        method: 'GET',
                        headers: {
                            'Authorization': 'Basic ZGNiN2M3NTU0Y2Q4ZjcwMjk0NmE6MjM5ZDI4M2NiOGRiYmEzN2JjZDI3MmY4MDdmYjQzMjNmZDQ2Mzc0MQ=='
                        },
                        params: {
                            'query': keyword1 + " " + keyword2
                        }
                    }).then(function(response) {
                        $scope.images = response.data.data;
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
