var app = angular.module("app");
//utworzenie modulu PostsCtrl
//wstrzykniecie zaleznosci $scope
app.controller("PostsCtrl", function($scope, PostsSvc) {
    //wykonanie funkcji nastapi po kliknieciu przycisku Dodaj post.
    $scope.addPost = function() {
        //dodany bedzie jedynie post zawierajacy tresc
        if ($scope.postBody) {
            PostsSvc.create({
                    body: $scope.postBody
                }).success(function(post) {
                    $scope.posts.unshift(post);
                    //czyszczenie zawartosci pola
                    $scope.postBody = null;
                })
                //umieszczenie nowego postu na poczatku tablicy $scope.PostsCtrl
        }
    };
    //dane poczatkowe
    PostsSvc.fetch().then(function(posts) {
        $scope.posts = posts;
    });
});
