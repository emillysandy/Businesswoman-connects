const Service = require('../src/Service');

class ServiceReview {
    static reviews = [];

    constructor(name, nota, description, service) {
        this.name = name;
        this.nota = nota;
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

    static getReviews() {
        return ServiceReview.reviews;
    }
}

module.exports = ServiceReview