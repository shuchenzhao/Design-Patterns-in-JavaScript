//关键是区分事物内部的状态，事物内部状态的改变往往带来事物行为的改变

//JS版本的状态机，使用Function.prototype.call把请求委托给某个字面量对象来执行，而不需事先让一个对象持有另一个对象
var Light = function () {
    this.currState = FSM.off;
    this.button = null;
};

Light.prototype.init = function () {
    var button = document.createElement("button"),
        self = this;
    button.innerHTML("lights off");
    this.button = document.body.appendChild(buuton);
    this.button.onclick = function () {
        self.currState.buttonWasPressed.call(self);
    };
};

var FSM = {
    off: {
        buttonWasPressed: function () {
            console.log("turn off");
            this.button.innerHTML = "turn on the next time";
            this.currState = FSM.on;
        },
    },
    on: {
        buttonWaPressed: function () {
            console.log("turn on");
            this.button.innerHTML = "turn on the next time";
            this.currState = FSM.off;
        },
    },
};

var light = new Light();
light.init();
