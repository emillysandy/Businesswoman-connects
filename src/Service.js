const User = require('./User');

class Service {
    name;
    category;
    id;
    description;
    user;
    static services = [];
    reviews = [];

    constructor(name, category, id, description, user) {
        if ((user instanceof User)) {
            this.name = name;
            this.id = id;
            this.category = category;
            this.description = description;
            this.reviews = [];
            this.user = user;
		}else{
		    throw new Error('Informe um usuário válido');
        }
    }

    register(name, category, id, description){
        const isDuplicate = Service.services.some(
            (service) => service.id === id
        );
    
        if (!isDuplicate) {
            this.name = name;
            this.id = id;
            this.category = category;
            this.description = description;
    
            Service.services.push(this);
    
            return "Serviço cadastrado com sucesso!";
        } else {
            throw new Error("Erro, serviço já cadastrado");
        } 
    }

    static formatServiceInfo(services) {
        return services.map((service) => {
            const reviewsInfo = service.reviews.map((review) => ({
                name: review.name,
                nota: review.nota,
                description: review.description,
            }));

            const reviewsOutput =
                reviewsInfo.length > 0
                    ? JSON.stringify(reviewsInfo)
                    : "Este serviço ainda não possui avaliações.";

            return {
                ...service,
                reviews: reviewsOutput,
            };
        });
    }

    static findServiceByName(name) {
        const services = Service.services.filter((service) => service.name === name);
        return Service.formatServiceInfo(services);
    }

    static findServiceByCategory(category) {
        const services = Service.services.filter((service) => service.category === category);
        return Service.formatServiceInfo(services);
    }

    addReview(review) {
        this.reviews.push(review);
    }

    getReviews() {
        if (this.reviews.length === 0) {
            return 'Este serviço ainda não possui avaliações.';
        }

        const formattedReviews = this.reviews.map((review) => {
            return `${review.name} - Nota: ${review.nota}, Descrição: ${review.description}`;
        });

        return formattedReviews.join('\n');
    }
}

module.exports = Service;