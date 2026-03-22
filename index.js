import { catsData } from "./data.js"

const emotionRadios = document.getElementById('emotion-radios')
const animatedGIFsOnly = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')

emotionRadios.addEventListener('change', highlightCheckedOption);

// memeModalCloseBtn.addEventListener('click', closeModal);

// getImageBtn.addEventListener('click', renderCat);

document.addEventListener('click', function(e) {
    if (e.target.id === 'get-image-btn') {
        renderCat();

    } else if (e.target.id === 'meme-modal-close-btn') {
        closeModal();
           
    } else if (e.target.id !== 'meme-modal') {
        closeModal();

    }
})

function highlightCheckedOption(e) {
    const radioArray = document.getElementsByClassName('radio')
    for (let radio of radioArray) {
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

function closeModal() {
    memeModal.style.display = 'none'    
}

function renderCat() {
    const catObject = getSingleCatObject()   
    memeModalInner.innerHTML = `
                <img 
                    class='cat-img'
                    src='./images/${catObject.image}'
                    alt='${catObject.alt}'
                />
            `
    memeModal.style.display = 'flex'
}

function getSingleCatObject() {
    const catsArray = getMatchingCatsArray()
    if(catsArray.length === 1) {
        return catsArray[0];
    } else {
        const index = Math.floor(Math.random() * catsArray.length)
        return catsArray[index];   
    }
}

function getMatchingCatsArray() {
    
    const selectedEmotion = document.querySelector('input[type="radio"]:checked')
    if (selectedEmotion) {
        const isGIFsOnlySelected = animatedGIFsOnly.checked

        const matchingCatsArray = catsData.filter(function(cat){
            if (isGIFsOnlySelected) {
                return cat.emotionTags.includes(selectedEmotion.value) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion.value)
            }
        })
        
        return matchingCatsArray;   
    }     
}


function getEmotionsArray(cats){
    const emotionsArray = []
    for (let cat of cats) {
        for (let emotion of cat.emotionTags) {
            if(!emotionsArray.includes(emotion)) {
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray;
}

function renderEmotionsRadios(cats) {
    let radioItems = ''
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions) {
        radioItems += `
                <div class="radio">
                    <label for='${emotion}'>${emotion}</label>
                    <input 
                        type='radio'
                        id='${emotion}'
                        value='${emotion}'
                        name='emotions'
                    />
                </div>
            `
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)

