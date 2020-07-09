function Page2({ data }) {
    let experience = data.experience.child[0];
    let research = data.research.child[0];
    return <div className="page">
        <div className="column">
            <ul className="col-ul">
              　<li className="col-li" style={{width:"48%"}}><div className="col-box box-style">
                    <div className="block-header">{experience.name.split("(")[0]}</div>
                    <div className="block-body">
                        {
                            experience.child.map((item) => {
                                return <div>
                                    <div className="content-header">{item.name}</div>
                                    <div className="content-job-info">{item.value[0][1].replace("<br />", " ")}、{item.value[0][3]}</div>
                                    <div className="content-desc" dangerouslySetInnerHTML={{__html: item.value[1]}} />
                                </div>;
                            })
                        }
                    </div>
                </div></li>
              　<li className="col-li" style={{width:"48%"}}><div className="col-box box-style">
                    <div className="block-header">{research.name.split("(")[0]}</div>
                    <div className="block-body">
                        {
                            research.child.map((item) => {
                                return <div>
                                    <div className="content-header">{item.name}</div>
                                    <div className="content-job-info">{item.value[0][1].replace("<br />", " ")}、{item.value[0][3]}</div>
                                    <div className="content-desc" dangerouslySetInnerHTML={{__html: item.value[1]}} />
                                </div>;
                            })
                        }
                    </div>
                </div></li>
            </ul>
        </div>
    </div>
}

export default Page2
