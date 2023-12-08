const User = require('../User');
const Service = require('../Service');

describe('Service Class', () => {
    beforeEach(() => {
        Service.services = [];
    });

    test('Criação da instância do Service', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_confecoes');
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas', user);
        const result = service.register('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas');
    });

    test('Cadastro de serviço com dados válidos', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_confecoes');
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas', user);
        const result = service.register('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas');

        expect(result).toBe('Serviço cadastrado com sucesso!');
        expect(Service.services.length).toBe(1);
        expect(Service.services[0].name).toBe('Contadora');
        expect(Service.services[0].category).toBe('Contabilidade');
        expect(Service.services[0].id).toBe('SVC001');
        expect(Service.services[0].description).toBe('Presto serviços de contabilidade para pessoas autônomas');
    });

    test('Erro ao cadastrar serviço duplicado', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_confecoes');
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas', user);
        service.register('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas');

        expect(() => service.register('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas')).toThrow('Erro, serviço já cadastrado');
        expect(Service.services.length).toBe(1);
    });

    test('Erro ao criar serviço com usuário inválido', () => {
        const invalidUser = {};

        const createProductWithInvalidUser = () => {
            new Service('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas', invalidUser);
        };

        expect(createProductWithInvalidUser).toThrowError('Informe um usuário válido');
    });

    test('Buscar serviço por nome', () => {
        const user = new User('Patrícia', '123456789', 'João Pessoa/PB', '(82)9888774466', '@PatyMakeup');
        const service1 = new Service('Maquiadora', 'Maquiagem', 'SVC001', 'Maquiagens para todos os tipos de eventos', user);
        const service2 = new Service('Cabelereira', 'Penteados', 'SVC002', 'Penteados para todas as ocasiões', user);
        service1.register('Maquiadora', 'Maquiagem', 'SVC001', 'Maquiagens para todos os tipos de eventos');
        service2.register('Cabelereira', 'Penteados', 'SVC002', 'Penteados para todas as ocasiões');

        const results = Service.findServiceByName('Maquiadora');

        expect(results.length).toBe(1);
        expect(results[0].name).toBe('Maquiadora');
        expect(results[0].category).toBe('Maquiagem');
        expect(results[0].id).toBe('SVC001');
        expect(results[0].description).toBe('Maquiagens para todos os tipos de eventos');
    });

    test('Buscar serviço por categoria', () => {
        const user = new User('Roberta', '123456789', 'Recife/PE', '(81)997354422', '@RobertaSilva');
        const service1 = new Service('Cozinheira', 'Serviços domésticos', 'SVC001', 'Ofereço serviço de personal chef', user);
        const service2 = new Service('Faxineira', 'Serviços domésticos', 'SVC002', 'Faço faxinas em Recife e região metropolitana', user);
        service1.register('Cozinheira', 'Serviços domésticos', 'SVC001', 'Ofereço serviço de personal chef');
        service2.register('Faxineira', 'Serviços domésticos', 'SVC002', 'Faço faxinas em Recife e região metropolitana');

        const results = Service.findServiceByCategory('Serviços domésticos');

        expect(results.length).toBe(2);
        expect(results[0].name).toBe('Cozinheira');
        expect(results[1].name).toBe('Faxineira');
        expect(results[0].category).toBe('Serviços domésticos');
        expect(results[1].category).toBe('Serviços domésticos');
        expect(results[0].description).toBe('Ofereço serviço de personal chef');
        expect(results[1].description).toBe('Faço faxinas em Recife e região metropolitana');
    });

    test('Adiciona avaliação ao serviço', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_confecoes');
        const service = new Service('Contadora', 'Contabilidade', 'SVC001', 'Presto serviços de contabilidade para pessoas autônomas', user);

        const review = {
            name: 'Alice',
            avaliation: 7,
            description: 'Bom serviço prestado pela Fernanda!',
        };

        service.addReview(review);

        expect(service.reviews.length).toBe(1);
        expect(service.reviews[0]).toEqual(review);
    });
});
