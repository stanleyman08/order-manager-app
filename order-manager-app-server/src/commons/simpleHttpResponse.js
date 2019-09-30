class SimpleHttpResponse {

    constructor() {
        //empty constructor
        this._status = "";
        this._data = {};
        this._message = "";
        this._errors = {};
    }

    get status() {
        return this._status;
    }

    set status(value) {
        this._status = value;
    }

    get data() {
        return this._data;
    }

    set data(value) {
        this._data = value;
    }

    get message() {
        return this._message;
    }

    set message(value) {
        this._message = value;
    }

    get errors() {
        return this._errors;
    }

    set errors(value) {
        this._errors = value;
    }
}

module.exports.SimpleHttpResponse = SimpleHttpResponse;
