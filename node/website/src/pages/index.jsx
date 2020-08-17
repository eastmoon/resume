import {scaleLinear} from "d3-scale";

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
    const color = scaleLinear()
                    .domain([60, 120])
                    .range(["orange", "skyblue"]);
    return <div id="style={box}>
        <Logo />
    </div>
}

export default HomePage
