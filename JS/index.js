// mapping variables to the web page classes, which is divided into separate classes  
const root = document.querySelector("body, html");
const container = document.querySelector('.gg-container');
const images = document.querySelectorAll(".gg-box > img");  // inside box class select its children element img
const l = images.length;

// It will show all images and number them (var i), and when they are clicked expand them with forward, backward and close button
for(var i = 0; i < l; i++) {
  images[i].addEventListener("click", function(i) {
    var currentImg = this;
    const parentItem = currentImg.parentElement, screenItem = document.createElement('div');  // the screenItem will create the new page over the main page
    screenItem.id = "gg-screen";
    container.prepend(screenItem);
    if (parentItem.hasAttribute('data-theme')) screenItem.setAttribute("data-theme", "dark");
    var route = currentImg.src;
    root.style.overflow = 'hidden';
    // the screenItem will show the image selected and previous, next, & close buttons 
    screenItem.innerHTML = '<div class="gg-image"></div><div class="gg-close gg-btn">&times</div><div class="gg-next gg-btn">&rarr;</div><div class="gg-prev gg-btn">&larr;</div>';
    const first = images[0].src, last = images[l-1].src;
    const imgItem = document.querySelector(".gg-image"), prevBtn = document.querySelector(".gg-prev"), nextBtn = document.querySelector(".gg-next"), close = document.querySelector(".gg-close");
    imgItem.innerHTML = '<img src="' + route + '">';

    if (l > 1) {  // when the any image is selected 
      if (route == first) {  // when the first image is selected hide the prev btn
        prevBtn.hidden = true;
        var prevImg = false;
        var nextImg = currentImg.nextElementSibling; // the next image will direct the screen to the next image i in line
      }
      else if (route == last) {  // when the last image is selected hide the next btn
        nextBtn.hidden = true;
        var nextImg = false;
        var prevImg = currentImg.previousElementSibling;
      }
      else {  // when the middle image is selected show both prev & next btn
        var prevImg = currentImg.previousElementSibling;
        var nextImg = currentImg.nextElementSibling;
      }
    }
    else {  // when the no image is selected 
      prevBtn.hidden = true;
      nextBtn.hidden = true;
    }

    // Close button
    screenItem.addEventListener("click", function(e) {
      if (e.target == this || e.target == close) hide();
    });

    // Using keyboard when user clicks on the key, perform the function of prev, next or close image
    root.addEventListener("keydown", function(e) {
      if (e.keyCode == 37 || e.keyCode == 38) prev();
      if (e.keyCode == 39 || e.keyCode == 40) next();
      if (e.keyCode == 27 ) hide();
    });

    prevBtn.addEventListener("click", prev);  // prevBtn will pass arguments prev() function 
    nextBtn.addEventListener("click", next);

    // To explain prev & next btn, Lets say we are on the image 3 of max 6 images 

    function prev() {
      prevImg = currentImg.previousElementSibling;  // get image 2 name
      imgItem.innerHTML = '<img src="' + prevImg.src + '">';  // show image 2 on the screen
      currentImg = currentImg.previousElementSibling;  // now tell the variable currentImg that img 2 is showing on the screen 
      var mainImg = document.querySelector(".gg-image > img").src;  // show image 2 on the screen
      nextBtn.hidden = false; // next button will be shown cause we came from the img 3, so next image definitely exists
      prevBtn.hidden = mainImg === first;  // prev button will be hidden if the img 1
    };

    function next() {
      nextImg = currentImg.nextElementSibling;  // get image 3 name
      imgItem.innerHTML = '<img src="' + nextImg.src + '">';  // show image 3 on the screen
      currentImg = currentImg.nextElementSibling;  // now tell the variable currentImg that img 3 is showing on the screen 
      var mainImg = document.querySelector(".gg-image > img").src;  // show image 3 on the screen
      prevBtn.hidden = false;  // prev button will be shown cause we came from the img 2, so prev image definitely exists
      nextBtn.hidden = mainImg === last;  // next button will be hidden if the img 6
    };

    function hide() {  // close button will just remove the screenItem from root
      root.style.overflow = 'auto';
      screenItem.remove();
    };
  });
}

// According to the properties of browser page setting properties and attributes  
function gridGallery (options) {
  if (options.selector) selector = document.querySelector(options.selector);  // if options selectors exists select it
  if (options.darkMode) selector.setAttribute("data-theme", "dark");  // when browser is on dark mode
  if (options.layout == "horizontal" || options.layout == "square") selector.setAttribute("data-layout", options.layout);  // device shape
  if (options.gaplength) selector.style.setProperty('--gap-length', options.gaplength + 'px');   // space between rows and columns
  if (options.rowHeight) selector.style.setProperty('--row-height', options.rowHeight + 'px');  // how long a row should be 
  if (options.columnWidth) selector.style.setProperty('--column-width', options.columnWidth + 'px');  // how fat a column should be
}