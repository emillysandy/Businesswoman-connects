const User = require('../User');
const Service = require('../Service');

describe('Service Class', () => {
    beforeEach(() => {
        Service.services = [];
    });

    test('Criação da instância do Service', () => {
        const user = new User("Beatriz", "121564943121", "Recife", "Pernambuco");
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', user);
        const result = service.register('Contadora', 'Contabilidade', 'SVC001');
    });

    test('Cadastro de serviço com dados válidos', () => {
        const user = new User("Beatriz", "121564943121", "Recife", "Pernambuco");
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', user);
        const result = service.register('Contadora', 'Contabilidade', 'SVC001');

        expect(result).toBe('Serviço cadastrado com sucesso!');
        expect(Service.services.length).toBe(1);
        expect(Service.services[0].name).toBe('Contadora');
        expect(Service.services[0].category).toBe('Contabilidade');
        expect(Service.services[0].id).toBe('SVC001');
    });

    test('Erro ao cadastrar serviço duplicado', () => {
        const user = new User("Beatriz", "121564943121", "Recife", "Pernambuco");
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', user);
        service.register('Contadora', 'Contabilidade', 'SVC001');

        expect(() => service.register('Contadora', 'Contabilidade', 'SVC001')).toThrow('Erro, serviço já cadastrado');
        expect(Service.services.length).toBe(1);
    });

    test('Erro ao criar serviço com usuário inválido', () => {
        const invalidUser = {};

        const createProductWithInvalidUser = () => {
            new Service('Contadora', 'Contabilidade', 'SVC001', invalidUser);
        };

        expect(createProductWithInvalidUser).toThrowError('Informe um usuário válido');
    });

    test('Buscar serviço por nome', () => {
        const user = new User('Flávia', '123456789', 'Recife', 'Pernambuco');
        const service1 = new Service('Maquiadora', 'Maquiagem', 'SVC001', user);
        const service2 = new Service('Cabelereira', 'Penteados', 'SVC002', user);
        service1.register('Maquiadora', 'Maquiagem', 'SVC001');
        service2.register('Cabelereira', 'Penteados', 'SVC002');

        const results = Service.findServiceByName('Maquiadora');

        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Maquiadora');
        expect(results[0].category).toBe('Maquiagem');
        expect(results[0].id).toBe('SVC001');
    });

    test('Buscar serviço por categoria', () => {
        const user = new User('Roberta', '123456789', 'Recife', 'Pernambuco');
        const service1 = new Service('Cozinheira', 'Serviços domésticos', 'SVC001', user);
        const service2 = new Service('Faxineira', 'Serviços domésticos', 'SVC002', user);
        service1.register('Cozinheira', 'Serviços domésticos', 'SVC001');
        service2.register('Faxineira', 'Serviços domésticos', 'SVC002');

        const results = Service.findServiceByCategory('Serviços domésticos');

        expect(results.length).toBe(2);
        expect(results[0].name).toBe('Cozinheira');
        expect(results[1].name).toBe('Faxineira');
        expect(results[0].category).toBe('Serviços domésticos');
        expect(results[1].category).toBe('Serviços domésticos');
    });

    test('Adiciona avaliação ao serviço', () => {
        const user = new User("Beatriz", "121564943121", "Recife", "Pernambuco");
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', user);

        const review = {
            name: 'Alice',
            nota: 7,
            description: 'Bom serviço prestado pela Beatriz!',
        };

        service.addReview(review);

        expect(service.reviews.length).toBe(1);
        expect(service.reviews[0]).toEqual(review);
    });

    test('Retorna corretamente para serviço sem avaliações', () => {
        const user = new User('Flávia', '123456789', 'Recife', 'Pernambuco');
        const service = new Service('Maquiadora', 'Maquiagem', 'SVC001', user);

        const formattedReviews = service.getReviews();

        const expectedOutput = 'Este serviço ainda não possui avaliações.';

        expect(formattedReviews).toBe(expectedOutput);
    });

    test('Retorna avaliações formatadas', () => {
        const user = new User('Roberta', '123456789', 'Recife', 'Pernambuco');
        const service = new Service('Cozinheira', 'Serviços domésticos', 'SVC001', user);

        service.addReview({
            name: 'Avaliadora 1',
            nota: 9,
            description: 'Ótimo serviço!',
        });
        service.addReview({
            name: 'Avaliadora 2',
            nota: 10,
            description: 'Excelente!',
        });

        const formattedReviews = service.getReviews();

        const expectedOutput = 'Avaliadora 1 - Nota: 9, Descrição: Ótimo serviço!\nAvaliadora 2 - Nota: 10, Descrição: Excelente!';

        expect(formattedReviews).toBe(expectedOutput);
    });

});
