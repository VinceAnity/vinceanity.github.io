app.controller("mainController", function($scope, $http) {
    var ssImageSearchUrl = 'https://api.shutterstock.com/v2/images/search';
    var authToken = 'Basic ZGNiN2M3NTU0Y2Q4ZjcwMjk0NmE6MjM5ZDI4M2NiOGRiYmEzN2JjZDI3MmY4MDdmYjQzMjNmZDQ2Mzc0MQ==';

    $http.get({
        url: ssImageSearchUrl,
        method: 'GET',
        headers: {
            'Authorization': authToken
        },
        params: {
            'query': 'drum'
        }
    }).then(function success(response) {
        $scope.imageSearch = response.data;
    }, function failure(response) {
        $scope.imageSearch = response.data;
    });
});
