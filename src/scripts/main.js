import { getUser} from "./src/scripts/services/user.js"
import { getRepos} from "./src/scripts/services/repositories.js"
import { user} from "./src/scripts/objects/user.js"
import { screen} from "./src/scripts/objects/screen.js"

document.getElementById('btn-search').addEventListener('click', () => {
    const userName = document.getElementById('input-search').value
    if(validadeInput(userName)) return
    getUserData(userName)
})


document.getElementById('input-search').addEventListener('keyup', (e) => {
        const userName = e.target.value
        const key = e.which || e.keyCode
        const isEnterKeyPressed = key ===13
        if (isEnterKeyPressed){
            if(validadeInput(userName)) return
            getUserData(userName)
        }

})

function validadeInput(userName){
    if(userName.length===0){
        alert('Digite um nome de usuário')
        return true
    }
}

async function getUserData(userName){
    const userResponse = await getUser(userName)

    if(userResponse.message === 'Not Found'){
        screen.renderNotFound()
        return
    }

    const repositoriesReponse = await getRepos(userName)
    
    user.setInfo(userResponse)
    user.setRepos(repositoriesReponse)

    screen.renderUser(user)
}



