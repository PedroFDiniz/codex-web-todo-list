import validator from "validator";

const invalidFieldMessages = {

}

class UserValidator {
    /**
     * Checa a validade dos atributos usados pelo método "createUser" do
     * "UserController".
     * @param data Um objeto contendo os campos e seus respectivos valores
     * a serem testados.
     * @returns Um objeto contendo 3 atributos:
     *  - "isValid" diz se existe algum campo inválido.
     *  - "invalidFields" é uma lista com os campos inválidos.
     *  - "errors" é uma lista com as mensagens de erro dos campos.
     */
    createUser = (data:any) => {
        let validity = {
            name:false,
            sex:false,
            age:false,
            email:false,
        };
        const validSexes = ["F", "M"];

        /* Limpa espaços repetidos */
        data.name = data.name.replace(/(\s)+/g, " ").trim();

        /* Valida os campos */
        validity.name =
            !validator.isEmpty(data.name) &&
            validator.isLength(data.name, { min: 1, max: 100 });
        validity.sex =
            !validator.isEmpty(data.name) &&
            (data.sex in validSexes);
        validity.age = (data.age > 0) && (data.age < 121);
        validity.email =
            !validator.isEmpty(data.email)
            validator.isEmail(data.email);

        return buildReturn(validity);
    }

    /**
     * Checa a validade dos atributos usados pelo método "editUser" do
     * "UserController".
     * @param data Um objeto contendo os campos e seus respectivos valores
     * a serem testados.
     * @returns Um objeto contendo 3 atributos:
     *  - "isValid" diz se existe algum campo inválido.
     *  - "invalidFields" é uma lista com os campos inválidos.
     *  - "errors" é uma lista com as mensagens de erro dos campos.
     */
    editUser = (data:any) => {
        let validity = {
            name:false,
            age:false,
        }

        validity.name =
            !validator.isEmpty(data.name) &&
            validator.isLength(data.name, { min: 1, max: 100 });
        validity.age = (data.age > 0) && (data.age < 121);

        return buildReturn(validity);
    }
}

/**
 * Função auxiliar para preparar o retorno as funções de validade.
 * @param validity Um objeto contendo booleanos que expressam a validade
 * dos campos.
 * @returns Um objeto contendo 3 atributos:
 *  - "isValid" diz se existe algum campo inválido.
 *  - "invalidFields" é uma lista com os campos inválidos.
 *  - "errors" é uma lista com as mensagens de erro dos campos.
 */
const buildReturn = (validity:any) => {
    let isValid = true;
    let invalidFields = [];
    let errors:any = [];
    for (let attribute in validity) {
        /* Se houver algum inválido... */
        isValid = isValid && validity[attribute as keyof typeof validity];
        if (!validity[attribute as keyof typeof validity]) {
            /* Busca o nome do campo */
            invalidFields.push(attribute);
            /* E a mensagem de erro */
            errors.push(
                invalidFieldMessages[
                    attribute as keyof typeof invalidFieldMessages
                ]
            );
        }
    } return { isValid, invalidFields, errors };
}

const userValidator = new UserValidator();
export { userValidator };