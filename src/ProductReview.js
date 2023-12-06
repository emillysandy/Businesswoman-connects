const Product = require('../src/Product');

class ProductReview {
    static reviews = [];

    constructor(name, nota, description, product) {
        this.name = name;
        this.nota = nota;
        this.description = description;
        
        if (product instanceof Product) {
            this.product = product;
            product.addReview(this);
        } else {
            throw new Error('Produto inválido');
        }

        ProductReview.reviews.push(this);
        return "Avaliação feita com sucesso"
    }

    static getReviews() {
        return ProductReview.reviews;
    }
}

module.exports = ProductReview