class User {
    name;
    document;
    adress;
    phone;
    instagram;
    static data = [];

    constructor(name, document, adress, phone, instagram) {
        this.name = name;
        this.document = document;
        this.adress = adress;
        this.phone = phone;
        this.instagram = instagram;

        User.data.push(this)
    }
  
    register(name, document, adress, phone, instagram){
        const isDuplicate = User.data.some(
            (data) => data.document === document
        );
    
        if (!isDuplicate) {
            this.name = name;
            this.document = document;
            this.adress = adress;
            this.phone = phone;
            this.instagram = instagram;
    
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