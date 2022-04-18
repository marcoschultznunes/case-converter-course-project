const upperCaseButton = document.getElementById("upper-case")
const lowerCaseButton = document.getElementById("lower-case")
const properCaseButton = document.getElementById("proper-case")
const sentenceCaseButton = document.getElementById("sentence-case")
const textArea = document.getElementById("text-area")
const downloadButton = document.getElementById("save-text-file")

const toProperCase = (str) => str.toLowerCase()
    .split(" ")
    .map(word => word.charAt(0).toUpperCase() + word.substring(1))
    .join(' ')

const toSentenceCase = (str) => {
    let sentenceArray = Array.from(str.toLowerCase())
    let dot = 1

    for(let i=0; i<sentenceArray.length; i++){
        if(sentenceArray[i].match(/[\?\.\!]/)){
            dot++
        }
        else if(dot == 3){ //... => no UC
            dot = 0
        }
        else if(dot > 0 && sentenceArray[i] !== ' '){ // Ignores spaces
            sentenceArray[i] = sentenceArray[i].toUpperCase()
            dot = 0
        }
    }

    return sentenceArray.join('')
}

upperCaseButton.addEventListener("click", () => {
    textArea.value = textArea.value.toUpperCase()
})
lowerCaseButton.addEventListener("click", () => {
    textArea.value = textArea.value.toLowerCase()
})
properCaseButton.addEventListener("click", () => {
    textArea.value = toProperCase(textArea.value)
})
sentenceCaseButton.addEventListener("click", () => {
    textArea.value = toSentenceCase(textArea.value)
})

const download = (filename, text) => {
    let element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
    element.setAttribute('download', filename);

    element.style.display = 'none';
    document.body.appendChild(element);

    element.click();

    document.body.removeChild(element);
}

downloadButton.addEventListener("click", () => {
    download("text.txt", textArea.value)
})
