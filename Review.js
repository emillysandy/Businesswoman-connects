const Product = require("./Product");

class Review {
    name;
    nota;
    description;
    product;
    static reviews = [];

    constructor(name, nota, description, product){
        this.name = name;
        this.nota = nota;
        this.description = description;
        this.product = product;
    }

    registrar(name, nota, description, product){
        this.name = name;
        this.nota = nota;
        this.description = description;
        this.product = product;

        product.addReview(this);

        Review.reviews.push(this);
        return "Review registrado com sucesso!";
    }

    static getReviews() {
        return Review.reviews;
    }
}

module.exports = Review