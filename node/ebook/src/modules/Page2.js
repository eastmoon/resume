function Page1({ data }) {
    return <div className="page">
        <div>
            {data.introduction.child[0].value}
        </div>
        <div className="column">
            <ul>
              　<li style={{width:"48%"}}><div style={{height: "40em", backgroundColor: "#ff0000"}}>
                    這裡是項目一
                </div></li>
              　<li style={{width:"48%"}}><div style={{height: "20em", backgroundColor: "#00ff00"}}>
                    這裡是項目二
                </div></li>
            </ul>
        </div>
    </div>
}

export default Page1
