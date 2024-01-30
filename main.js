objects = [];

function preload(){
    video=createVideo('video.mp4');
    video.hide();
 }

function setup(){
    canvas = createCanvas(600,390);
    canvas.center();
}





function start(){
    objectDetector = ml5.objectDetector('cocossd',modelloaded);
    document.getElementById("status").innerHTML="status-Detecting Objects";

    
    
}

function modelloaded(){
    console.log("Model Is Loaded");
    status = true;
    video.loop();
    video.speed(1);
    video.volume(0);
}

function gotResult(error , result){
    if(error){
        console.log(error);
    }
    else{
        console.log(result);
        objects = result;
    }
}

function draw(){
    image(video , 0 ,0 ,600,390);
    if(status != "")
    {
     objectDetector.detect(video , gotResult);
     for(i=0; i< objects.length;i++){
         document.getElementById("status").innerHTML = "Status : Object Detected";
         document.getElementById("number_of_objects").innerHTML = "Numbers of Objects Detected:"+objects.length;
 
         fill("#FF0000");
         percent = floor(objects[i].confidence * 100);
         text(objects[i].label+ " " + percent + " % ", objects[i].x , objects[i].y);
         noFill();
         stroke("FF0000");
         rect(objects[i].x , objects[i].y , objects[i].width , objects[i].height);
 
        
 
         
 
     }
    }
 }