const rootElement = document.querySelector('.root'),
    stageOne = document.querySelector('.stage-one'),
    stageTwo = document.querySelector('.stage-two'),
    stageThree = document.querySelector('.stage-three'),
    startGame = document.querySelector('.play-button'),
    boxElement = document.querySelector('.box');

startGame.addEventListener('click', () => {
    boxElement.innerHTML = 
    `
    <div class="stage-two">
        <h1 class="game-title">Enter a username</h1>
        <input size="75" class="username" type="text" placeholder="Enter here...">
        <p class="play-message">Press enter to begin</p>
    </div>
    `
    const js = document.createElement('script')
    js.src = './StageTwo/index.mjs'
    document.body.appendChild(js)
})