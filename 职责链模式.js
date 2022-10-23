/*使多个对象都有机会处理请求，从而避免请求的发送者和接收者之间的耦合关系，将这些对象连成一条链，
并沿着这条链传递该请求，直到有一个对象处理它为止。*/

//异步职责链
ChannelSplitterNode.prototype.next = function () {
    return (
        this.successtor &&
        this.successtor.passRequest.apply(this.successor, arguments)
    );
};

var fn1 = new Chain(function () {
    console.log(1);
    return "nextSuccessor";
});

var fn2 = new Chain(function () {
    console.log(2);
    var self = this;
    setTimeout(function () {
        self.next();
    }, 1000);
});

var fn3 = new Chain(function () {
    console.log(3);
});

fn1.setNextSuccessor(fn2).setNextSuccessor(fn3);
fn1.passRequest();
