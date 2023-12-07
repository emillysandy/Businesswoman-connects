const User = require('./User');

class Product {
    name;
    category;
    id;
    user;
    description;
    static products = [];
    reviews = [];

    constructor(name, category, id, description, user) {
        if ((user instanceof User)) {
            this.name = name;
            this.id = id;
            this.description = description;
            this.category = category;
            this.reviews = [];
            this.user = user;
		}else{
		    throw new Error('Informe um usuário válido');
        }
    }

    register(name, category, id, description){
        const isDuplicate = Product.products.some(
            (product) => product.id === id
        );
    
        if (!isDuplicate) {
            this.name = name;
            this.id = id;
            this.category = category;
            this.description = description;
    
            Product.products.push(this);
    
            return "Produto cadastrado com sucesso!";
        } else {
            throw new Error("Erro, produto já cadastrado");
        } 
    }

    static formatProductInfo(products) {
        return products.map((product) => {
            const reviewsInfo = product.reviews.map((review) => ({
                name: review.name,
                nota: review.nota,
                description: review.description,
            }));

            const reviewsOutput =
                reviewsInfo.length > 0
                    ? JSON.stringify(reviewsInfo)
                    : "Este produto ainda não possui avaliações.";

            return {
                ...product,
                reviews: reviewsOutput,
            };
        });
    }
    
    static findProductByName(name) {
        const products = Product.products.filter((product) => product.name === name);
        return Product.formatProductInfo(products);
    }

    static findProductByCategory(category) {
        const products = Product.products.filter((product) => product.category === category);
        return Product.formatProductInfo(products);
    }

    addReview(review) {
        this.reviews.push(review);
    }

    getReviews() {
        if (this.reviews.length === 0) {
            return 'Este produto ainda não possui avaliações.';
        }

        const formattedReviews = this.reviews.map((review) => {
            return `${review.name} - Nota: ${review.nota}, Descrição: ${review.description}`;
        });

        return formattedReviews.join('\n');
    }
}

module.exports = Product;