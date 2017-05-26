angular.module('noServer', ['ui.router'])
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