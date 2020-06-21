const game = document.querySelector('.game-container')
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
    if(user === 'player') {
        node.classList.toggle('noughts', node.classList.length < 3)
        return;
    }
    node.classList.toggle('cross', node.classList.length < 3)
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
                        row: [boardPositions.one.position, boardPositions.two.position, boardPositions.three.postion]
                    },
                    {
                        row: [boardPositions.four.position, boardPositions.five.position, boardPositions.six.position]
                    },
                    {
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
                        row: [boardPositions.one.position, boardPositions.four.position, boardPositions.seven.position]
                    },
                    {
                        row: [boardPositions.two.position, boardPositions.five.position, boardPositions.eight.position]
                    },
                    {
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

function successfulCombination() {
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
                    return (r.classList.contains('noughts'))
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
        return combinations[key].row.filter((ck) => (ck.classList.contains('noughts') && !ck.classList.contains('cross')) || (ck.classList.contains('cross') && !ck.classList.contains('noughts'))).length === 3
    })

    const finalResult = combinationKey.reduce((allKeys, key) => {
        if(key === 'straightLineVertical' || key === 'straightLineHorizontal') {
            return {
                finisher: combinations[key].finisher,
                rows: [...combinationMatch]
            }
        }
        return combinations[key].row.filter((ck) => (ck.classList.contains('noughts') && !ck.classList.contains('cross')) || (ck.classList.contains('cross') && !ck.classList.contains('noughts'))).length === 3
    }, [])

    console.log(finalResult)

    if(Object.keys(finalResult).length) {
        alert('There is a winner! ' + finalResult.finisher)
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
            play(e.target, 'player')
        console.log(combinations, successfulCombination())
        }
        const availableSpotsAfterPlay = checkAvailableSpots(array)
        if(availableSpotsAfterPlay.length === 0) {
            alert('Draw. Play again?')
            return;
        } else {
            const randomNumber = Math.floor(Math.random() * availableSpotsAfterPlay.length)
            const randomSpot = availableSpotsAfterPlay[randomNumber]
            setTimeout(() => play(randomSpot), 1000)
        }

    })
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
*/