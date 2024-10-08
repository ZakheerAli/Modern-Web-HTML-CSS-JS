
const scroll = new LocomotiveScroll({
    el: document.querySelector("#main"),
    smooth: true
});
function firstPageAnimation(){
    var tl=gsap.timeline();
    tl.from("#navbar",{
        y:`-10`,
        opacity:0,
        ease:Expo.easeInOut,
        duration:1.5,
    })
    .to(".bounding-elem",{
        y:0,
        ease:Expo.easeInOut,
        duration:2,
        delay:-1,
        stagger:.2,
    })
    .from("#hero-footer",{
        opacity:0,
        y:-10,
        ease:Expo.easeInOut,
        duration:1.5,
        delay:-1,
    })
}
let timeOut;
function circleSkew(){
    //define default scale
    let xscale=1;
    let yscale=1;

    let xprev=0;
    let yprev=0;

    window.addEventListener("mousemove",function(details){
        clearTimeout(timeOut);
        let xdiff= details.clientX - xprev;
        let ydiff= details.clientY-yprev;

        xscale=gsap.utils.clamp(0.8 , 1.2 , xdiff);
        yscale=gsap.utils.clamp(0.8 , 1.2 , ydiff);

        xprev= details.clientX;
        yprev= details.clientY;

        CircleMouseFollower(xscale,yscale)
        this.setTimeout(function(){
             document.querySelector("#mini-circle").style.transform=`translate(${details.clientX}px ,${details.clientY}px) scale(1,1)`
        },100)
        
    })
}
function CircleMouseFollower(xscale ,yscale){
    window.addEventListener("mousemove", function(details){
    document.querySelector("#mini-circle").style.transform=`translate(${details.clientX}px ,${details.clientY}px) scale(${xscale},${yscale})`;
    })
}
CircleMouseFollower();
firstPageAnimation();
circleSkew();

document.querySelectorAll(".element").forEach(function(element){
    let rotate= 0;
    let diffRot=0;

    element.addEventListener("mouseleave" ,function(details){
        gsap.to(element.querySelector("img") ,{
                   opacity:0,
                   ease: Power3,
                   duration:0.5,
                })
})
    element.addEventListener("mousemove" ,function(details){
   let diff=details.clientY - element.getBoundingClientRect().top;
   diffRot=details.clientX-rotate;
   rotate=details.clientX;

        gsap.to(element.querySelector("img") ,{
            opacity:1,
            ease: Power3,
            top: diff,
            left: details.clientX,
            rotate:gsap.utils.clamp(-20,20,diffRot*0.5),
        })
    })
});

