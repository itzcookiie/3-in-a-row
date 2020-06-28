const game = document.querySelector('.game-container')
const canvasBoard = document.getElementById('gamecube')
const displayCurrentUser = document.querySelector('.game-title')
const playagainButton = document.querySelector('.play-button')

const boardPositions = {
    one: {
        number: "one",
        position: document.querySelector('.one')
    },
    two: {
        number: "two",
        position: document.querySelector('.two')
    },
    three: {
            number: "three",
            postion: document.querySelector('.three')
    },
    four: {
        number: "four",
        position: document.querySelector('.four')
    },
    five: {
        number: "five",
        position: document.querySelector('.five')
    },
    six: {
        number: "six",
        position: document.querySelector('.six')
    },
    seven: {
        number: "seven",
        position: document.querySelector('.seven')
    },
    eight: {
        number: "eight",
        position: document.querySelector('.eight')
    },
    nine: {
        number: "nine",
        position: document.querySelector('.nine')
    }
}

console.log(boardPositions.three.postion)

const { children } = game 

function play(node, user='computer') {
    console.log(node, user)
    if(user === localStorage.getItem('user')) {
        node.classList.toggle('noughts', node.classList.length < 3)
        displayCurrentUser.innerText = 'COMPUTERS TURN'
        return;
    }
    node.classList.toggle('cross', node.classList.length < 3)
    displayCurrentUser.innerText = `${localStorage.getItem('user')} TURN`
}

function checkAvailableSpots(arrayToCheck) {
    return arrayToCheck.filter(spot => !spot.classList.contains('noughts') && !spot.classList.contains('cross'))
}

function gameOver(array) {
    if(array.length === 0) {
        alert('Game finished. Start again?')
        return;
    }
}

const rows = Object.values(children)
const rowPositions = rows.flatMap((row,index,array) => {
    const { children } = row
    const nodes = Object.values(children)
    return nodes
})

const combinations = rowPositions.reduce((allPositions, rowPosition) => {
    if(rowPosition.classList.contains(boardPositions.one.number)) {
        return {
            ...allPositions,
            diagonalRight: {
                row: [boardPositions.one.position, boardPositions.five.position, boardPositions.nine.position],
                finisher: 'Diagonal right'
            },
            diagonalLeft: {
                row: [boardPositions.three.postion, boardPositions.five.position, boardPositions.seven.position],
                finisher: 'Diagonal left'
            }
        }
    }
    if(rowPosition.classList.contains(boardPositions.one.number) | 
    rowPosition.classList.contains(boardPositions.four.number) | 
    rowPosition.classList.contains(boardPositions.seven.number)) {
        return {
            ...allPositions,
            straightLineHorizontal: {
                rows: [
                    {
                        rowPosition: 1,
                        row: [boardPositions.one.position, boardPositions.two.position, boardPositions.three.postion]
                    },
                    {
                        rowPosition: 2,
                        row: [boardPositions.four.position, boardPositions.five.position, boardPositions.six.position]
                    },
                    {
                        rowPosition: 3,
                        row: [boardPositions.seven.position, boardPositions.eight.position, boardPositions.nine.position]
                    }
                ],
                finisher: 'Straight line horizontal'
            }

        }
    }
    if(rowPosition.classList.contains(boardPositions.one.number) | 
    rowPosition.classList.contains(boardPositions.two.number) | 
    rowPosition.classList.contains(boardPositions.three.number)) {
        return {
            ...allPositions,
            straightLineVertical: {
                rows: [
                    {
                        rowPosition: 1,
                        row: [boardPositions.one.position, boardPositions.four.position, boardPositions.seven.position]
                    },
                    {
                        rowPosition: 2,
                        row: [boardPositions.two.position, boardPositions.five.position, boardPositions.eight.position]
                    },
                    {
                        rowPosition: 3,
                        row: [boardPositions.three.postion, boardPositions.six.position, boardPositions.nine.position]
                    }
                ],
                finisher: 'Straight line vertical'
            }

        }
    }
    
    return allPositions
}, {})

