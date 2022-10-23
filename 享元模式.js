//flyweight，即蝇量级，用于性能优化，时间换空间。
//核心是运用共享技术来支持大量细粒度的对象，解决系统中因为创建了大量类似的对象而导致内存占用过高的问题。
var id = 0;
window.startUpload = function (uploadType,files) {
    for (let i = 0, file; file = files[i++];){
        var uploadObj = new uploadType(uploadType, file.fileName, file.fileSize);
        uploadObj.init(id++);
    }
}    

var Upload = function (uploadType, fileName, fileSize) {
    this.uploadType = uploadType;
    this.fileName = fileName;
    this.fileSize = fileSize;
    this.dom = null;
}

Upload.prototype.init = function (id) {
    var that = this;
    this.id = id;
    this.dom = document.createElement("div");
    this.dom.innerHTML = "<span>fileName:" + this.fileName + "fileSize" + this.fileSize + "<span>" + "<button class="delFile">delete</button>";
    this.dom.querySelector(".delFile").onclick = function () {
        that.delFile();
    }
    document.body.appendChild(this.dom);
}

Upload.prototype.delFile = function () {
    if (this.fileSize < 3000) {
        return this.dom.parentNode.removeChild(this.dom);
    }
    if (window.confirm("confirm to delete?" + this.fileName)) {
        return this.dom.parentNode.removeChild(this.dom);
    }
}

startUpload("plugin", [
    {
        fileName: "1.txt",
        fileSize: 1000
    },
    {
        fileName: "2.txt",
        fileSize: 3000
    },
    {
        fileName: "3.txt",
        fileSize: 5000
    },
]);

startUpload("flash", [
    {
        fileName: "4.txt",
        fileSize: 1000
    },
    {
        fileName: "5.txt",
        fileSize: 3000
    },
    {
        fileName: "6.txt",
        fileSize: 5000
    },
]);

//下面是用享元模式重构。uploadType作为内部状态
//剥离外部状态
var Upload = function (uploadType) {
    this.uploadType = uploadType;
};

Upload.prototype.delFile = function (id) {
    uploadManager.setExternalState(id, this);
    if (this.fileSize < 3000) {
        return this.dom.parentNode.remoceChild(this.dom);
    }
    if (window.confirm("confirm to delete?" + this.fileName)) {
        return this.dom.parentNode.remoceChild(this.dom);
    }
}
//工厂进行对象实例化
var UploadFactory = (function(){
    var createdFlyWeightObjs = {};
    return {
        create: function (uploadType) {
            if (createdFlyWeightObjs[uploadType]) {
                return createdFltWeightObjs[iploadType];
            }
            return createdFlyWeightObjs[iploadType] = new Upload(uploadType);
        }
    }
})();
//管理器封装外部状态
var uploadManager = (function () {
    var uploadDatabase = {};

    return {
        add: function (id, uploadType, fileName, fileSize) {
            var flyWeightObj = UploadFactory.create(uploadType);
            var dom = document.createElement("div");
            dom.innerHTML = "<span>fileName:" + this.fileName + "fileSize" + this.fileSize + "<span>" + "<button class="delFile">delete</button>";
            dom.querySelector(".delFile").onclick = function () {
                flyWeightObj.delFile(id);
            }
            document.body.appendChild(dom);
            uploadDatabase[id] = {
                fileName: fileName,
                fileSize: fileSize,
                dom: dom
            };

            return flyWeightObj;
        },
        setExternalState: function (id, flyWeightObj) {
            var uploadData = uploadDatabase[id];
            for (let i in uploadData) {
                flyWeightObj[i] = uploadData[i];
            }
        }
    }
})();

var id = 0;
window.startUpload = function (uploadtype, files) {
    for (let i = 0, file; file = files[i++];){
        var uploadObj = uploadManager.add(++id, uploadType, file.fileName, file.fileSize);
    }
}

/*对象池：维护一个装载空闲对象的池子，如果需要对象的时候，不是直接new，而是转从对象池里获取。
若对象池里没有空闲对象，则创建一个新的对象，当获取出的对象完成他的职责之后，再进入池子等待下次获取。
常用于跟DOM有关的操作。对象池是另一种性能优化方案，和享元模式有相似之处，但没有分离内部状态和外部状态。
以上用享元模式完成的文件上传，也可以用对象池+事件委托实现。 */