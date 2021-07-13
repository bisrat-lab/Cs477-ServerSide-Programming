class book {
    constructor(id,name,info=[]) {
        this.id = id;
        this.name = name;
        this.info = info;
    }
}

const x = new book(1,"bis",["a","b"]);
console.log(x);