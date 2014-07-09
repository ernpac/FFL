var app = angular.module('app', ['ngResource', 'ngRoute', 'app.service.data']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
        when('/', { templateUrl: '/partials/main.html', controller: 'MainCTRL' }).
        when('/draft', { templateUrl: '/partials/draft.html', controller: 'DraftDayCTRL' }).
        when('/draftday', { templateUrl: '/partials/draftday.html', controller: 'DraftDayClientController' }).
        when('/listplayers', { templateUrl: '/partials/player-list.html', controller: 'PlayerListCTRL' }).
        when('/teamview', { templateUrl: '/partials/teamview.html', controller: 'DraftDayTeamsController' }).
        when('/admin/teams', { templateUrl: '/partials/admin/teams.html', controller: 'TeamDataCTRL' }).
        when('/admin/draft', { templateUrl: '/partials/admin/draftorder.html', controller: 'DraftCTRL' }).
        otherwise({ redirectTo: '/' })
    }]);

app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 1; i <= total; i++)
            input.push(i);
        return input;
    };
});