function initComparisons() {
	var x, i;
	/* Find all elements with an "overlay" class*/
	x = document.getElementsByClassName("img-comp-overlay");
	for (i = 0; i < x.length; i++) {
	  /* Loop over each overlay element as a parameter when 
		 executing function*/
	  compareImages(x[i]);
	}
	function compareImages(img) {
	  var slider, img, clicked = 0, w, h;
	  /* Get the width and height of the image*/
	  w = img.offsetWidth;
	  h = img.offsetHeight;
	  /* Set the width of the image to 50%*/
	  img.style.width = (w / 2) + "px";
	  /* Create slider */
	  slider = document.createElement("DIV");
	  slider.setAttribute("class", "img-comp-slider");
	  img.parentElement.insertBefore(slider, img);
	  slider.style.top = (h / 2) - (slider.offsetHeight / 2) + "px";
	  slider.style.left = (w / 2) - (slider.offsetWidth / 2) + "px";
	  /* Execute function with mouse button */
	  slider.addEventListener("mousedown", slideReady);
	  /*End slide function when mouse released*/
	  window.addEventListener("mouseup", slideFinish);
	  /*Execute function with touch screen*/
	  slider.addEventListener("touchstart", slideReady);
	   /* Release function for touch screen*/
	  window.addEventListener("touchend", slideFinish);
	  function slideReady(e) {
		/* Prevent other actions when slide is active*/
		e.preventDefault();
		/*Prepare slider to move when clicked*/
		clicked = 1;
		/* Execute slideMove while clicked */
		window.addEventListener("mousemove", slideMove);
		window.addEventListener("touchmove", slideMove);
	  }
	  function slideFinish() {
		/* Release slide */
		clicked = 0;
	  }
	  function slideMove(e) {
		var pos;
		/*Exit function if slide is not clicked */
		if (clicked == 0) return false;
		/* Get x position of cursor */
		pos = getCursorPos(e)
		/* Limit slider movement to image boundaries*/
		if (pos < 0) pos = 0;
		if (pos > w) pos = w;
		/* Execute slide function relative to cursor position */
		slide(pos);
	  }
	  function getCursorPos(e) {
		var a, x = 0;
		e = (e.changedTouches) ? e.changedTouches[0] : e;
		/* Get x positions of image*/
		a = img.getBoundingClientRect();
		/* Calculate cursor position relative to image*/
		x = e.pageX - a.left;
		x = x - window.pageXOffset;
		return x;
	  }
	  function slide(x) {
		/* Resize image according to cursor position*/
		img.style.width = x + "px";
		/* Move the slider */
		slider.style.left = img.offsetWidth - (slider.offsetWidth / 2) + "px";
	  }
	}
  } 
  
