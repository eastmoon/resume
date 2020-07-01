// Imports: Dependencies
const Markdown = require("markdown").markdown;

function newChildren() {
    return {value: [], list: []};
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
            return parserHTMLTable(value);
        }
        // non parser content
        return renderHTML(value);
    }
    return item;
}

function parserHTMLTable(item) {
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

function parserList(items) {
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
                    obj.list = parserList(sub);
                    list.push(obj);
                }
            }
        }
    }
    return list;
}

function treeToJson(jsonml, level = 1, index = 0) {
    let json = {};
    let children = newChildren();
    let key = null;
    let i = index;
    for ( ; i < jsonml.length ; i++ ) {
        let item = jsonml[i];
        let tmp = null;
        let newChild = null;
        let isStop = false;
        if ( item instanceof Array ) {
            switch(item[0]) {
                case "header": {
                    // Find new header, saving children object into json result.
                    if (key !== null) {
                        json[key] = children;
                    }
                    // compare header level
                    if (level === item[1].level) {
                        // Equal, create new ones.
                        key = item[2];
                        children = newChildren();
                    } else if (level < item[1].level) {
                        // Bigger,  create children tree
                        newChild = {
                            level: item[1].level,
                            index: i
                        }
                    } else {
                        isStop = true;
                    }
                    break;
                }

                case "bulletlist": {
                    tmp = parserList(item);
                    children.list = children.list.concat(tmp);
                    break;
                }

                case "para": {
                    tmp = parsePara(item);
                    if ( tmp !== null) {
                        if ( tmp instanceof Array ) {
                            children.value = children.value.concat(tmp);
                        } else {
                            children.value.push(tmp);
                        }
                    }
                    break;
                }
            }
        }
        if ( isStop ) {
            break;
        }
        if ( newChild !== null ) {
            tmp = treeToJson(jsonml, newChild.level, newChild.index);
            i = tmp.index;
            Object.assign(children, tmp.child);
        }
    }
    // Saving final children
    if (key === null) {
        Object.assign(json, children);
    } else {
        json[key] = children;
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
