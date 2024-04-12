import validator from "validator";
import { buildValidationReturn } from "../util/misc";

const invalidFieldMessages = {

}
class TaskValidator {
    scheduleTask(data:any) {
        let validity = {
            name: false,
            date: false,
        }

        /* Limpa espaços repetidos */
        data.name = data.name.replace(/(\s)+/g, " ").trim();

        validity.name =
            validator.isLength(data.name, { min: 1, max: 100 });
        validity.date =
            !validator.isEmpty(data.name)

        return buildValidationReturn(validity, invalidFieldMessages);
    }
}

const taskValidator = new TaskValidator();
export { taskValidator }