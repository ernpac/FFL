app.controller('DraftDayCTRL', function ($scope, $http, $routeParams, dataService) {
    toastr.options = {
        "closeButton": true,
        "positionClass": "toast-bottom-right"
    }

    $scope.ct = 0;

//get the current draft pick data
    dataService
        .getCurrents()
        .success(function (data) {
            if (data != null) {
                if (data.CurrentPick < 9) {
                    //$scope.ct = data.CurrentPick;
                    $scope.currentRound = data.CurrentRound;
                    $scope.currentTeamId = data.CurrentTeamId;
                } else {
                    //$scope.ct = 0;
                    $scope.currentRound = data.CurrentRound + 1;
                }
                $scope.overallCount = data.CurrentOverall + 1;
                $scope.currentTeam = true;
            } else {
                $scope.currentRound = 1;
                //$scope.ct = 0;
                $scope.overallCount = 1;
                $scope.currentTeam = false;
            }

        });
    //alert($scope.ct)
    dataService
        .getDraftOrder(new Date().getFullYear())
        .success(function (data) {
            if ($scope.currentTeam) {
                if ($scope.currentRound % 2 == 0) {
                    $scope.draftOrder = data.slice().reverse();
                    $scope.OnTheClock = $scope.draftOrder[$scope.ct]
                } else {
                    $scope.draftOrder = data;
                    $scope.OnTheClock = $scope.draftOrder[$scope.ct]
                }
            } else 
            {
                $scope.OnTheClock = _.first($scope.draftOrder);
            }
            //$scope.$apply();
        });   

    $scope.draftPlayer = function (i) {
        var r = confirm("Are you sure you want to draft this player to " + $scope.OnTheClock.TeamName + "?");
        if (r == true) {
            dataService
                .draftPlayer($scope.OnTheClock.TeamId, i, $scope.overallCount, new Date().getFullYear())
                .success(function () {
                    var current = { 'CurrentTeamId': $scope.OnTheClock.TeamId, 'CurrentOverall': $scope.overallCount, 'CurrentPick': $scope.ct, 'CurrentRound': $scope.currentRound};
                    dataService
                        .updateDraftCurrents(current)
                        .success(function () {
                            $scope.overallCount += 1;

                            if ($scope.ct < 9) {
                                $scope.ct += 1;
                                $scope.OnTheClock = $scope.draftOrder[$scope.ct]
                            } else {
                                $scope.ct = 0;
                                $scope.draftOrder = $scope.draftOrder.slice().reverse();
                                $scope.OnTheClock = $scope.draftOrder[$scope.ct];
                                $scope.currentRound += 1;
                                $scope.$apply();
                            }
                        })
                });

            $scope.loadPlayers();           
        } else {
            return false;
        }
    }


    //get the players
    $scope.title = 'Player Data';
    $scope.positions = [{ 'position': 'QB' }, { 'position': 'RB' }, { 'position': 'WR' }, { 'position': 'TE' }, { 'position': 'K' }, { 'position': 'DEF' }, { 'position': 'All' }];
    $scope.selectedItem = 'QB';
    $scope.loading = true;

    $scope.loadPlayers = function () {
        $scope.loading = true;
        if ($scope.selectedItem != 'All') {
            setTimeout(function () {
                dataService
                .getPlayersbyPOS($scope.selectedItem)
                .success(function (data) {
                    $scope.players = data;
                    $scope.count = data.length;
                    toastr.success('Players loaded...');
                    $scope.loading = false;
                });
            }, 100);
        } else {
            setTimeout(function () {
                dataService
                    .getPlayers()
                    .success(function (data) {
                        $scope.players = data;
                        $scope.count = data.length;
                        toastr.success('Players loaded...');
                        $scope.loading = false;
                    });
            }, 100);
        }
    }
    
    $scope.loadPlayers();

    $scope.selectPos = function () {
        $scope.loadPlayers();
    }

    $scope.resetTeams = [{ Id: 0, Nam: 'Hakan' }, { Id: 1, Nam: 'Boston' }, { Id: 2, Nam: 'Tweeder' }, { Id: 3, Nam: 'Scoregasms' }, { Id: 4, Nam: 'Knoxville' }, { Id: 5, Nam: 'Thorogood' }, { Id: 6, Nam: 'Linesteppers' }, { Id: 7, Nam: 'Southport' }, { Id: 8, Nam: 'Nightstalkers' }, { Id: 9, Nam: 'Desper' }]
    
    $scope.setTeam = function () {
        $scope.ct = $scope.selectedResetTeam.Id;
    }
});