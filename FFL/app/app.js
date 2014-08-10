var app = angular.module('app', ['ngResource', 'ngRoute', 'app.service.data']).
    config(['$routeProvider', function ($routeProvider) {
        $routeProvider.
        when('/', { templateUrl: '/partials/main.html', controller: 'MainCTRL', controllerAs: 'ctrl' }).
        when('/draft', { templateUrl: '/partials/draft.html', controller: 'DraftDayCTRL' }).
        when('/draftday', { templateUrl: '/partials/draftday.html', controller: 'DraftDayClientController', controllerAs: 'ctrl' }).
        when('/listplayers', { templateUrl: '/partials/player-list.html', controller: 'PlayerListCTRL', controllerAs: 'ctrl' }).
        when('/teamview', { templateUrl: '/partials/teamview.html', controller: 'DraftDayTeamsController' }).
        when('/admin/teams', { templateUrl: '/partials/admin/teams.html', controller: 'TeamDataCTRL', controllerAs: 'ctrl' }).
        when('/admin/draft', { templateUrl: '/partials/admin/draftorder.html', controller: 'DraftCTRL' }).
        otherwise({ redirectTo: '/' })
        //when('/', { templateUrl: '/TCFFL/partials/main.html', controller: 'MainCTRL', controllerAs: 'ctrl' }).
        //when('/draft', { templateUrl: '/TCFFL/partials/draft.html', controller: 'DraftDayCTRL' }).
        //when('/draftday', { templateUrl: '/TCFFL/partials/draftday.html', controller: 'DraftDayClientController', controllerAs: 'ctrl' }).
        //when('/listplayers', { templateUrl: '/TCFFL/partials/player-list.html', controller: 'PlayerListCTRL', controllerAs: 'ctrl' }).
        //when('/teamview', { templateUrl: '/TCFFL/partials/teamview.html', controller: 'DraftDayTeamsController' }).
        //when('/admin/teams', { templateUrl: '/TCFFL/partials/admin/teams.html', controller: 'TeamDataCTRL', controllerAs: 'ctrl' }).
        //when('/admin/draft', { templateUrl: '/TCFFL/partials/admin/draftorder.html', controller: 'DraftCTRL' }).
        //otherwise({ redirectTo: '/' })
    }]);

//this is a test comment to test git push
app.value('$', $);
app.filter('range', function () {
    return function (input, total) {
        total = parseInt(total);
        for (var i = 1; i <= total; i++)
            input.push(i);
        return input;
    };
});

