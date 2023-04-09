var cardBox = document.querySelector(".cardbox");

async function asyncSetImage(htmlElement, objectURL) {
    var generatedURL = objectURL;
    fetch(objectURL).then(async function(response) {
        const result = await response.blob();
        generatedURL = URL.createObjectURL(result);
        htmlElement.src = generatedURL;
        return generatedURL;
    });
    return generatedURL;
}
async function setText(textElement, imageElement,textURL) {
    var xhr = new XMLHttpRequest();
    xhr.responseType = "json";
    xhr.open("GET", textURL, true);
    xhr.onload = function() {
        var rawResponse = xhr.response;
        console.log(rawResponse);
        var textResponse = rawResponse.name;
        for(const [key,value] of Object.entries(rawResponse.data)) {
            textResponse += ", " + key + ": " + value;
        }
        textElement.innerText = textResponse;
        imageElement.alt = textResponse;
    }
    xhr.send();
}

var smallestID = 4;
for (var i = 0; i<2;i++){
    var newCard = document.createElement("div");
    newCard.classList.add("card");
    newCard.id = i;

    var newIMG = document.createElement("img");
    newIMG.id = "img" + i;
    var requestURLBase = "https://placekitten.com/200/20";
    var imageURL = requestURLBase + i;
    var imageData = asyncSetImage(newIMG,imageURL);

    var myText = document.createElement("div");
    myText.classList.add("productText");
    var restURL = "https://api.restful-api.dev/objects/";
    var newID = i + smallestID;
    var textURL = restURL + newID;
    var altText = setText(myText, newIMG, textURL);
    newIMG.alt = altText;

    cardBox.appendChild(newCard);
    newCard.appendChild(newIMG);
    newCard.appendChild(myText);
}

const productDisplay = document.querySelector("#toggle_content");
productDisplay.addEventListener("click", () => {
    const showing = cardBox.style.visibility === 'hidden';
    cardBox.style.visibility = showing ? 'visible' : 'hidden';
});

const animationToggle = document.querySelector("#toggle_animation");
animationToggle.addEventListener("click", () => {
    const flowers = document.querySelectorAll(".flower__petal");
    flowers.forEach( flower => {
        flower.classList.toggle("pausable");
    });
});