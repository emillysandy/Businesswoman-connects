const User = require('../User');
const Service = require('../Service');
const ServiceReview = require('../ServiceReview')

describe('ServiceReview Class', () => {
    beforeEach(() => {
        ServiceReview.reviews = [];
    });

    test('Criar uma avaliação válida', () => {
        const user = new User('Roberta', '123456789', 'Recife', 'Pernambuco');
        const service = new Service('Cozinheira', 'Serviços domésticos', 'SVC001', user);

        const review = new ServiceReview('Emilly', '9', 'Serviço de boa qualidade', service);

        expect(service.reviews.length).toBe(1);
        expect(service.reviews[0]).toBe(review);

        expect(ServiceReview.reviews.length).toBe(1);
        expect(ServiceReview.reviews[0]).toBe(review);
    });

    test('Retorna erro ao tentar criar uma avaliação para um serviço inválido', () => {
        expect(() => new ServiceReview('Emilly', '9', 'Serviço de boa qualidade', {})).toThrow('Serviço inválido');
    });

    test('Obter lista de avaliações', () => {
        const user = new User('Roberta', '123456789', 'Recife', 'Pernambuco');
        const service = new Service('Cozinheira', 'Serviços domésticos', 'SVC001', user);

        const review1 = new ServiceReview('Emilly', '9', 'Serviço de boa qualidade', service);
        const review2 = new ServiceReview('Alice', '8', 'Ótimo serviço', service);

        const reviews = ServiceReview.getReviews();

        expect(reviews.length).toBe(2);
        expect(reviews).toContain(review1);
        expect(reviews).toContain(review2);
    });
});
