
let parent;
let down_active = false;
let swipe;
let Xini = 0;
let range = 0;
let rotation = 0;
let btn_active = false;
let limit_swipe = 70;
const btn_next = document.querySelector(".next");
const btn_prev = document.querySelector(".prev");
function init(){
	swipe = document.querySelector(".swipe_active");

	swipe.addEventListener("pointerdown", action );
	swipe.addEventListener("touchstart", action );
	swipe.addEventListener("pointerup", action );
}

init();

function action(){
	if( event.type == "pointerdown" && !down_active ){
		down_active = true;
		Xini = event.clientX;
		// console.log( "Xini  " +Xini )
		// console.log( "event.offsetX  " +event.offsetX )
		// console.log( "event.pageX  " +event.offsetX )
		// console.log( "event.clientX  " +event.clientX )
		// console.log( event )
	} 

	if( event.type == "pointerup" ){
		down_active = false;
		console.log(event.type); 
		pos_init()
	}
}

function pos_init(){
	swipe.style.left = "0px";
	swipe.style.transformOrigin = `0 0`;
	swipe.style.transform = `translateY(0px) rotate( 0deg )`;
	Xini = 0;
	range = 0;
	rotation = 0;
}

function nextTo(direction){
	// Agrega la clase de la animacion keyframes
	swipe.classList.add( direction );
	//console.log("agrego la clase de animacion")
	
	// Este evento se espera que termine la animacion keyframes
	swipe.addEventListener("transitionend",function(){
		console.log("quito la clase active")
		// Una vez terminada la animacion se remueve la clase active
		swipe.classList.remove("swipe_active");

		if( swipe.nextElementSibling ){
			swipe.nextElementSibling.classList.add("swipe_active");
			range = 0;
			rotation = 0;
			Xini = 0;

			// Reinicia la variable
			init();
		}
	})
}

btn_prev.addEventListener("click",()=>{
	if( !btn_active ){
		btn_active = true;

		nextTo("swipe_prev");

		setTimeout(()=>{
			btn_active = false;	
		}, 1000)
	}
})

btn_next.addEventListener("click",()=>{
	if( !btn_active ){
		btn_active = true;

		nextTo("swipe_next");

		setTimeout(()=>{
			btn_active = false;	
		}, 1000)
	}
})

document.addEventListener("pointermove",function(){
	if( down_active ){
		// Esta combinacion es perfecta
    	let newLeft = event.pageX - Xini;
    	swipe.style.left = newLeft + "px";

    	if( window.innerWidth < 998 ) limit_swipe = 40;

    	if( event.movementX >= 1 ){
    		if( range % 8 === 0 ) rotation += 1;
			
			if( range >= 1 ) swipe.style.transformOrigin = `left bottom`;
			swipe.style.transform = `translateY( ${ Math.abs( rotation ) }px) rotate( ${rotation}deg )`;

    		if( range >= limit_swipe ){
    			down_active = false;
    			//swipe.classList.add("swipe_next");
    			nextTo( "swipe_next" )
    			return;
    		}
    		range++;
    	} 

    	if( event.movementX <= -1 ){

			if( range <= -1 ) swipe.style.transformOrigin = `right bottom`;

    		if( range % 8 === 0 ) rotation -= 1;
			
			swipe.style.transform = `translateY( ${ Math.abs( rotation ) }px) rotate( ${rotation}deg )`;


    		if( Math.abs( range-- ) >= limit_swipe ){
    			down_active = false;
    			//swipe.classList.add("swipe_prev");
    			nextTo( "swipe_prev" )
    			return;
    		}
    	} 

    	
	}

})
