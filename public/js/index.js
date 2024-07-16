const menu = document.getElementById('menu')
const ul_list = document.getElementById('ul-list')

menu.addEventListener('click',()=>{
  ul_list.classList.toggle('block_ul')
})

const nav = document.getElementById('nav')
nav.style.zIndex = '22'
let a = document.querySelectorAll('#nav a')

function colorWhite(){
  a.forEach((item)=>{
    item.style.color = 'white'
  }) 
}

function colorBlack(){
  a.forEach((item)=>{
    item.style.color = 'blue'
  }) 
}

window.addEventListener('scroll',()=>{
  if(document.body.scrollTop > 10 || document.documentElement.scrollTop > 10){
    nav.style.position = 'fixed'
    nav.style.backgroundColor = 'blue'
    nav.style.padding = '1.5rem'
    nav.style.transition = '.5s'
    colorWhite()
    menu.style.backgroundColor = 'white'
    menu.style.color = 'blue'
  }
  else{
    nav.style.position = 'sticky'
    nav.style.backgroundColor = 'white'
    colorBlack()
    menu.style.backgroundColor = 'blue'
    menu.style.color = 'white'
    nav.style.padding = '1rem'
  }
})


let slides = document.querySelectorAll('.slider')
let btns = document.querySelectorAll('.btn');
let currenrSlide = 1

let manualNav = function(manual){

  slides.forEach((slide) => {
    slide.classList.remove('active');
    
    btns.forEach((btn) =>{
      btn.classList.remove('active')
    })
  })

  slides[manual].classList.add('active');
  btns[manual].classList.add('active');
}

btns.forEach((btn, i) =>{
  btn.addEventListener('click', () => {
    manualNav(i)
    currenrSlide = i
  })
})

//autoplay

let repeat = function(activeClass){
  let active = document.getElementsByClassName('active');
  let i = 1;

  let reapter = () =>{
    setTimeout(function (){
      [...active].forEach((activeSlide) => {
        activeSlide.classList.remove('active')
      })
      slides[i].classList.add('active')
      btns[i].classList.add('active')
      i++;

      if(slides.length == i){
        i = 0;
      }
      if(i >= slides.length){
        return;
      }
      reapter();
    },3000)
  }
  reapter()
}
repeat();