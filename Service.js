class Service {
    name;
    category;
    #id
    static services = [];

    registrar(name, category, tag, id){
        const isDuplicate = Service.services.some(
            (service) => service.#id === id
        );
    
        if (!isDuplicate) {
            this.name = name;
            this.#id = id;
            this.category = category;
    
            Service.services.push(this);
    
            return "Serviço cadastrado com sucesso!";
        } else {
            throw new Error("Erro no cadastro, serviço já cadastrado");
        } 
    }
}

module.exports = Product;