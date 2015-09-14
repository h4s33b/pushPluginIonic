// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('starter', ['ionic','ngCordova','ionic.service.core','ionic.service.push'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
}).config(['$ionicAppProvider', function($ionicAppProvider) {
  $ionicAppProvider.identify({
    app_id: 'ed7a1ef8',
    api_key: '13ad055f9328ca146e60bdfdc1de8fa0a99c417e59ee1f40',
    dev_push: true
  });
}]).controller('PushCtrl', function($scope, $rootScope, $ionicUser, $ionicPush) {
$scope.identifyUser = function() {
 var user = $ionicUser.get();
 if(!user.user_id) {
 // Set your user_id here, or generate a random one.
 user.user_id = $ionicUser.generateGUID();
 };
 
 // Metadata
 angular.extend(user, {
 name: 'Simon',
 bio: 'Author of Devdactic'
 });
 
 // Identify your user with the Ionic User Service
 $ionicUser.identify(user).then(function(){
 $scope.identified = true;
 console.log('Identified user ' + user.name + '\n ID ' + user.user_id);
 });
};

// Registers a device for push notifications
$scope.pushRegister = function() {
 console.log('Ionic Push: Registering user');
 
 // Register with the Ionic Push service.  All parameters are optional.
 $ionicPush.register({
   canShowAlert: true, //Can pushes show an alert on your screen?
   canSetBadge: true, //Can pushes update app icon badges?
   canPlaySound: true, //Can notifications play a sound?
   canRunActionsOnWake: true, //Can run actions outside the app,
   onNotification: function(notification) {
     // Handle new push notifications here
     return true;
   }
 });
};

$rootScope.$on('$cordovaPush:tokenReceived', function(event, data) {
  alert("Successfully registered token " + data.token);
  console.log('Ionic Push: Got token ', data.token, data.platform);
  $scope.token = data.token;
});
});
