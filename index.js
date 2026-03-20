const catsData = [


    {
        emotionTags: ["moody"],
        isGif: false,
        image: "angry.jpeg",
        alt: "A cat looking moody",
    },
    {
        emotionTags: ["moody", "insomniac"],
        isGif: false,
        image: "angry2.jpeg",
        alt: "A cat looking moody",
    },
    {
        emotionTags: ["moody"],
        isGif: false,
        image: "angry3.jpeg",
        alt: "A cat looking moody",
    },
    {
        emotionTags: ["confused", "sad"],
        isGif: false,
        image: "confused.jpeg",
        alt: "A cat looking confused",
    },
    {
        emotionTags: ["dominant", "moody"],
        isGif: false,
        image: "dominant.jpeg",
        alt: "A cat looking dominant",
    },
    {
        emotionTags: ["happy", "relaxed"],
        isGif: false,
        image: "happy.jpeg",
        alt: "A cat looking happy",
    },
    {
        emotionTags: ["hungry"],
        isGif: false,
        image: "hungry.jpeg",
        alt: "A cat looking hungry",
    },
    {
        emotionTags: ["hungry"],
        isGif: false,
        image: "hungry1.jpeg",
        alt: "A cat looking hungry",
    },
    {
        emotionTags: ["insomniac"],
        isGif: false,
        image: "insomnia.jpeg",
        alt: "A cat looking insomniac",
    },
    {
        emotionTags: ["insomniac"],
        isGif: false,
        image: "insomnia1.jpeg",
        alt: "A cat looking insomniac",
    },
    {
        emotionTags: ["relaxed"],
        isGif: false,
        image: "lazy.jpeg",
        alt: "A cat looking lazy",
    },
    {
        emotionTags: ["scared"],
        isGif: false,
        image: "nervous.jpeg",
        alt: "A cat looking nervous",
    },
    {
        emotionTags: ["sad"],
        isGif: false,
        image: "sad.jpeg",
        alt: "A cat looking sad",
    },
    {
        emotionTags: ["sad", "moody"],
        isGif: false,
        image: "sad1.jpeg",
        alt: "A cat looking sad",
    },
    {
        emotionTags: ["moody"],
        isGif: true,
        image: "angry.gif",
        alt: "A cat looking moody",
    },
    {
        emotionTags: ["moody"],
        isGif: true,
        image: "angry2.gif",
        alt: "A cat looking angry",
    },
    {
        emotionTags: ["confused"],
        isGif: true,
        image: "confused2.gif",
        alt: "A cat looking confused",
    },
    {
        emotionTags: ["dominant"],
        isGif: true,
        image: "dominant.gif",
        alt: "A cat looking dominant",
    },
    {
        emotionTags: ["happy"],
        isGif: true,
        image: "happy.gif",
        alt: "A cat looking happy",
    },
    {
        emotionTags: ["hungry", "sad", "confused"],
        isGif: true,
        image: "confused.gif",
        alt: "A cat looking hungry",
    },
    {
        emotionTags: ["hungry"],
        isGif: true,
        image: "hungry.gif",
        alt: "A cat looking hungry",
    },
    {
        emotionTags: ["hungry"],
        isGif: true,
        image: "hungry2.gif",
        alt: "A cat looking hungry",
    },
    {
        emotionTags: ["insomniac", "scared"],
        isGif: true,
        image: "insomnia2.gif",
        alt: "A cat looking insomniac",
    },
    {
        emotionTags: ["relaxed"],
        isGif: true,
        image: "lazy.gif",
        alt: "A cat looking relaxed",
    },
    {
        emotionTags: ["relaxed"],
        isGif: true,
        image: "relaxed2.gif",
        alt: "A cat looking relaxed",
    },
    {
        emotionTags: ["scared", "sad"],
        isGif: true,
        image: "nervous.gif",
        alt: "A cat looking nervous",
    },
    {
        emotionTags: ["scared"],
        isGif: true,
        image: "nervous2.gif",
        alt: "A cat looking scared",
    },
    {
        emotionTags: ["sad"],
        isGif: true,
        image: "sad.gif",
        alt: "A cat looking sad",
    },
]

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const animatedGIFsOnly = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')


emotionRadios.addEventListener('change', highlightCheckedOption);

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat);

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
                class="cat-img" 
                src="./images/${catObject.image}"
                alt="${catObject.alt}"
            >
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

