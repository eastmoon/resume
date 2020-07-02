const box = {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#aaaaaa',
    border: '2px solid white',
    padding: '8px',
    width: 'calc(100% - 20px)',
    height: 'calc(100% - 20px)'
}

function HomePage({ posts }) {
    let {data} = posts;
    return <div style={box}>
        It is demo home pages, {posts.title} <br />
        {process.env.cwd}<br />
        {process.env.datapath}<br />
        {data.child[0].name}
    </div>
}

export async function getStaticProps() {
  // Call an external API endpoint to get posts
  let data = require(`${process.env.datapath}/work_experience.json`);
  const posts = {
      title: "DEMO PAGE by 陳良傑",
      data: data
  }

  // By returning { props: posts }, the Blog component
  // will receive `posts` as a prop at build time
  return {
    props: {
      posts,
    },
  }
}

export default HomePage
