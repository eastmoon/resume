//
import Page1 from "modules/Page1";
import Page2 from "modules/Page2";

//
function HomePage({ data }) {
    return <div className="page">
        <Page1 data={data} />
        <div style={{pageBreakAfter: "always"}} alt="分頁符號"></div>
        <Page2 data={data} />
    </div>
}

// Call an external API endpoint to get posts
export async function getStaticProps() {
  let data = {};
  data.introduction = require(`${process.env.datapath}/introduction.json`);
  data.education = require(`${process.env.datapath}/education.json`);
  data.research = require(`${process.env.datapath}/personal_research.json`);
  data.experience = require(`${process.env.datapath}/work_experience.json`);

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      data,
    },
  }
}

export default HomePage
