//单例模式：保证一个类仅有一个实例，并提供一个访问它的全局访问点

// -------------------实现单例模式
/*let Singleton = function (name) {
    this.name = name;
    this.instance = null;
};

Singleton.prototype.getName = function () {
    console.log(this.name);
};

Singleton.getInstance = function (name) {
    if (!this.name) {
        this.instance = new Singleton(name);
    }
    return this.instance;
};

let a = Singleton.getInstance("x1");
let b = Singleton.getInstance("x2");

console.log(a === b); //true;
*/

// -------------------透明的单例模式
/*var CreateDiv = (function () {
    let instance;

    var CreateDiv = function (html) {
        if (instance) {
            return instance;
        }
        this.html = html;
        this.init();
        return (instance = this);
    };

    CreateDiv.prototype.init = function () {
        let div = document.createElement("div");
        div.innerHTML = this.html;
        document.body.appendChild(div);
    };

    return CreateDiv;
})();

let a = new CreateDiv("s1");
let b = new Create("s2");

console.log(a === b); //true;
*/

// -------------------用代理实现单例模式
/*var CreateDiv = function (html) {
    this.html = html;
    this.init();
};

CreateDiv.prototype.init = function () {
    let div = document.createElement("div");
    div.innerHTML = this.html;
    document.body.appendChild(div);
};

var ProxySingletonCreateDiv = (function () {
    let instance;
    return function (html) {
        if (!instance) {
            instance = new CreateDiv(html);
        }
        return instance;
    };
})();

let a = new ProxySingletonCreateDiv("s1");
let b = new ProxySingletonCreateDiv("s2");

console.log("a===b");*/

// -------------------JavaScript中的单例模式
let namespace1 = {
    a: function () {
        console.log("1");
    },
    b: function () {
        console.log("2");
    },
};
//1. 使用命名空间
let MyApp = {};
MyApp.namespace = function (name) {
    let parts = name.split(".");
    let current = MyApp;
    for (let i in parts) {
        if (!current[parts[i]]) {
            current[parts[i]] = {};
        }
        current = current[parts[i]];
    }
};

MyApp.namespace("event");
MyApp.namespace("dom.style");

console.dir(MyApp);

//等价于：
let MyApp = {
    event: {},
    dom: {
        style: {},
    },
};

//2. 使用闭包创建私有变量
let user = (function () {
    let _name = "s",
        _age = 29;
    return {
        getUserInfo: function () {
            return _name + "-" + _age;
        },
    };
})();

// -------------------惰性单例
let getSingle = function (fn) {
    let result;
    return function () {
        return result || (result = fn.apply(this, arguments));
    };
};

let createLoginLayer = function () {
    let div = document.createElement("div");
    div.innerHTML = "this is a login window";
    div.style.display = "none";
    document.body.appengChild(div);
    return div;
};

let createSingleLoginLayer = getSingle(createLoginLayer);

document.getElementById("loginBtn").onclick = function () {
    let loginLayer = createSingleLoginLayer();
    loginLayer.style.display = "block";
};

let createSingleIframe = getSingle(function () {
    let iframe = document.createElement("iframe");
    document.body.appengChild(iframe);
    return iframe;
});

document.getElementById("loginBtn").onclick = function () {
    let loginLayer = createSingleIframe();
    loginLayer.src = "http://baidu.com";
};
