const Product = require('../src/Product');

class ProductReview {
    static reviews = [];

    constructor(name, avaliation, description, product) {
        this.name = name;
        this.avaliation = avaliation;
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
}

module.exports = ProductReview