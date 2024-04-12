import fs from 'fs';

class Log {
    static #swapSubstring(sentence:string, swap:string, into:string):string {
        let list = sentence.split(swap);
        return list.join(into);
    }

    static #getToday():string {
        return Log.#swapSubstring(new Date().toDateString(), " ", "-");
    }

    static write(message:string):void {
        const result = `${new Date().toTimeString()} - ${message}`
        if (process.env.DEBUG === "console") {
            console.log(result);
        }
        else if (process.env.DEBUG === "file") {
            fs.appendFile(
                `../../${Log.#getToday()}.log`,
                result,
                () => {}
            );
        }
    }
}

export { Log };