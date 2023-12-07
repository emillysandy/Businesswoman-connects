const User = require('../User');
const Product = require('../Product');

describe('Product Class', () => {
    beforeEach(() => {
        Product.products = [];
    });

    test('Criação da instância do Product', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_confecoes');
        const product = new Product('Camisa', 'Roupa', 'PRD001', 'Produção de camisas personalizadas', user);
        const result = product.register('Camisa', 'Roupa', 'PRD001');
    });

    test('Cadastro de produto com dados válidos', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_confecoes');
        const product = new Product('Camisa', 'Roupa', 'PRD001', 'Produção de camisas personalizadas', user);
        const result = product.register('Camisa', 'Roupa', 'PRD001', 'Produção de camisas personalizadas');

        expect(result).toBe('Produto cadastrado com sucesso!');
        expect(Product.products.length).toBe(1);
        expect(Product.products[0].name).toBe('Camisa');
        expect(Product.products[0].category).toBe('Roupa');
        expect(Product.products[0].id).toBe('PRD001');
        expect(Product.products[0].description).toBe('Produção de camisas personalizadas');
    });

    test('Erro ao cadastrar produto duplicado', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_confecoes');
        const product = new Product('Camisa', 'Roupa', 'PRD001', 'Produção de camisas personalizadas', user);
        product.register('Camisa', 'Roupa', 'PRD001', 'Produção de camisas personalizadas');

        expect(() => product.register('Camisa', 'Roupa', 'PRD001', 'Produção de camisas personalizadas')).toThrow('Erro, produto já cadastrado');
        expect(Product.products.length).toBe(1);
    });

    test('Erro ao criar produto com usuário inválido', () => {
        const invalidUser = {};

        const createProductWithInvalidUser = () => {
            new Product('Camisa', 'Roupa', 'PRD001', 'Produção de camisas personalizadas', invalidUser);
        };

        expect(createProductWithInvalidUser).toThrowError('Informe um usuário válido');
    });

    test('Deve retornar produtos corretos ao buscar produto por nome', () => {
        const user = new User('Patrícia', '123456789', 'João Pessoa/PB', '(82)9888774466', '@PatyAcessorios');
        const product1 = new Product('Bolsa', 'Acessório', 'PRD001', 'Acessórios ersonalizados para sua empresa ou evento', user);
        const product2 = new Product('Boné', 'Acessório', 'PRD002', 'Acessórios ersonalizados para sua empresa ou evento', user);
        product1.register('Bolsa', 'Acessório', 'PRD001', 'Acessórios ersonalizados para sua empresa ou evento');
        product2.register('Boné', 'Acessório', 'PRD002', 'Acessórios ersonalizados para sua empresa ou evento');

        const results = Product.findProductByName('Bolsa');

        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Bolsa');
        expect(results[0].category).toBe('Acessório');
        expect(results[0].id).toBe('PRD001');
        expect(results[0].description).toBe('Acessórios ersonalizados para sua empresa ou evento');
    });

    test('Deve retornar produtos corretos ao buscar produto por categoria', () => {
        const user = new User('Patrícia', '123456789', 'João Pessoa/PB', '(82)9888774466', '@PatyAcessorios');
        const product1 = new Product('Bolsa', 'Acessório', 'PRD001', 'Acessórios ersonalizados para sua empresa ou evento', user);
        const product2 = new Product('Boné', 'Acessório', 'PRD002', 'Acessórios ersonalizados para sua empresa ou evento', user);
        product1.register('Bolsa', 'Acessório', 'PRD001', 'Acessórios ersonalizados para sua empresa ou evento');
        product2.register('Boné', 'Acessório', 'PRD002', 'Acessórios ersonalizados para sua empresa ou evento');


        const results = Product.findProductByCategory('Acessório');

        expect(results.length).toBe(2);
        expect(results[0].name).toBe('Bolsa');
        expect(results[1].name).toBe('Boné');
        expect(results[0].category).toBe('Acessório');
        expect(results[1].category).toBe('Acessório');
        expect(results[0].description).toBe('Acessórios ersonalizados para sua empresa ou evento');
        expect(results[1].description).toBe('Acessórios ersonalizados para sua empresa ou evento');
    });

    test('Deve retonar sucesso ao adicionar avaliação ao produto', () => {
        const user = new User('Sandra', '123456789', 'Jaboatão dos Guararapes/PE', '(81)982838486', '@sandramodas');
        const product = new Product('Bolsa', 'Acessório', 'PRD001', 'Bolsas personalizadas para seu evento', user);

        const review = {
            name: 'Alice',
            nota: 9,
            description: 'Sandra fornce bolsas personalizadas de ótima qualidade',
        };

        product.addReview(review);

        expect(product.reviews.length).toBe(1);
        expect(product.reviews[0]).toEqual(review);
    });

    test('Deve rotornar corretamente um produto sem avaliações', () => {
        const user = new User('Sandra', '123456789', 'Jaboatão dos Guararapes/PE', '(81)982838486', '@sandramodas');
        const product = new Product('Bolsa', 'Acessório', 'PRD001', 'Bolsas personalizadas para seu evento', user);

        const formattedReviews = product.getReviews();

        const expectedOutput = 'Este produto ainda não possui avaliações.';

        expect(formattedReviews).toBe(expectedOutput);
    });

    test('Deve retornar avaliações formatadas', () => {
        const user = new User('Sandra', '123456789', 'Jaboatão dos Guararapes/PE', '(81)982838486', '@sandramodas');
        const product = new Product('Bolsa', 'Acessório', 'PRD001', 'Bolsas personalizadas para seu evento', user);

        product.addReview({
            name: 'Avaliador 1',
            nota: 4,
            description: 'Ótimo serviço!',
        });
        product.addReview({
            name: 'Avaliador 2',
            nota: 5,
            description: 'Excelente!',
        });

        const formattedReviews = product.getReviews();

        const expectedOutput = 'Avaliador 1 - Nota: 4, Descrição: Ótimo serviço!\nAvaliador 2 - Nota: 5, Descrição: Excelente!';

        expect(formattedReviews).toBe(expectedOutput);
    });
});
