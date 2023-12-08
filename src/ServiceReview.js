const Service = require('../src/Service');

class ServiceReview {
    static reviews = [];

    constructor(name, avaliation, description, service) {
        this.name = name;
        this.avaliation = avaliation;
        this.description = description;
        
        if (service instanceof Service) {
            this.service = service;
            service.addReview(this);
        } else {
            throw new Error('Serviço inválido');
        }

        ServiceReview.reviews.push(this);
        return "Avaliação feita com sucesso"
    }
}

module.exports = ServiceReview