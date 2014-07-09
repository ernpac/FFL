app.controller('MainCTRL', function($scope) {
    $scope.title = 'TCFFL Draft Home';
    $scope.activate = activate;

    function activate() {

    }
});

app.controller('DraftDayClientController', function ($scope, $http, $routeParams) {
    $http.get('/api/Draft/getDraftResults')
    .then(function (data) {
        $scope.currentResults = data.data;
    }, function (ex) {
    });
});

app.controller('PlayerListCTRL', function ($scope, $http, $routeParams, dataService) {
    $scope.title = 'Player Data';
    $scope.positions = [{ 'position': 'QB' }, { 'position': 'RB' }, { 'position': 'WR' }, { 'position': 'TE' }, { 'position': 'DEF' }, { 'position': 'All' }];
    $scope.$apply();
    $scope.selectedItem = 'QB';

    $scope.setInitialData = function () {
        setTimeout(function () {
            dataService
                .getPlayersbyPOS($scope.selectedItem)
                .success(function (data) {
                    $scope.players = data;
                    $scope.count = data.length;
                    $scope.more = $scope.hasMore();
                })
        }, 100);

    }
    $scope.per_page = 20;
    $scope.page = 1;
    $scope.more = true;
    $scope.setInitialData();

    $scope.itemsLimit = function () {
        return $scope.page * $scope.per_page;
    };

    $scope.hasMore = function () {
        return $scope.page < ($scope.players.length / $scope.per_page);
    };

    $scope.showMore = function () {
        $scope.page = $scope.page + 1;
        $scope.more = $scope.hasMore();
    }

    $scope.selectPos = function () {
        if ($scope.selectedItem != 'All') {
            setTimeout(function () {
                dataService
                .getPlayersbyPOS($scope.selectedItem)
                .success(function (data) {
                    $scope.players = data;
                    $scope.count = data.length;
                })
            }, 100);
        } else {
            setTimeout(function () {
                dataService
                    .getPlayers()
                    .success(function (data) {
                        $scope.players = data;
                        $scope.count = data.length;
                    })
            }, 100);
        }
    }
});

app.controller('TeamDataCTRL', function ($scope, $http, dataService) {
    $scope.selected = "";
    $scope.editing = false;
    $scope.adding = false;
    setTimeout(function () {
        dataService
            .getTeams()
            .success(function (data) {
                $scope.teams = data;
            })
    });

    $scope.updateTeam = function (team) {
        setTimeout(function () {
            dataService
                .updateTeam(team)
                .success(function () {
                    $scope.editing = false;
                    toastr.success('Team updated.');
                })
        })
    }
    $scope.addTeam = function (team) {
        setTimeout(function () {
            dataService
                .addTeam(team)
                .success(function () {
                    $scope.adding = false;
                    $scope.teams.push(team);
                    $scope.team = {};
                    toastr.success(team.TeamName + ' successfully added.')
                })
        });
    }
});

app.controller('DraftCTRL', function ($scope, $http, $routeParams, $filter, dataService) {
    $scope.model = [];
    $scope.model.rounds = 18;
    $scope.snake = false;
    $scope.predicate - 'Position'
    $scope.setInitialData = function () {
        dataService
        .getDraftOrder(2014)
        .success(function (data) {
            $scope.model.draftOrder = data;
        })
    };

    $scope.setInitialData();
    $scope.saveOrder = function () {
        dataService.updateDraftOrder($scope.model.draftOrder)
                .success(function () {
                    $scope.setInitialData();
                    toastr.success('Order updated.');
                })
    }

    $scope.showSnake = function (i) {
        if (i == 1) {
            $scope.snake = true;
        } else {
            $scope.snake = false;
        }
    }
});
