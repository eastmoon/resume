// Imports: Dependencies
const Markdown = require("markdown").markdown;

function newChildren() {
    return {name: "", value: [], list: [], child: []};
}

function renderHTML(value) {
    let md = ["Markdown"].concat(value);
    return Markdown.renderJsonML(md);
}

function parsePara(item) {
    if ( item instanceof Array && item[0] === "para") {
        let value = item[1];
        // ignore content
        if (value === "<p />" || value === "<p>") {
            return null
        }
        // new children
        if (value.includes("table")) {
            return parseHTMLTable(value);
        }
        // non parser content
        return renderHTML(value);
    }
    return item;
}

function parseHTMLTable(item) {
    let list = [];
    if (item.includes("table")) {
        let rows = item
            .replace("<table>", "")
            .replace("</table>", "")
            .replace(/\n/g,"")
            .split("<tr>");
        rows.forEach((row, i) => {
            let tmp = row
                .replace("</tr>", "")
                .replace(/<th[^>]*>/g, "<td>")
                .replace(/<\/th>/g, "</td>")
                .trim();
            if (tmp !== "") {
                let cols = tmp
                    .split("</td>")
                    .map((item) => {
                        return item.replace(/<td[^>]*>/g, "").trim();
                    })
                    .filter((str) => {
                        return str !== "";
                    })
                list.push(cols);
            }
        });
    }
    return list;
}

function parseList(items) {
    let list = [];
    for (let j = 1; j < items.length ; j++) {
        let item = items[j];
        if ( item instanceof Array && item[0] === "listitem") {
            if ( item.length === 2 ) {
                list.push(parsePara(item[1]));
            } else if ( item.length === 3 ) {
                let sub = item[2];
                let obj = newChildren();
                if ( sub[0] === "bulletlist" ) {
                    obj.value = item[1];
                    obj.list = parseList(sub);
                    list.push(obj);
                }
            }
        }
    }
    return list;
}

function treeToJson(jsonml, level = 1, index = 0) {
    let json = newChildren();
    let key = null;
    let i = index;
    for ( ; i < jsonml.length ; i++ ) {
        let item = jsonml[i];
        let tmp = null;
        let newChild = null;
        if ( item instanceof Array ) {
            switch(item[0]) {
                case "header": {
                    newChild = {
                        key: item[2],
                        level: item[1].level,
                        index: i
                    }
                    break;
                }
                case "bulletlist": {
                    tmp = parseList(item);
                    json.list = json.list.concat(tmp);
                    break;
                }
                case "para": {
                    tmp = parsePara(item);
                    if ( tmp !== null) {
                        if ( tmp instanceof Array ) {
                            json.value = json.value.concat(tmp);
                        } else {
                            json.value.push(tmp);
                        }
                    }
                    break;
                }
            }
        }

        if ( newChild !== null ) {
            // compare header level
            if (level < newChild.level) {
                // Bigger,  create children tree
                tmp = treeToJson(jsonml, newChild.level, newChild.index + 1);
                tmp.child.name = newChild.key;
                i = tmp.index;
                json.child.push(tmp.child);
            } else {
                // level equal or less, stop looping.
                break;
            }
        }
    }
    // Return json object
    if (level > 1) {
        return {child: json, index: i - 1};
    }
    return json;
}

module.exports = function(markdwon_text) {
    const tree = Markdown.parse(markdwon_text);
    const json = treeToJson(tree);
    return json;
};
