const input = document.querySelector('.username')

input.addEventListener('keydown', (e) => {
    if(e.code === 'Enter') {
        const user = e.target.value
    }
})