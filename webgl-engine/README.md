# Author    
Anthony D'Alesandro    
  
# How to use    
Open index.html in your browser. The key inputs are as requested:    
y/Y for yaw, p/P for pitch, r/R for roll.    
w/a/s/d for moving my object.    
arrows for rotating entire scene  
  
# Bonus Tasks implemented    
* (engine/util/matrix.js, engine/util/vec.js)   
fully customly created matrix library. I kept the scheme the same as glMatrix    
but I cleared out all the code and wrote it myself. Not a single line of code was referenced     
from the previous library.   
  
* (engine/util/quat.js)   
quaternions are implemented. The only code I had to outsource was    
pseudo code for the look at function. I wanted the camera to be    
easy to use in my 'engine'  
  
* I am requesting demoing my project. You can see this in demo.txt  
  
# Development enviornment  
Coded in MacOS nvim and viewed and tested on chrome.  
  
# Implementation Details    
I wanted to mimic the feeling that unity gives when coding. If you   
go through my code you might be able to see that. The interface that the  
developer would use is seen in 'engine/engine.js'. Additionally, all input  
is handled in the game loop and when a key is pressed it sets a boolean on.   
This is then handled in game.js at handleInput(); convuluted but allows   
functions to be called faster.  
