class CommercialEstablishment {
    name;
    document
    city;
    state;
    static establishments = [];

    constructor(name, document, city, state) {
        this.name = name;
        this.document = document;
        this.city = city;
        this.state = state;
        CommercialEstablishment.establishments.push(this);
    }
  
    registrar(name, document, city, state){
        const isDuplicate = CommercialEstablishment.establishments.some(
            (establishment) => establishment.document === document
        );
    
        if (!isDuplicate) {
            this.name = name;
            this.document = document;
            this.city = city;
            this.state = state;
    
            CommercialEstablishment.establishments.push(this);
    
            return "Estabelecimento Comercial cadastrado com sucesso!";
        } else {
            throw new Error("Erro no cadastro, estabelecimento já cadastrado");
        }
    }

    static findEstablishmentByDocument(document) {
        return CommercialEstablishment.establishments.find(
            (establishment) => establishment.document === document
        );
    }
}
  
  module.exports = CommercialEstablishment;