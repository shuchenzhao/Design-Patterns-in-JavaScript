//动态地给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象
Function.prototype.before = function (beforefn) {
    var _self = this;
    return function () {
        if (beforefn.apply(this, arguments) === false) {
            return;
        }
        return _self.apply(this, arguments);
    };
};

var validata = function () {
    if (username.value === "") {
        alert("用户名不能为空");
        return false;
    }
    if (password.value === "") {
        alert("密码不能为空");
        return false;
    }
};

var formSubmit = function () {
    var param = {
        usernmae: username.value,
        password: password.value,
    };
    ajax("http://xxx.com/login", param);
};

formSubmit = formSubmit.before(validata); //将校验输入和提交表单解耦

submitBtn.onclick = function () {
    formSubmit();
};
