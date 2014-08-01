var MainCTRL = function () {
    var _this = this;

    _this.title = 'TCFFL Draft Home';
};
app.controller('MainCTRL', MainCTRL);

var DraftDayClientController = function ($http, $scope, signalRDraftSvc, $rootScope) {
    var _this = this;
    $http.get('/api/Draft/getDraftResults')
    .then(function (data) {
        _this.currentResults = data.data;
    }, function (ex) {
    });

    signalRDraftSvc.initialize();

    $scope.$parent.$on('updateBoard', function (e, player) {
        $scope.$apply(function () {
            _this.currentResults.unshift(player);
        });
    });
};
app.controller('DraftDayClientController', DraftDayClientController);

var PlayerListCTRL = function (dataService) {
    var _this = this;
    _this.title = 'Player Data';
    _this.positions = [{ 'position': 'QB' }, { 'position': 'RB' }, { 'position': 'WR' }, { 'position': 'TE' }, { 'position': 'DEF' }, { 'position': 'All' }];
    _this.selectedItem = 'QB';

    _this.setInitialData = function () {
        setTimeout(function () {
            dataService
                .getPlayersbyPOS(_this.selectedItem)
                .success(function (data) {
                    _this.players = data;
                    _this.count = data.length;
                    _this.more = _this.hasMore();
                })
        }, 100);

    }
    _this.per_page = 20;
    _this.page = 1;
    _this.more = true;
    _this.setInitialData();

    _this.itemsLimit = function () {
        return _this.page * _this.per_page;
    };

    _this.hasMore = function () {
        return _this.page < (_this.players.length / _this.per_page);
    };

    _this.showMore = function () {
        _this.page = _this.page + 1;
        _this.more = _this.hasMore();
    }

    _this.selectPos = function () {
        if (_this.selectedItem != 'All') {
            setTimeout(function () {
                dataService
                .getPlayersbyPOS(_this.selectedItem)
                .success(function (data) {
                    _this.players = data;
                    _this.count = data.length;
                })
            }, 100);
        } else {
            setTimeout(function () {
                dataService
                    .getPlayers()
                    .success(function (data) {
                        _this.players = data;
                        _this.count = data.length;
                    })
            }, 100);
        }
    }
};
app.controller('PlayerListCTRL', PlayerListCTRL);

var TeamDataCTRL = function (dataService) {
    var _this = this;
    _this.editing = false;
    _this.adding = false;
    setTimeout(function () {
        dataService
            .getTeams()
            .success(function (data) {
                _this.teams = data;
            })
    });

    _this.updateTeam = function (team) {
        setTimeout(function () {
            dataService
                .updateTeam(team)
                .success(function () {
                    _this.editing = false;
                    toastr.success('Team updated.');
                })
        })
    }
    _this.addTeam = function (team) {
        setTimeout(function () {
            dataService
                .addTeam(team)
                .success(function () {
                    _this.adding = false;
                    _this.teams.push(team);
                    _this.team = {};
                    toastr.success(team.TeamName + ' successfully added.')
                })
        });
    }
};
app.controller('TeamDataCTRL', TeamDataCTRL);

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
