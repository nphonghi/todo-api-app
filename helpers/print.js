import chalk from "chalk"

class OutputType {
    static INFORMATION = "INFORMATION"
    static SUCCESS = "SUCCESS"
    static WARNING = "WARNING"
    static ERROR = "ERROR"
}

function print(massage, outputType) {
    switch(outputType) {
        case OutputType.INFORMATION:
            console.log(chalk.white(massage))
            break
        case OutputType.SUCCESS:
            console.log(chalk.green(massage))
            break
        case OutputType.ERROR:
            console.log(chalk.red(massage))
            break
        case OutputType.WARNING:
            console.log(chalk.yellow(massage))
            break
        default:
            console.log(chalk.white(massage))
    }
}

export {
    OutputType,
    print
}