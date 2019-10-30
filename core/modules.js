module.exports = (client) => {

    /* Requires */
    const
        Q = require("q"),
        _ = require("underscore"),
        util = require("util"),
        fs = require("fs"),
        events = require("events"),
        module = require("module");

    /* ModuleManager */
    function ModuleManager(moddir) {
        this._moddir = moddir;
        this._modules = {};
        this._preloader = function (mod, obj) { return obj; };
        this._loader = function (mod, obj) { return obj; };
        this._unloader = function (mod, obj) { };
        this._err = function (mod, err) { };
    }
    util.inherits(ModuleManager, events.EventEmitter);

    ModuleManager.prototype.setPreloader = function (f) {
        this._preloader = f;
    };

    ModuleManager.prototype.setLoader = function (f) {
        this._loader = f;
    };

    ModuleManager.prototype.setUnloader = function (f) {
        this._unloader = f;
    };

    ModuleManager.prototype.setErrorHandler = function (f) {
        this._err = f;
    };

    ModuleManager.prototype.load = function (mod, cowboy) {
        if (!this._modules.hasOwnProperty(mod)) {
            try {
                const file = this._moddir + mod + ".js";
                this._modules[mod] = this._preloader(mod, new module.Module(file));
                this._modules[mod].load(file);
                this._modules[mod] = this._loader(mod, this._modules[mod]);
                this.emit("load", mod);
            }
            catch (e) {
                delete this._modules[mod];
                if (cowboy) {
                    throw e;
                }
                else if (e.code === "ENOENT") {
                    return undefined;
                }
                else if (this._err !== undefined) {
                    return this._err(mod, e);
                }
                else {
                    return null;
                }
            }
        }
        return this._modules[mod];
    };

    ModuleManager.prototype.unload = function (mod) {
        if (this._modules.hasOwnProperty(mod)) {
            const mobj = this._modules[mod];
            delete this._modules[mod];
            this._unloader(mod, mobj);
            this.emit("unload", mod);
            return true;
        }
        else {
            return false;
        }
    };

    ModuleManager.prototype.reload = function (mod) {
        this.unload(mod);
        return this.load(mod);
    };

    ModuleManager.prototype.getExports = function (mod) {
        const m = this.getModule(mod);
        if (m == undefined) { return undefined; }
        else { return m.exports; }
    };

    ModuleManager.prototype.getModule = function (mod) {
        if (this._modules.hasOwnProperty(mod)) {
            return this._modules[mod];
        }
        else {
            return undefined;
        }
    };

    ModuleManager.prototype.getModules = function () {
        return _.keys(this._modules);
    };

    /* Exports */
    exports.ModuleManager = ModuleManager;

};