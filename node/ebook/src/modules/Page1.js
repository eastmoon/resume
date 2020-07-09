function Page1({ data }) {
    let education = data.education.child[0];
    let education_field = education.child[0];
    let education_papers = education.child[1];
    let education_thematic = education.child[2];
    let intro = data.introduction;
    let intro_desc = intro.child[0].value;
    let intro_profile = intro.child[0].child[0];
    let summary = intro.child[0].child[1];
    let summary_job = summary.child[0];
    let summary_side = summary.child[1];
    let summary_lang = summary.child[2];
    let summary_lib = summary.child[3];
    let summary_db = summary.child[4];

    // Sorting library experience with work experience
    let level = 0;
    summary_lib.value
        .slice(1)
        .forEach((item, i, arr) => {
            if ( i > 0 ) {
                let str1 = item[2].split("，")[0];
                let str2 = arr[ i - 1 ][2].split("，")[0];
                if (str1 !== str2) {
                    level++;
                }
            }
            item.push(level);
        });
    // Sorting database experience with work experience
    level = 0;
    summary_db.value
        .slice(1)
        .forEach((item, i, arr) => {
            if ( i > 0 ) {
                let str1 = item[2].split("，")[0];
                let str2 = arr[ i - 1 ][2].split("，")[0];
                if (str1 !== str2) {
                    level++;
                }
            }
            item.push(level);
        });
    return <div className="page">
        <div>
            <table style={{margin: "0 1.2%"}}>
                <tr>
                    <td style={{fontSize: "1.3em", padding: "0.5em 0", width: "22%", backgroundColor: "lightsteelblue", borderRadius: "5px"}}>
                        {
                            intro_profile.list.map((item) => {
                                if (typeof item === "string") return <div style={{marginLeft: "3%"}}>{item}</div>;
                            })
                        }
                    </td>
                    <td style={{padding: "0 2%"}}>
                        {data.introduction.child[0].value}
                    </td>
                </tr>
            </table>
        </div>
        <div className="column">
            <ul className="col-ul">
              　<li className="col-li" style={{width:"21%"}}><div className="col-box box-style">
                    <div className="block-header">{education.name.split("(")[0]}</div>
                    <ul className="block-body">
                        {
                            education.list.map((item) => {
                                if (typeof item === "string") {
                                    let desc = null;
                                    let time = null;
                                    let annotate = null;
                                    let tmp = item.split("，");
                                    desc = tmp.slice(0, tmp.length - 1).join("，");
                                    time = tmp[tmp.length - 1];
                                    if (time.includes("&gt;")) {
                                        tmp = time.split("&gt;");
                                        time = tmp[0];
                                        annotate = tmp[1];
                                    }
                                    return <li className="content-list-body">
                                        <font className="content-list-header">{time}</font><br />
                                        <font>{desc}</font><br />
                                        {annotate !== null ? <font style={{fontSize: "0.8em", background: "darkgray", borderRadius: "2px"}}>{annotate}</font> : null}
                                    </li>;
                                }
                            })
                        }
                    </ul>
                    <div className="block-header">{education_field.name.split("(")[0]}</div>
                    <div className="block-body">
                        <div className="content-header">
                            {education_field.list[0].value.split("，")[0]}<br />{education_field.list[0].value.split("，")[1]}
                        </div>
                        <ul style={{margin: "1em 0"}}>
                            {
                                education_field.list[0].list.map((item) => {
                                    let tmp = item.split("(");
                                    return <li style={{fontSize: "0.8em"}}>
                                        {tmp[0]}<br />
                                        {tmp.length > 1 ? `(${tmp[1]}` : null}
                                    </li>;
                                })
                            }
                        </ul>
                        <div className="content-header">
                            {education_field.list[1].value.split("，")[0]}<br />{education_field.list[1].value.split("，")[1]}
                        </div>
                        <ul style={{margin: "1em 0"}}>
                            {
                                education_field.list[1].list.map((item) => {
                                    let tmp = item.split("(");
                                    return <li style={{fontSize: "0.8em"}}>
                                        {tmp[0]}<br />
                                        {tmp.length > 1 ? `(${tmp[1]}` : null}
                                    </li>;
                                })
                            }
                        </ul>
                    </div>
                    <div className="block-header">{education_papers.name.split("(")[0]}</div>
                    <div className="block-body">
                        <div className="content-header">{education_papers.value[0][1]}</div>
                        <div className="content-desc">{education_papers.value[1]}</div>
                    </div>
                    <div className="block-header">{education_thematic.name.split("(")[0]}</div>
                    <div className="block-body">
                        <div className="content-header">{education_thematic.value[0][1]}</div>
                        <div className="content-desc">{education_thematic.value[1]}</div>
                    </div>
                </div></li>
              　<li className="col-li" style={{width:"75%"}}><div className="col-box box-style">
                    <div className="block-header">{summary_job.name}</div>
                    <ul className="block-body">
                        {
                            summary_job.list.map((item) => {
                                if (typeof item === "string") {
                                    let tmp = item.split("，");
                                    return <li className="content-list-body">
                                        <font className="content-list-header">{tmp[0]}</font><br />{tmp.slice(1).join("，")}
                                    </li>;
                                }
                            })
                        }
                    </ul>
                    <div className="block-header">{summary_side.name}</div>
                    <ul className="block-body">
                        {
                            summary_side.list.map((item) => {
                                if (typeof item === "string") return <li style={{margin: "0.5em 0"}}>{item}</li>;
                            })
                        }
                    </ul>
                    <div className="block-header">{summary_lang.name} <font style={{fontSize: "0.5em"}}>(依累積經驗排序)</font></div>
                    <div className="block-body-ex">
                        {
                            summary_lang.value
                                .slice(1)
                                .sort((item1, item2) => {
                                    let d1 = Number(item1[1]);
                                    let d2 = Number(item2[1]);
                                    if (d1 > d2) return -1;
                                    if (d1 < d2) return 1;
                                    return 0;
                                })
                                .map((item, i) => {
                                    if ( item instanceof Array) {
                                        let fs1 = (i > 5) ? 1.5 : 2.5 - (i/5) ;
                                        let fs2 = (i > 5) ? 1 : 1.5 - (i/5)*0.5;
                                        return <div style={{position: "relative", display: "inline-block", marginRight: "1.2em"}}>
                                            <font style={{fontSize: `${fs1}em`}}>{item[0]}</font>
                                            <font style={{fontSize: `${fs2}em`, padding: "0 2px", margin: "0 3px", backgroundColor: "lightcoral", borderRadius: "2px"}}>{item[1]}</font>
                                        </div>;
                                    }
                                })
                        }
                    </div>
                    <div className="block-header">{summary_lib.name} <font style={{fontSize: "0.5em"}}>(依工作經歷排序)</font></div>
                    <div className="block-body-ex">
                        {
                            summary_lib.value
                                .slice(1)
                                .map((item) => {
                                    if ( item instanceof Array ) {
                                        let level = item[3];
                                        let fs1 = (level > 5) ? 1.5 : 2.5 - (level/5) ;
                                        let fs2 = (level > 5) ? 1 : 1.5 - (level/5)*0.5;
                                        return <div style={{position: "relative", display: "inline-block", marginRight: "1.2em"}}>
                                            <font style={{fontSize: `${fs1}em`}}>{item[0]}</font>
                                            <font style={{fontSize: `${fs2}em`, padding: "0 2px", margin: "0 3px", backgroundColor: "lightcoral", borderRadius: "2px"}}>{item[1]}</font>
                                        </div>;
                                    }
                                })
                        }
                    </div>
                    <div className="block-header">{summary_db.name} <font style={{fontSize: "0.5em"}}>(依工作經歷排序)</font></div>
                    <div className="block-body-ex">
                        {
                            summary_db.value.slice(1).map((item) => {
                                if ( item instanceof Array ) {
                                    let level = item[3]
                                    let fs1 = (level > 5) ? 1.5 : 2.5 - (level/5) ;
                                    let fs2 = (level > 5) ? 1 : 1.5 - (level/5)*0.5;
                                    return <div style={{position: "relative", display: "inline-block", marginRight: "1.2em"}}>
                                        <font style={{fontSize: `${fs1}em`}}>{item[0]}</font>
                                        <font style={{fontSize: `${fs2}em`, padding: "0 2px", margin: "0 3px", backgroundColor: "lightcoral", borderRadius: "2px"}}>{item[1]}</font>
                                    </div>;
                                }
                            })
                        }
                    </div>
                </div></li>
            </ul>
        </div>
    </div>
}

export default Page1
