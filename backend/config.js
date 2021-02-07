const fs = require('fs')

module.exports = class Config {
    config = {};

    constructor() {
        if (!fs.existsSync("./data/config.json")) {
            if (!fs.existsSync("./data")) fs.mkdirSync("./data");
            fs.writeFileSync("./data/config.json", "{}");
        }
        this.reload();
    }

    reload() {
        this.config = JSON.parse(fs.readFileSync("./data/config.json").toString())
    }

}

