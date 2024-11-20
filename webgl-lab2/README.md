# Directory  
├── README.md		  
├── color.js	(defines a class for colors)  
├── gl\_init.js (defines the gl class for rendering and pipeline)  
├── helper.js		(defines a helper class)  
├── input\_handler.js	(defines all input handling)  
├── lab1.html	(main html heiarchy)  
├── lab1.js	(main javascript that controls all program flow)  
├── shader\_setup.js (sets up the shaders and controls the code)  
├── shapeBuffer.js  (holds an instance to all the shape buffers)  
├── shapes.js		(holds a class that defines a game object or shape)  
└── tonyMatrix.js		(holds all the matrix math neccesary for affine transformations)  
  
# How to use  
To display the webpage, open lab1.html on your browser of choice  
  
s/S for scaling  
w/W for toggling global transformations  
r/g/b for changing the color that the next item you draw it.  
p/h/v/t/q/R for drawing certain shapes.  
c to clear the screen  
d to redisplay the screen  
  
left click to place a shape    
hold left click after placing to rotate it globally/locally depending on mode    
click a previously placed shape to rotate it but also select it as the current shape    
hit the toggle recoloring button to allow recolor shapes    
you can use r/g/b to recolor the current shape    
you can scale and it will effect the current shape. The sscaling will happen locally/globally  
  
# Bonus Tasks Implemented  
If you click on a shape you already drew, it 'selects' that shape. Then you can hit s or S for scaling   
	and r/g/b for coloring. Hit the button to toggle allowing recoloring. because it can get annoying.  
  
I wrote my own matrix arithmatic calculator. tonyMatrix.js is the file that has all of that logic.  
  
# Enviornment  
I coded on MacOS using NeoVim and displayed the webpage using the latest version of Chrome.   
  
