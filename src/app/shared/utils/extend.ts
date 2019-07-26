declare global {
    interface Array<T> {
        delayedForEach(callback, done, timeout, thisArg): void;
    }
}

Array.prototype.delayedForEach = function (callback, done, timeout: number, thisArg?) {
    let i = 0;
    const l = this.length;
    const self = this;

    const caller = function () {
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
