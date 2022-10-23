//解决两个软件实体间接口不兼容的问题，客户只需和适配器交互

var googleMap = {
    show: function () {
        console.log("start the googleMap");
    },
};

var baiduMap = {
    display: function () {
        console.log("start the baiduMap");
    },
};

var renderMap = function (map) {
    if (map.show instanceof Function) {
        map.show();
    }
};

var baiduMapAdapter = {
    show: function () {
        return baiduMap.display();
    },
};

renderMap(googleMap);
renderMap(baiduMapAdapter);
