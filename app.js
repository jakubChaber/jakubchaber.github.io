"use strict";

(function(){

  const toPoint = document.querySelector('.intro-text');
  const isFirefox = typeof InstallTrigger !== 'undefined';

  const init = class {
      constructor() {}
      tl            = gsap.timeline({ defaults: { ease: "expo.out" } });
      checker       = false;
      start         = function(){
                                  document.querySelector('html').scrollTop = 0;
                                  if(!this.checker){
                                      this.tl.to(".text", { z: "0", duration: 2.5, stagger: 0.5, onComplete: ()=>{ first3D();} });
                                  }else if(this.checker){
                                      this.tl.to(".dot", { opacity: 1, duration: .1, stagger: 0.1});
                                      this.tl.to(".text", { x: "-200%", duration: .2, stagger: 0.2});
                                      this.tl.to(".intro", { y: "-100vh", duration: 1.5, delay: .2 ,onComplete: ()=>{ document.body.style.overflowY="visible";  } });
                                      //mainList
                                      this.tl.fromTo(".tinyText > p", { opacity: 0 }, { opacity: 1, duration: 1 }); 
                                      this.tl.staggerFromTo(".myMessage__row", 0.4, { y:"150px", delay:0,  stagger: 1}, { y:"0"}, 0 );
                                      this.tl.fromTo("nav", { opacity: 0 }, { opacity: 1, duration: 1 });                                    
                                    } 
                      }   
  }





//strat
  const first = new init;
  first.start();
  setCursor();
//eo start

  toPoint.addEventListener('click',()=>{
      first.checker = true;
      document.querySelector('#pointer').style.width="40px"; 
      document.querySelector('#pointer').style.height="40px"; 
      document.querySelector('#pointer').innerText="";
      document.querySelector('#pointer').style.transform="scale(1)";
      setTimeout(() => {
        document.querySelector('#pointer').style.backgroundColor="#fff";
      }, 500);
      first.start();
  });





  //cursor
  function setCursor(){

      window.addEventListener('mousemove',function(e){
        let tempWidth  = (document.querySelector('#pointer').clientWidth)/2;
        let tempHeight = (document.querySelector('#pointer').clientHeight)/2;
        let condition  = (e.pageX >= (window.innerWidth)/2 -300 && e.pageX <= (window.innerWidth)/2 +300) && (e.pageY >= (window.innerHeight)/2 -200 && e.pageY <= (window.innerHeight)/2 +200) ;

        if(  condition && !first.checker ){
          document.querySelector('#pointer').style.transform       = "scale(3)"; 
        }else {
          document.querySelector('#pointer').style.transform       = "scale(1)";
          document.querySelector('#pointer').style.backgroundColor = "#fff";
        }

        document.querySelector('#pointer').style.top  = e.pageY-tempHeight+'px';
        document.querySelector('#pointer').style.left = e.pageX-tempWidth+'px';
        document.querySelector('#pointer').classList.toggle('active');
    });
  }

  window.addEventListener('scroll',()=>{
    setCursor();
  })






  function first3D(){
    const card = document.querySelector(".intro-text");
    const container = document.querySelector(".intro");
    const classHide = document.querySelectorAll(".hide");

    container.addEventListener("mousemove", (e) => {
      let div=120;
      if (typeof navigator !== 'undefined' && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) {
        div = 20;
      }
      let xAxis = (window.innerWidth / 2 - e.pageX) / div;
      let yAxis = (window.innerHeight / 2 - e.pageY) / div;
      card.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    });

    container.addEventListener("mouseenter", (e) => {

      setTimeout(
        ()=>{
          card.style.transition='all 0s ease';
          classHide.forEach(txt=>{
            txt.style.transform = ` scale(1)`;
            txt.style.lineHeight="normal";
          });
        }, 200
      )    
    });

    container.addEventListener("mouseleave", (e) => {
      card.style.transition = "all .5s ease";
      card.style.transform = `rotateY(0deg) rotateX(0deg)`;
      classHide.forEach(txt=>{
        txt.style.transform = ` scale(.5)`;
        txt.style.lineHeight="1.2rem";
      });
      
    });

  }


  window.addEventListener("focus", () => {
    document.querySelector("title").text = "Jakub Chaber";
  });
  window.addEventListener("blur", () => {
    document.querySelector("title").text = "Hope you check it...";
  });

  document.querySelector('.block > .content').addEventListener('mouseout',()=>{
  });


  // document.querySelector('#aboutLauncher').addEventListener('click',()=>{
  //   document.querySelector('.aboutModal').classList.toggle('active');
  // });

})();