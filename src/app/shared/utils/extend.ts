declare global {
    interface Array<T> {
        delayedForEach(callback, done, timeout, thisArg): void;
    }
}

Array.prototype.delayedForEach = function (callback, done, timeout:number, thisArg?) {
    var i = 0,
        l = this.length,
        self = this;

    var caller = function () {
        callback.call(thisArg || self, self[i], i, self);
        if (++i < l) {
            setTimeout(caller, timeout);
        } else if (done) {
            setTimeout(done, timeout);
        }
    };

    caller();
};

export { };