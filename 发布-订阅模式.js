//又叫观察者模式，定义对象间的一种一对多的依赖关系，当一个对象状态改变，所有依赖于它的对象都将得到通知

let event = {
    clientList: [],
    listen: function (key, fn) {
        if (!this.clientList[key]) {
            this.clientList[key] = [];
        }
        this.clientList[key].push(fn);
    },
    trigger: function () {
        let key = Array.prototype.shift.call(arguments),
            fns = this.clientList[key];
        if (!fns || fns.length === 0) {
            return false;
        }
        for (let i = 0, fn; (fn = fns[i]); i++) {
            fn.apply(this, arguments);
        }
    },
    remove: function (key, fn) {
        let fns = this.clientList[key];
        if (!fns) {
            return false;
        }
        if (!fn) {
            fns && (fns.length = 0);
        } else {
            for (let n = fns.length - 1; n >= 0; n--) {
                let _fn = fns[n];
                if (_fn === fn) {
                    fns.splice(n, 1);
                }
            }
        }
    },
};

let installEvent = function (obj) {
    for (let i in event) {
        obj[i] = event[i];
    }
};
