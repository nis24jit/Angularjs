/**
 * Created by Sudhina on 30/10/16.
 */
var mainApp=angular.module('mainApp', ['sportsModule']);



mainApp.filter("checkedItems", function () {
    return function (items, showComplete) {
        var resultArr = [];
        angular.forEach(items, function (item) {
            if (item.done == false || showComplete == true) {
                resultArr.push(item);
            }
        });
        return resultArr;
    }
});
