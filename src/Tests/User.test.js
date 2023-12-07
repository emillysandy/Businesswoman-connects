const User = require('../User');

describe('User Class', () => {
    beforeEach(() => {
        User.data = [];
    });

    test('Criação da instância de User', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_contabil');
        expect(user instanceof User).toBe(true);
    });

    test('Cadastro de usuário com dados válidos', () => {
        const user = new User();
        user.register('Sandra', '7654321', 'São Paulo/SP', '(11)898989000', '@sandraconfeccoes');

        expect(User.data.length).toBe(1);
        expect(User.data[0].name).toBe('Sandra');
        expect(User.data[0].document).toBe('7654321');
        expect(User.data[0].adress).toBe('São Paulo/SP');
        expect(User.data[0].phone).toBe('(11)898989000');
        expect(User.data[0].instagram).toBe('@sandraconfeccoes');
    });

    test('Erro ao cadastrar usuário duplicado', () => {
        const user = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_contabil');
        
        expect(() => user.register('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_contabil')).toThrow('Erro, usuário já cadastrado');
        expect(User.data.length).toBe(1);
    });

    test('Buscar usuário por documento', () => {
        const user1 = new User('Fernanda', '56789034', 'Caruaru/PE', '(81)990436789', '@fernanda_contabil');
        const user2 = new User('Sandra', '7654321', 'São Paulo/SP', '(11)898989000', '@sandraconfeccoes');

        const result = User.findByDocument('56789034');

        expect(result).toEqual(user1);
    });

    test('Buscar usuário por documento inexistente', () => {
        const result = User.findByDocument('999999999');

        expect(result).toBeUndefined();
    });
});