Hooks.on('renderDialog', (_app, html) => {
    var _a;
    console.log("hook found");
    console.log(html);
    let textContainer = document.querySelectorAll('.app.window-app.dialog');
    let length = textContainer.length;
    for (let i = 0; i < length; i++) {
        if (textContainer[i].children[1].children[0].className.includes("item-sheet")) {
            let new_red = document.getElementsByClassName("app window-app dialog")[i].id;
            if (((_a = document.getElementById(new_red)) === null || _a === void 0 ? void 0 : _a.children[0].children[0].valueOf()) != "Create New Item") {
                continue;
            }
            else {
                console.log("This worked ... wtf?");
            }
        }
    }
});
//# sourceMappingURL=main.js.map