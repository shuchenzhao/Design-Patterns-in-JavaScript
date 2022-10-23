// 提供一种方法顺序访问一个聚合对象中的各个元素，而又不需要暴露该对象的内部表示

let each = function (arr, callback) {
    for (let i = 0, n = arr.length; i < n; i++) {
        callback.call(arr[i], i, arr[i]);
    }
};

//内部迭代器：内部定义好迭代规则，外部只需要一次初始调用
let compare = function (arr1, arr2) {
    if (arr1.length !== arr2.length) {
        throw new Error("arr1和arr2不相等");
    }
    each(arr1, function (i, n) {
        if (n !== arr2[i]) {
            throw new Error("arr1和arr2不相等");
        }
    });
    console.log("arr1和arr2相等");
};

//外部迭代器：显式请求迭代下一元素
let Iterator = function (obj) {
    let current = 0;
    let next = function () {
        current++;
    };
    let isDone = function () {
        return current >= obj.length;
    };
    let getCurItem = function () {
        return obj[current];
    };
    return {
        next: next,
        isDone: isDone,
        getCurItem: getCurItem,
    };
};

let compare = function (iterator1, iterator2) {
    while (!iterator1.isDone() && !iterator2.isDone()) {
        if (iterator1.getCurItem() !== iterator2.getCurItem()) {
            throw new Error("iterator1和iterator2不相等");
        }
        iterator1.next();
        iterator2.next();
    }
    console.log("iterator1和iterator2相等");
};

let iterator1 = Iterator([1, 2, 3]);
let iterator2 = Iterator([1, 2, 3]);

compare(iterator1, iterator2);
