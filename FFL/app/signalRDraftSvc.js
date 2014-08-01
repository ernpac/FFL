app.service('signalRDraftSvc', function ($, $rootScope) {
    var proxy = null;

    var initialize = function () {
        connection = $.hubConnection();

        this.proxy = connection.createHubProxy('draftHub');

        connection.start();

        this.proxy.on('broadcastMessage', function (player) {
            $rootScope.$emit("updateBoard", player);
        });
    };;

    var sendRequest = function () {
        this.proxy.invoke('updateAll');
    }

    return {
        initialize: initialize,
        sendRequest: sendRequest
    };
});