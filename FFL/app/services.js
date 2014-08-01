angular
    .module('app.service.data', [])
    .factory('dataService', [
        '$http',
        function ($http) {
            return {
                getPlayers: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/Players/getPlayers/'
                    });
                },
                getPlayersbyPOS: function (pos) {
                    return $http({
                        method: 'GET',
                        url: '/api/Players/getPlayersbyPOS?id=' + pos
                    })
                },
                getTeams: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/Teams/getTeams'
                    })
                },
                updateTeam: function (team) {
                    return $http({
                        method: 'PUT',
                        url: '/api/Teams/updateTeam',
                        data: team
                    })
                },
                addTeam: function (team) {
                    return $http({
                        method: 'POST',
                        url: '/api/Teams/addTeam',
                        data: team
                    })
                },
                getDraftOrder: function (year) {
                    return $http({
                        method: 'GET',
                        url: '/api/Draft/GetDraftOrder?yr=' + year
                    })
                },
                updateDraftOrder: function (draftOrder) {
                    return $http({
                        method: 'POST',
                        url: '/api/Draft/UpdateDraftOrder',
                        data: draftOrder
                    })
                },
                getDraftInfo: function (year) {
                    return $http({
                        method: 'GET',
                        url:'/api/Draft/GetDraftInfo?yr=' + year
                    })
                },
                draftPlayer: function (teamid, playerid, position) {
                    return $http({
                        method: "POST",
                        url: '/api/Draft/draftPlayer?tId=' + teamid + '&pId=' + playerid + '&pickNo=' + position
                    })
                },
                updateDraftCurrents: function (current) {
                    return $http({
                        method: "POST",
                        url: '/api/Draft/updateDraftCurrents',
                        data: current
                    })
                },
                getCurrents: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/Draft/getCurrents'
                    })
                },
                getDraftResults: function () {
                    return $http({
                        method: 'GET',
                        url: '/api/Teams/getDraftResults'
                    })
                }
            }
        }
    ]);

app.service('signalRDraftSvc', function ($rootScope, $) {
    var proxy = null;

    var initialize = function () {
        connection = $.hubConnection();

        this.proxy = connection.createHubProxy('draftHub');

        connection.start();

        this.proxy.on('broadcastMessage', function (player) {
            $rootScope.$emit('updateBoard', player);
        });
    };;

    var sendRequest = function () {
        this.proxy.invoke('updateAll');
    }

    return {
        initialize: initialize,
        sendRequest: sendRequest
    };
})