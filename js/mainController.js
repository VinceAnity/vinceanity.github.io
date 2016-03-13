app.controller("mainController", function($scope, $http) {
    var ssImageSearchUrl = '';

    $http.get({
        url: 'https://api.shutterstock.com/v2/images/search',
        method: 'GET',
        headers: {
            'Authorization': 'Basic ZGNiN2M3NTU0Y2Q4ZjcwMjk0NmE6MjM5ZDI4M2NiOGRiYmEzN2JjZDI3MmY4MDdmYjQzMjNmZDQ2Mzc0MQ=='
        },
        params: {
            'query': 'drum'
        }
    }).then(function(response) {
        $scope.imageSearch = response.data;
    }, function(response) {
        $scope.imageSearch = response.data;
    });
});
