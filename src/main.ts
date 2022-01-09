Hooks.on('renderDialog', (_app: ItemSheet, html: JQuery) => {

  textContainer = document.querySelectorAll('.app.window-app.dialog');
  length = textContainer.length;

  for (i = 0; i < length; i++) {
    if (textContainer[i].children[1].children[0].className.includes("item-sheet")) {
      new_red = document.getElementsByClassName("app window-app dialog")[i].id;

      if (document.getElementById(new_red).header.h4.value != "Create New Item") {
        continue;
      } else {
        console.log("This worked ... wtf?");
      }
    }
  }
});