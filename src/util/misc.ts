/**
 * Função auxiliar para preparar o retorno as funções de validade.
 * @param validity Um objeto contendo booleanos que expressam a validade
 * dos campos.
 * @returns Um objeto contendo 3 atributos:
 *  - "isValid" diz se existe algum campo inválido.
 *  - "invalidFields" é uma lista com os campos inválidos.
 *  - "errors" é uma lista com as mensagens de erro dos campos.
 */
const buildValidationReturn = (validity:any, invalidFieldMessages:any) => {
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

export { buildValidationReturn };