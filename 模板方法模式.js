/*仅需继承就可以实现。在抽象父类中封装子类的算法框架，包括实现一些公共方法以及封装子类中所有方法的执行顺序。
子类通过继承这个抽象类，也继承了整个算法结构，并且可以选择重写父类的方法。*/
//不同子类中相同部分被上移到父类中，不同的部分留待子类实现。

//例：coffee and tea

//好莱坞原则：允许子组件将自己挂钩到高层组件上，高层组件决定when and how去调用底层组件。
var Beverage = function (param) {
    var boilWater = function () {
        console.log("boil the water");
    };
};

var brew =
    param.brew ||
    function () {
        throw new Error("must pass a brew method");
    };

var pourInCup =
    param.addCondiments ||
    function () {
        throw new Error("must pass a addCondiments method");
    };

var F = function () {};

F.prototype.init = function () {
    boilWater();
    brew();
    pourInCup();
    addCondiments();
};

var Coffee = Beverage({
    brew: function () {
        console.log("use boiled water to brew coffee");
    },
    pourInCup: function () {
        console.log("pour the coffee into the cup");
    },
    addCondiments: function () {
        console.log("add sugar and milk");
    },
});

var Tea = Beverage({
    brew: function () {
        console.log("use boiled water to brew tea");
    },
    pourInCup: function () {
        console.log("pour the tea into the cup");
    },
    addCondiments: function () {
        console.log("add lemon");
    },
});

var coffee = new Coffee();
coffee.init();

var tea = new Tea();
tea.init();
