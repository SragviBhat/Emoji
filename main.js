prediction_1 = "";
prediction_2 = "";

Webcam.set({
width : 350,
height : 300,
image_format : 'png',
png_quality : 90
});

function speak(){
var synth = window.speechSynthesis;
word_1 = "Prediction 1 is " + prediction_1;
word_2 = "And Prediction 2 is " + prediction_1;
var utterThis = new SpeechSynthesisUtterance(word_1 + word_2);
synth.speak(utterThis);
}

Webcam.attach("webcam");

function takeSnapshot(){
Webcam.snap(function(data_uri){
document.getElementById("result"). innerHTML = "<img id='capture' src="+data_uri+">";
});
}

console.log('ml5 version', ml5.version);

classifier = ml5.imageClassifier("https://teachablemachine.withgoogle.com/models/4xb84DCdf/model.json", modelLoaded);
function modelLoaded(){
console.log("Model Loaded!");
};

function check(){
img = document.getElementById("capture");
classifier.classify(img, gotResult);
}

function gotResult(error, results){
if(error){
console.error(error)
}
else{
console.log(results);
document.getElementById("prediction_1").innerHTML = results[0].label;
document.getElementById("prediction_2").innerHTML = results[1].label;
prediction_1 = results[0].label;
prediction_2 = results[1].label;
if(results[0].label == "happy"){
document.getElementById("emoji_1").innerHTML = "&#128522;";
}
if(results[0].label == "sad"){
document.getElementById("emoji_1"). innerHTML = "&#128532;";
}
if(results[0].label == "angry"){
document.getElementById("emoji_1").innerHTML = "&#128548;";
}
if(results[1].label == "happy"){
document.getElementById("emoji_2").innerHTML = "&#128522;";
}
if(results[1].label == "sad"){
 document.getElementById("emoji_2").innerHTML = "&#128532;";
 }
 if(results[1].label == "angry"){
    document.getElementById("emoji_2").innerHTML = "&#128548;";
    }
}
speak();
}

