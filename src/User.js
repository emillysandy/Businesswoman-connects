class User {
    name;
    document
    city;
    state;
    static data = [];

    constructor(name, document, city, state) {
        this.name = name;
        this.document = document;
        this.city = city;
        this.state = state;
        User.data.push(this)
    }
  
    register(name, document, city, state){
        const isDuplicate = User.data.some(
            (data) => data.document === document
        );
    
        if (!isDuplicate) {
            this.name = name;
            this.document = document;
            this.city = city;
            this.state = state;
    
            return "Usuário cadastrado com sucesso!";
        } else {
            throw new Error("Erro, usuário já cadastrado");
        }
    }

    static findByDocument(document) {
        return User.data.find(
            (data) => data.document === document
        );
    }
}
  
module.exports = User;