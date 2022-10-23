/*有时候需要像某些对象发送请求，但并不知道请求的接受者是谁，也不知道被请求的操作是什么，
此时希望用一种松耦合的方式来设计软件，使得请求发送者和请求接受者能够消除彼此之间的耦合关系*/
//命令模式的由来，其实是回调函数的一个面向对象的替代品；跟策略模式一样，命令模式已经融入js语言

var setCommand = function (button, func) {
    button.onclick = function () {
        func();
    };
};

var MenuBar = {
    refresh: function () {
        console.log("refresh the menu interface");
    },
};

var RefreshMenuBarCommand = function (receiver) {
    return function () {
        receiver.refresh();
    };
};

var refreshmenuBarCommand = RefreshMenuBarCommand(MenuBar);

setCommand(button1, refreshmenuBarCommand);

//更明确表达使用命令模式，除执行命令外还可能撤销命令，则最好还是把执行函数改为调用execute方法
var RefreshMenuBarCommand = function (receiver) {
    return {
        execute: function () {
            receiver.refresh();
        },
    };
};

var setCommand = function (button, command) {
    button.onclick = function () {
        command.execute();
    };
};

var refreshmenuBarCommand = RefreshMenuBarCommand(MenuBar);
setCommand(button1, refreshmenuBarCommand);

//撤销与重做

//宏命令：一组命令的集合
