const CommercialEstablishment = require('./CommercialEstablishment');

class Product {
    name;
    category;
    id
    static establishment
    static products = [];
    reviews = [];

    constructor(name, category, id, establishmentDocument) {
        this.name = name;
        this.id = id;
        this.category = category;
        Product.establishmentDocument = establishmentDocument;

        this.establishment = CommercialEstablishment.findEstablishmentByDocument(this.establishmentDocument);

        if (!this.establishment) {
            throw new Error("Erro no cadastro, estabelecimento não encontrado");
        }
    }

    registrar(name, category, id, establishmentDocument){
        const isDuplicate = Product.products.some(
            (product) => product.id === id
        );
    
        if (!isDuplicate) {
            this.name = name;
            this.id = id;
            this.category = category;
            this.establishment = CommercialEstablishment.findEstablishmentByDocument(establishmentDocument);
    
            Product.products.push(this);
    
            return "Produto Cadastrado Com Sucesso!";
        } else {
            throw new Error("Erro no cadastro, produto já cadastrado");
        } 
    }

    static findProductByName(name) {
        return Product.products.filter((product) => product.name === name);
    }

    static findProductByCategory(category) {
        return Product.products.filter((product) => product.category === category);
    }

    addReview(review) {
        this.reviews.push(review);
    }
}

module.exports = Product;