console.log(combinations)

const combinationKeys = Object.keys(combinations)

console.log(combinationKeys)

const createCanvas = (winningCombination, rowPos) => {
    const context = canvasBoard.getContext('2d')
    const { width, height } = canvasBoard
    switch(winningCombination) {
        case 'diagonalLeft': {
            context.moveTo(width,0)
            context.lineTo(0, height)
            context.stroke();
            return;
        }
        case 'diagonalRight': {
            context.moveTo(0,0)
            context.lineTo(width, height)
            context.stroke();
            return;
        }
        case 'straightLineVertical': {
            if(rowPos === 1) {
                const startingGridWidth = 0 + 30
                // 50 = distance from start of game board (minus padding) to the middle of column 1
                const startingWidth = startingGridWidth + 50
                context.moveTo(startingWidth,0)
                context.lineTo(startingWidth, height)
                context.stroke();
                return;
            }
            if(rowPos === 2) {
                const startingGridWidth = 0 + 30
                // 150 = distance from start of game board (minus padding) to the middle of the second column
                const startingWidth = startingGridWidth + 150
                context.moveTo(startingWidth,0)
                context.lineTo(startingWidth, height)
                context.stroke();
                return;
            }
            if(rowPos === 3) {
                const startingGridWidth = 0 + 30
                // 250 = distance from start of game board (minus padding) to the middle of the third column
                const startingWidth = startingGridWidth + 250
                context.moveTo(startingWidth,0)
                context.lineTo(startingWidth, height)
                context.stroke();
                return;
            }
        }
        case 'straightLineHorizontal': {
            if(rowPos === 1) {
                const startingGridHeight = 0 + 30
                // 50 = distance from start of game board (minus padding) to the middle of row 1
                const startingHeight = startingGridHeight + 50
                context.moveTo(0,startingHeight)
                context.lineTo(width, startingHeight)
                context.stroke();
                return;
            }
            if(rowPos === 2) {
                const startingGridHeight = 0 + 30
                // 150 = distance from start of game board (minus padding) to the middle of row 2
                const startingHeight = startingGridHeight + 150
                context.moveTo(0,startingHeight)
                context.lineTo(width, startingHeight)
                context.stroke();
                return;
            }
            if(rowPos === 3) {
                const startingGridHeight = 0 + 30
                // 250 = distance from start of game board (minus padding) to the middle of row 3
                const startingHeight = startingGridHeight + 250
                context.moveTo(0,startingHeight)
                context.lineTo(width, startingHeight)
                context.stroke();
                return;
            }
        }
    }

}

