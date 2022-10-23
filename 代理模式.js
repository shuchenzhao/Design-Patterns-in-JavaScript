//为一个对象提供一个代用品或占位符，以便控制对它的访问
//单一职责原则

let myImage = (function () {
    let imgNode = document.createElement("img");
    document.body.appendChild(imgNode);

    return {
        setSrc: function (src) {
            imgNode.src = src;
        },
    };
})();

let proxyImage = (function () {
    let img = new Image();
    img.onload = function () {
        myImage.setSrc(this.src);
    };
    return {
        setSrc: function (src) {
            myImage.setSrc("...(loading)");
            img.src = src;
        },
    };
})();

proxyImage.setSrc("...");
