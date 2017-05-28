angular.module('noServer', ['ui.router', 'ui.select', 'ngSanitize'])
    .config(function ($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/', "")
        $stateProvider
            .state('home', {
                templateUrl: './views/home.html',
                url: '/'                
            })
            .state('recipe', {
                templateUrl: './views/testview.html',
                url: '/recipe',    
            })
            


    })