function successfulCombination(user='COMPUTER') {
    const combinationKey = combinationKeys.filter((key) => {
        if(key === 'straightLineVertical' || key === 'straightLineHorizontal') {
            const noughtCombination = combinations[key].rows.filter(r => {
                return r.row.filter(r => {
                    // console.log((r.classList.contains('noughts') && !r.classList.contains('cross')), 'hepoas')
                    return (r.classList.contains('noughts'))
                }).length === 3
            }).length === 1
            const crossCombination = combinations[key].rows.filter(r => {
                return r.row.filter(r => {
                    // console.log((r.classList.contains('noughts') && !r.classList.contains('cross')), 'hepoas')
                    return (r.classList.contains('cross'))
                }).length === 3
            }).length === 1
            return noughtCombination || crossCombination
        }
        const noughtCombination = combinations[key].row.filter((ck) => (ck.classList.contains('noughts'))).length === 3
        const crossCombination = combinations[key].row.filter((ck) => (ck.classList.contains('cross'))).length === 3
        return noughtCombination || crossCombination
    })

    console.log(combinationKey, 'keeey')

    const combinationMatch = combinationKey.flatMap(key => {
        if(key === 'straightLineVertical' || key === 'straightLineHorizontal') {
            return combinations[key].rows.filter(r => {
                return r.row.filter(r => {
                    // console.log((r.classList.contains('noughts') && !r.classList.contains('cross')), 'hepoas')
                    return (r.classList.contains('noughts') && !r.classList.contains('cross')) || (r.classList.contains('cross') && !r.classList.contains('noughts'))
                }).length === 3
            })
        }
        return combinations[key].row.filter((ck) => (ck.classList.contains('noughts')) || (ck.classList.contains('cross'))).length === 3
    })

    const finalResult = combinationKey.reduce((allKeys, key) => {
        if(key === 'straightLineVertical' || key === 'straightLineHorizontal') {
            return {
                ...allKeys,
                finisher: combinations[key].finisher,
                rows: [...combinationMatch]
            }
        }
        return {
            ...allKeys,
            finisher: combinations[key].finisher,
            rows:combinations[key].row.filter((ck) => (ck.classList.contains('noughts')) || (ck.classList.contains('cross')))
        }
    }, {})

    console.log(finalResult)

    if(Object.keys(finalResult).length) {
        alert('There is a winner! ' + finalResult.finisher)
        displayCurrentUser.innerText = `${user} WINS`
        const currentUser = user === localStorage.getItem('user') ? 'player' : 'computer'
        const currentTallyGrid = document.querySelector(`.${currentUser}s-score`).querySelector('.tally-grid')
        const currentTallyPoints = Object.values(currentTallyGrid.children)
        const lastTallyPoint = currentTallyPoints[currentTallyGrid.children.length - 1]
        const pointsContainer = lastTallyPoint.querySelector('.points-container')
        if(pointsContainer.children.length === 4) {
            const fragment = document.createDocumentFragment()
            const fifthPoint = document.createElement('div')
            fifthPoint.className = 'point-5'
            const point = document.createElement('p')
            point.className = 'points points-5'
            fifthPoint.appendChild(point)
            fragment.appendChild(fifthPoint)
            pointsContainer.appendChild(fragment)
        } else if(pointsContainer.children.length < 4){
            const point = document.createElement('p')
            point.className = 'points'
            pointsContainer.appendChild(point)
        } else if(pointsContainer.children.length === 5) {
            const tallyGrid = document.querySelector(`.${currentUser}s-score`).querySelector('.tally-grid')
            const currentTallyPoints = Object.values(tallyGrid.children)
            const lastTallyPoint = currentTallyPoints[tallyGrid.children.length - 1]
            const newTallyPoints = document.createElement('div')
            if(lastTallyPoint.className === 'tally-points') {
                newTallyPoints.className = 'tally-points-a'
            } else {
                newTallyPoints.className = 'tally-points'
            }
            console.log(newTallyPoints, 'ntw')
            const newPointsContainer = document.createElement('div')
            newPointsContainer.className = 'points-container'
            const point = document.createElement('p')
            point.className = 'points'
            newPointsContainer.appendChild(point)
            newTallyPoints.appendChild(newPointsContainer)
            tallyGrid.appendChild(newTallyPoints)
        }
        playagainButton.classList.toggle('play-again')
        const combKey = combinationKey.find(k => k)
        const { rowPosition } = finalResult.rows.find(r => r) 
        if(combKey === 'diagonalLeft' || combKey === 'diagonalRight') {
            createCanvas(combKey, rowPosition)
        } else {
            createCanvas(combKey, rowPosition)
        }
    }
}


rowPositions.map((rowPosition,index,array) => {
    rowPosition.addEventListener('click', (e) => {
        const availableSpots = checkAvailableSpots(array)
        if(availableSpots.length === 0) {
            console.log('end 1')
            alert('Draw. Play again?')
            return;
        } else {
            play(e.target, localStorage.getItem('user'))
            console.log(combinations, successfulCombination('PLAYER'))
        }
        const availableSpotsAfterPlay = checkAvailableSpots(array)
        if(availableSpotsAfterPlay.length === 0) {
            alert('Draw. Play again?')
            return;
        } else {
            const randomNumber = Math.floor(Math.random() * availableSpotsAfterPlay.length)
            const randomSpot = availableSpotsAfterPlay[randomNumber]
            setTimeout(() => {
                play(randomSpot)
                // console.log(combinations, successfulCombination())
            }, 1000)
        }
    })
})

