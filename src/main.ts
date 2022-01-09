Hooks.on('renderItemDirectory', (_app: ItemSheet, html: JQuery) => {

  console.log("hook found");
  console.log(html);

  let textContainer = document.querySelectorAll('.app.window-app.dialog');
  let length = textContainer.length;

  for (let i = 0; i < length; i++) {
    if (textContainer[i].children[1].children[0].className.includes("item-sheet")) {
      let new_red = document.getElementsByClassName("app window-app dialog")[i].id;

      if (document.getElementById(new_red)?.children[0].children[0].valueOf() != "Create New Item") {
        continue;
      } else {
        console.log("This worked ... wtf?");
      }
    }
  }
});