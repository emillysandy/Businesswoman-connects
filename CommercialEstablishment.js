class CommercialEstablishment {
    nome;
    #document
    city;
    state;
    static establishments = [];
  
      registrar(nome, document, city, state){
          const isDuplicate = CommercialEstablishment.establishments.some(
              (establishment) => establishment.#document === document
          );
        
          if (!isDuplicate) {
              this.nome = nome;
              this.#document = document;
              this.city = city;
              this.state = state;
        
              CommercialEstablishment.establishments.push(this);
        
              return "Estabelecimento Comercial Cadastrado Com Sucesso!";
          } else {
              throw new Error("Erro no cadastro, estabelecimento já cadastrado");
          }
      }
  }
  
  module.exports = CommercialEstablishment;