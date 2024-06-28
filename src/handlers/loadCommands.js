const fs = require("fs");
const colors = require("colors");
const Table = require("cli-table3");

module.exports = (client) => {
    const commandTable = new Table({
        head: ["Load commands".blue.bold],
        chars: {
            'top': '─',
            'top-mid': '┬',
            'top-left': '╭',
            'top-right': '╮',
            'bottom': '─',
            'bottom-mid': '┴',
            'bottom-left': '╰',
            'bottom-right': '╯',
            'left': '│',
            'left-mid': '│',
            'mid': ' ',
            'mid-mid': '┼',
            'right': '│',
            'right-mid': '│',
            'middle': '│'
        },
        style: { "compact": true },
        colWidths: [25],
        colAligns: ["center"]
    });
    fs.readdirSync("src/commands").forEach(folder => {
        fs.readdirSync(`src/commands/${folder}`).forEach(file => {
            const cmd = require(`../commands/${folder}/${file}`)
            client.commands.set(cmd.name, cmd)

            commandTable.push(
                ["Loaded ".green.bold + cmd.name ]
            )
        })
    })


    console.log(commandTable.toString())
}
