app.controller('DraftDayTeamsController', function ($scope, $http, $routeParams, dataService) {
    $scope.model = [];

    dataService
        .getDraftResults()
        .success(function (data) {
            $scope.model.teams = data;
        });
});