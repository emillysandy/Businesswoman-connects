const User = require('../User');
const Product = require('../Product');
const ProductReview = require('../ProductReview')

describe('ProductReview Class', () => {
    beforeEach(() => {
        ProductReview.reviews = [];
    });

    test('Cria uma avaliação válida', () => {
        const user = new User('Sandra', '123456789', 'Jaboatão dos Guararapes/PE', '(81)982838486', '@sandramodas');
        const product = new Product('Bolsa', 'Acessório', 'PRD001', 'Bolsas personalizadas para seu evento', user);

        const review = new ProductReview('Emilly', '9', 'Produto de boa qualidade', product);

        expect(product.reviews.length).toBe(1);
        expect(product.reviews[0]).toBe(review);
        expect(ProductReview.reviews.length).toBe(1);
        expect(ProductReview.reviews[0]).toBe(review);
    });

    test('Criar uma avaliação com um produto inválido', () => {
        expect(() => new ProductReview('Emilly', '9', 'Produto de boa qualidade', {})).toThrow('Produto inválido');
    });

    test('Obter lista de avaliações', () => {
        const user = new User('Sandra', '123456789', 'Jaboatão dos Guararapes/PE', '(81)982838486', '@sandramodas');
        const product = new Product('Bolsa', 'Acessório', 'PRD001', 'Bolsas personalizadas para seu evento', user);

        const review1 = new ProductReview('Emilly', '9', 'Produto de boa qualidade', product);
        const review2 = new ProductReview('Alice', '8', 'Ótimo', product);

        const reviews = ProductReview.getReviews();

        expect(reviews.length).toBe(2);
        expect(reviews).toContain(review1);
        expect(reviews).toContain(review2);
    });
});
