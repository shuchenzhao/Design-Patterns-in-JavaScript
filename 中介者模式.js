//解除对相间的紧耦合关系，所有对象通过中介者对象通信，而不是相互引用。当一个对象改变时，通知中介者对象即可。
//迎合迪米特法则，也就是最少知识原则；缺点是中介者对象自身往往是一个难以维护的对象

var goods = {
    "red|32G": 3,
    "red|16G": 0,
    "blue|32G": 1,
    "blue|16G": 6,
};

var mediator = (function () {
    var colorSelect = document.getElementById("colorSelect");
    memorySelect = document.getElementById("memorySelect");
    numberInput = document.getElementById("numberInput");
    colorInfo = document.getElementById("colorInfo");
    memoryInfo = document.getElementById("memoryInfo");
    numberInfo = document.getElementById("numberInfo");
    nextBtn = document.getElementById("nextBtn");

    return {
        chaged: function (obj) {
            var color = colorSelect.value,
                memory = memorySelect.value,
                number = numberInput.value,
                stock = goods[color + "|" + memory];

            if (obj === colorSelect) {
                colrInfo.innerHTML = color;
            } else if (obj === memorySelect) {
                memoryInfo.innerHTMl = memory;
            } else if (obj === numberInput) {
                numberInfo.innerHTML = number;
            }

            if (!color) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = "please choose the color";
                return;
            }

            if (!memory) {
                nextBtn.disabled = true;
                nextBtn.innerHTML = "please choose the memory";
                return;
            }

            if (((number - 0) | 0) !== number - 0) {
                nextBtn.disabled = true;
                nextBtn.innerHTML =
                    "please input the right number of purchase quantity";
                return;
            }

            nextBtn.disabled = false;
            nextBtn.innerHTML = "add to cart";
        },
    };
})();

colorSelect.onchange = function () {
    mediator.changed(this);
};
memorySelect.onchange = function () {
    mediator.changed(this);
};
numberInput.oninput = function () {
    mediator.changed(this);
};
