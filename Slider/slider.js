const sliderLine = document.querySelector('.slider-line');
const slideImages = document.querySelectorAll(".slider-line img");
const prevBtn = document.querySelector(".slider-prev");
const nextBtn = document.querySelector(".slider-next");
var dots = document.querySelector('.dots');

let counter = 1;
let offset = 0;
const size = slideImages[0].clientWidth;
offset = counter*size;
let moveEndevent = new Event("moveEnd");

sliderLine.style.left = -offset + 'px';

 nextBtn.addEventListener('click', function() {
    if(counter>=slideImages.length -1) return;  
    counter++;

    

    nextBtn.disabled = true;
      offset = counter*size;
    let position = Math.abs(parseInt(sliderLine.style.left));
    var timer = setInterval(function() {
      
        position += 5;
        
         sliderLine.style.left =  -position  + 'px';
        
          if(position >= offset){
               clearInterval(timer)
              sliderLine.dispatchEvent(moveEndevent);
              nextBtn.disabled = false;
               
            };
    }, 5);
    
});
prevBtn.addEventListener('click', function () {
     if(counter<=0) return;
     counter--;


     prevBtn.disabled = true;
    offset = counter*size;
    let position = Math.abs(parseInt(sliderLine.style.left));
    var timer = setInterval(function() {
      
        position -= 5;
        
         sliderLine.style.left =  -position  + 'px';
          if(position <= offset){
               prevBtn.disabled = false;
               clearInterval(timer)
              sliderLine.dispatchEvent(moveEndevent);
               
            };
    }, 5);
});
 sliderLine.addEventListener('moveEnd',function(){
     if(slideImages[counter].id === 'last-clone'){
         counter = slideImages.length - 2;

          offset = counter*size;
          sliderLine.style.transition = "none";
         sliderLine.style.left = -offset + 'px';
     }
     if(slideImages[counter].id === 'first-clone'){
        counter = slideImages.length - counter;
         offset =  counter*size;
         sliderLine.style.transition = "none";
        sliderLine.style.left = -offset + 'px';
    }
    document.querySelector('.dots .selected').classList.remove('selected');
    dots.children[counter-1].classList.add('selected');

 });

 document.querySelectorAll('.dot').forEach(function(indicator, ind){
     indicator.addEventListener("click",function(){
         if(indicator.classList.contains("selected"))return;else
       document.querySelector('.dots .selected').classList.remove('selected');
        indicator.classList.add('selected');  
      
        let position = Math.abs(parseInt(sliderLine.style.left));
    
         if(counter>ind){
            counter = ind+1;
            offset = counter*size;
            if(position == offset)return;
            var timer = setInterval(function() 
            {
      
                position -= 5;
                
                 sliderLine.style.left =  -position  + 'px';
                  if(position <= offset){
                       prevBtn.disabled = false;
                       clearInterval(timer)
                      sliderLine.dispatchEvent(moveEndevent);
                       
                    };
            }, 5);
        } else{
            counter = ind+1;
            offset = counter*size;
            if(position == offset)return;
            var timer = setInterval(function() 
            {
      
                position += 5;
                
                 sliderLine.style.left =  -position  + 'px';
                  if(position >= offset){
                       prevBtn.disabled = false;
                       clearInterval(timer)
                      sliderLine.dispatchEvent(moveEndevent);
                       
                    };
            }, 5);
            
        }

     });
 });


