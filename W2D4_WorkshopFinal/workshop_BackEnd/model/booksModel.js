class BookModel {
    constructor(id,title,ISBN,publisherDate,author) {
        this.id = id;
        this.title = title;
        this.ISBN =ISBN;
        this.publisherDate = publisherDate;
        this.author = author;
    }
}
module.exports = BookModel;
