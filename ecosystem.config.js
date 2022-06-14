module.exports = {
  apps: [{
    name: "main",
    watch: true,
    ignore_watch: ["sessions", ".git/*"],
    watch_options: {
      "followSymlinks": false
    },
    script: "./main.js"
  }]
}
