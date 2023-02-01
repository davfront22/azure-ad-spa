"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
class Category {
    //getters
    get Id() {
        return this.id;
    }
    get Name() {
        return this.name;
    }
    get Description() {
        return this.description;
    }
    get ImageURL() {
        return this.imageURL;
    }
    get Subcategories() {
        return this.subcategories;
    }
    //setters
    set Id(v) {
        this.id = v;
    }
    set Name(v) {
        this.name = v;
    }
    set Description(v) {
        this.description = v;
    }
    set ImageURL(v) {
        this.imageURL = v;
    }
    set Subcategories(v) {
        this.subcategories = v;
    }
}

exports.Category = Category;
