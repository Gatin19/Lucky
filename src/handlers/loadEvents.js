const fs = require("fs");
const colors = require("colors");
const Table = require("cli-table3");

module.exports = (client) => {
    const eventTable = new Table({
        head: ["Load Events".blue.bold],
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

    fs.readFileSync("src/events").forEach(file => {
        const event = require(`../handlers/loadEvents.js`)
        client.on(event.name, event.run)
        eventTable.push(
            ["Loaded ".green.bold + event.name]
        )
    })
}
