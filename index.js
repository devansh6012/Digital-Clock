const container = d3.select('.container')

const svg = container
    .append('svg')
    .attr('height', window.innerHeight)
    .attr('weight', window.innerWidth);

let digits = [
    [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
    ],
    [
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
        [0, 1, 0],
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
    ],
    [
        [1, 0, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [1, 0, 0],
        [1, 0, 0],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
    ],
    [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [1, 0, 1],
        [1, 0, 1],
        [1, 1, 1],
        [0, 0, 1],
        [0, 0, 1],
        [0, 0, 1],
    ],
];

let squareData = {
    height: 45,
    width: 45,
    x: 0,
    y: 0,
    color: 'blue',
    margin: 5
}

let makeDigit = () => {
    let digitData = [];
    // i -> rows
    // j -> columns
    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 3; j++) {
            // 21 digits
            let currSquare = { ...squareData };

            if (j == 1 && i > 0 && i < 6) currSquare.color = 'white';

            currSquare.x = j * (currSquare.width + currSquare.margin);
            currSquare.y = i * (currSquare.width + currSquare.margin);

            digitData.push(currSquare)
        }
    }

    return digitData;
}

let digitData = makeDigit();
// Step 1 : Make a Square

let render = () => {
    let rects = svg
        .selectAll('rect')
        .data(digitData)
        .attr('height', d => d.height)
        .attr('width', d => d.width)
        .attr('fill', d => d.color)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('margin', d => d.margin)

    rects
        .enter()
        .append("rect")
        .attr('height', d => d.height)
        .attr('width', d => d.width)
        .attr('fill', d => d.color)
        .attr('x', d => d.x)
        .attr('y', d => d.y)
        .attr('margin', d => d.margin)
}

let updateDigit = (s) => {
    for (let i = 0; i < digitData.length; i++) {
        // square object => color
        let r = Math.floor(i / 3);
        let c = i % 3;

        if (digits[s][r][c] === 1) {
            digitData[i].color = 'blue';
        }
        else {
            digitData[i].color = 'white';
        }
    }
}

setInterval(() => {
    // extract time
    let time = new Date();
    let h = time.getHours();
    let m = time.getMinutes();
    let s = time.getSeconds();

    updateDigit(s % 10);
    render()
}, 1000)