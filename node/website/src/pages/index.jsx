import fetch from 'isomorphic-unfetch'
import Logo from 'modules/logo'

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

function HomePage({ stars }) {
    return <div style={box}>
        <Logo />
    </div>
}

HomePage.getInitialProps = async ({ req }) => {
    const res = await fetch('https://api.github.com/repos/zeit/next.js')
    const json = await res.json()
    console.log(`> Server-Side render : ${json.stargazers_count}`)
    return { stars: json.stargazers_count }
}

export default HomePage