playagainButton.addEventListener('click', () => {
    rowPositions.map(rowPosition => {
        if(rowPosition.classList.contains('cross') || rowPosition.classList.contains('noughts')) {
            rowPosition.classList.remove('cross') || rowPosition.classList.remove('noughts')
        }
    })
    
    playagainButton.classList.toggle('play-again')
    displayCurrentUser.innerText = `${localStorage.getItem('user')} TURN`
    const context = canvasBoard.getContext('2d')
    const { width, height } = canvasBoard
    context.clearRect(0,0, width, height)
    context.beginPath();
})


// for(row of children) {
//     for(position of row.children) {
//         position.addEventListener('click', (e) => {
//             play(e.target, 'player')
//             // setTimeout(() => play(e.target),1000)
//         })
//     }
// }

//TODO 
/* 
Find a way to insert noughts/crosses into each of the squares when clicked upon
Have the computer randomly pick a number between 1 - 9 and then insert a nought/cross there
IE. inserting a nought/cross should be a function that takes an element (number/row to insert) and the person requesting the insert (user or computer). If it's a user, put a nought. If it's the computer, put a cross. You can put computer by default, so that when a user wants to place a nought, you pass 'user' parmeter. When it's the computer, you don't pass any parameters
Change color for noughts to black and crosses to white
Create a function that detects when a match has been made
Create a function that checks if all 9 elements are filled. If so, it is a draw. No one gets a point. Ask to play again.
If a match has been made, draw a line across to highlight the win

Go through the matches and check to see if any of the match combinations contain only cross/noughts
Create a function that sees if there are any matches
When a match is found, console log saying match found and the kind of match that was found
Add a name key to the matches, so we know what kind of match is found (e.g. StraightLineHorizontal)

Change successfulCombination into a function that gets called

Spent 5hrs so far. Aim is to spend 6hrs and see where we get.

Spent 6hrs so far. Project is 70% done in 6hrs. We need to finish functionality, so when someone gets three in a row, the game ends. It only works when someone wins across or vertically.

Need to decide/remember what we are trying to do. Remember the orignial goal and the functionality needed will follow. 70% of the project done in 6hrs. In about 2hrs we could finish the entire project. Might have to tone down for the next project or spend some time going over what took so long and how we was doing over the entire time.

BEFORE YOU START, WATCH THE FUNCTIONAL PROGRAMMING VIDEO.

Quick idea, whenever we finish at the end of our time/day, make a commit to signal we are done coding

Watch functional programming video. Learnt that functions should be pure - only information they should be working on is the input they received. They shouldn't be relying on external data ie. data that comes from outside the input. Learnt that I am not actually doing 100% functional programming.

Focus today


After a win, give the option to play again
Create text above the gameboard that says who is playing, YOUR TURN or COMPUTERS TURN. When someone wins, change it to COMPUTER WINS or YOU WIN
Create a tally chart to the right of the gameboard with a blue background.

Spent around 9hrs 

Find a way to display points on the tally chart
Add colour to line drawn on winning match
Add white colour to computer, black colour to player
Add black colour to YOUR TURN and white colour to COMPUTERS TURN
Make line drawn on three in a row stay within the game board. IE. take 30px off so it stays within the game board
Make tally chart 2/3 the size of the game board

PLAN WHAT WE ARE GOING TO DO. WE WON'T EVEN DO ANY CODING THIS SESSION. WE WILL JUST PLAN AND WRITE DOWN WHAT WE WANT TO DO, WHAT SOLUTIONS TO USE e.g. use grid, then flexbox etc. Spend 1hr just deciding how to finish off what we've started. Plan what we are going to do until we can say ok I am basically done now.
*/