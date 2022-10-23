//将对象组合成树形结构，以表示“部分-整体”的层次结构。通过对象的多态性表现，使得用户对单个对象和组合对象的使用具有一致性。
//例子：扫描文件夹
var Folder = function (name) {
    this.name = name;
    this.files = [];
};

Folder.prototype.add = function (file) {
    this.files.push(file);
};

Folder.prototype.scan = function () {
    console.log("start scanning the folder:" + this.name);
    for (let i = 0, file, files = this.files; (file = files[i++]); ) {
        file.scan();
    }
};

var File = function (name) {
    this.name = name;
};

Folder.prototype.add = function () {
    throw new Error("can't add file to a file");
};

File.prototype.scan = function () {
    console.log("start scanning the file:" + this.name);
};

var folder = new Folder("learning materials");
var folder1 = new Folder("JS");
var folder2 = new Folder("TS");

var file1 = new File("JavaScript");
var file2 = new File("TypeScript");
var file3 = new File("Design Patterns");

folder1.add(file1);
folder2.add(file2);

folder.add(folder1);
folder.add(folder2);
folder.add(file3);

var folder3 = new Folder("Node.js");
var file4 = new File("深入浅出Node.js");
folder3.add(file4);

var file5 = new File("JS开发实践");

folder.add(folder3);
folder.add(file5);

folder.scan();
