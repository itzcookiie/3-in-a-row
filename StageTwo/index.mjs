const input = document.querySelector('.username'),
    box = document.querySelector('.box');

input.addEventListener('keydown', (e) => {
    if(e.code === 'Enter') {
        const user = e.target.value
        localStorage.setItem('user', user)

        box.innerHTML = 
        `
            <div class="stage-three">
            <h1 class="game-title">YOUR TURN</h1>
            <div class="game-board">
                <div class="game-container">
                    <div class="top">
                        <div class="top-row one"></div>
                        <div class="top-row two"></div>
                        <div class="top-row three"></div>
                    </div>
                    <div class="middle">
                        <div class="middle-row four"></div>
                        <div class="middle-row five"></div>
                        <div class="middle-row six"></div>
                    </div>
                    <div class="bottom">
                        <div class="bottom-row seven"></div>
                        <div class="bottom-row eight"></div>
                        <div class="bottom-row nine"></div>
                    </div>
                </div>
                <div class="tally">
                    <h3 class="tally-title">TALLY</h3>
                    <div class="scores">
                        <div class="players-score">
                            <div class="player-name">
                                <h4>YOU</h4>
                            </div>
                            <div class="tally-grid">
                                <div class="tally-points">
                                    <div class="points-container">

                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="computers-score">
                            <h4>COMPUTER</h4>
                            <div class="tally-grid">
                                <div class="tally-points">
                                    <div class="points-container">

                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <canvas id="gamecube" class="gamecube" width="360" height="360"></canvas>
            <button class="play-button play-again">PLAY AGAIN</button>
        </div>
        `
        const js = document.createElement('script')
        js.src = './StageThree/index.mjs'
        document.body.appendChild(js)
    }
})

