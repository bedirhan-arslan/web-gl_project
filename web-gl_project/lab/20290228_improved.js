var gl;

var delay = 40;

var theta = 0.0;
var thetaLoc;

var ezscale = 1.0;
var scaleLoc;
var ezx = -0.05;
var ezxLoc;
var ezy = 0.0;
var ezyLoc;

var bgColor = [0.94, 0.94, 0.94];

var isiklioyuncubilgisayari = false;

var isiklioyuncubilgisayariCanvas = false;

function randomColor() {
    ezrandom = Math.random() * (1.0 - 0.1) + 0.1;
    return ezrandom;
}

function epilepsyFrag(){
    ezcolors[0] = randomColor();
    ezcolors[1] = randomColor();
    ezcolors[2] = randomColor();
    redValue.innerText = ezcolors[0].toFixed(2);
    greenValue.innerText = ezcolors[1].toFixed(2);
    blueValue.innerText = ezcolors[2].toFixed(2);
}

function epilepsyCanvas(){
    canvasColor[0] = randomColor();
    canvasColor[1] = randomColor();
    canvasColor[2] = randomColor();
}

/*_gtx7501gb_islemci0nokta3cekirdek_anakartramcopten_psupatates*/

var ezcolors = [0.75 , 0.10, 0.45, 1.0];

var colorsLoc;

var program;

var n_vPosition;
var b_vPosition;
var b_bufferId;
var n_bufferId;

var ccr = 0.02;

var canvasColor = [0.16, 0.17, 0.21];

var changeSpinDir = false;
var stop_start = false;


window.onload = function init()
{
    const canvas = document.querySelector( "#glcanvas" );

    gl = WebGLUtils.setupWebGL( canvas );
    if ( !gl ) { alert( "WebGL isn't available" ); }

    //  Load shaders and initialize attribute buffers
    program = initShaders( gl, "vertex-shader", "fragment-shader" );

    var delayRate = document.getElementById("delayRate");

    var myButton = document.getElementById("ChangeSpinDir");
    myButton.addEventListener("click",
                function() {changeSpinDir = !changeSpinDir;});

    delayRate.innerText = delay;
    scaleRate.innerText = ezscale.toFixed(2);

    ezcolors[0] = randomColor();
    ezcolors[1] = randomColor();
    ezcolors[2] = randomColor();
    redValue.innerText = ezcolors[0].toFixed(2);
    greenValue.innerText = ezcolors[1].toFixed(2);
    blueValue.innerText = ezcolors[2].toFixed(2);


    window.addEventListener("keydown", 
    function() {
        if (event.shiftKey){
            switch(event.keyCode){
                case 37: // 'leftArrow'
                    theta += 0.1;
                    break;

                case 39: // 'rightArrow'
                    theta -= 0.1;
                    break;
                case 67: // 'C'
                    canvasColor[0] = randomColor();
                    canvasColor[1] = randomColor();
                    canvasColor[2] = randomColor();
                    break;
                case 70: // 'F'
                    isiklioyuncubilgisayariCanvas = !isiklioyuncubilgisayariCanvas;
                    break;
                case 74: // 'J'
                    if (canvasColor[0]-ccr >= 0.0) canvasColor[0] -= ccr;
                        else{canvasColor[0] = 0.0;}
                    break;
                case 75: // 'K'
                    if (canvasColor[1]-ccr >= 0.0) canvasColor[1] -= ccr;
                        else{canvasColor[1] = 0.0;}
                        break;
                case 76: // 'L'
                    if (canvasColor[2]-ccr >= 0.0) canvasColor[2] -= ccr;
                        else{canvasColor[2] = 0.0;}
                    break;
                case 85: // U'
                    if (canvasColor[0]+ccr <= 1.0) canvasColor[0] += ccr;
                        else{canvasColor[0] = 1.0;}
                    break;
                case 73: // 'I'
                    if (canvasColor[1]+ccr <= 1.0) canvasColor[1] += ccr;
                        else{canvasColor[1] = 1.0;}
                    break;
                case 79: // 'O'
                    if (canvasColor[2]+ccr <= 1.0) canvasColor[2] += ccr;
                        else{canvasColor[2] = 1.0;}
                    break;
            }
        }
        else{
            switch (event.keyCode) {
                case 37: // 'leftArrow'
                    if(ezx > -1)ezx -= 0.05;
                    break;
                case 38: // 'upArrow'
                    if(ezy < 1)ezy += 0.05;
                    break;
                case 39: // 'rightArrow'
                    if(ezx < 1) ezx += 0.05;
                    break;
                case 40: // 'downArrow'
                    if(ezy > -1)ezy -= 0.05;
                    break;
                case 107: // '+'
                    if(ezscale+0.05 < 5.01){ezscale += 0.05;}
                    scaleRate.innerText = ezscale.toFixed(2);
                    break;
                case 109: // '-'
                    if(ezscale-0.05 > 0.09){ezscale -= 0.05;}
                    scaleRate.innerText = ezscale.toFixed(2);
                    break;
                case 65: // 'A'
                    changeSpinDir = false;
                    break;
                case 68: // 'D'
                    changeSpinDir = true;
                    break;
                case 67: // 'C'
                    ezcolors[0] = randomColor();
                    ezcolors[1] = randomColor();
                    ezcolors[2] = randomColor();
                    redValue.innerText = ezcolors[0].toFixed(2);
                    greenValue.innerText = ezcolors[1].toFixed(2);
                    blueValue.innerText = ezcolors[2].toFixed(2);
                    break;
                case 70: // 'F'
                    isiklioyuncubilgisayari = !isiklioyuncubilgisayari;
                    break;
                case 71: // 'G'
                    canvasColor = [bgColor[0], bgColor[1], bgColor[2]];
                    break;
                case 82: // 'R'
                    stop_start = !stop_start;
                    break;
                case 84: // 'T'
                    theta = 0;
                    ezx = -0.05;
                    ezy = 0;
                    ezscale = 1.0;
                    stop_start = false;
                    scaleRate.innerText = ezscale.toFixed(2);
                    break;
                case 87: // 'W'
                    if (delay > 5){delay -= 5;}
                    delayRate.innerText = delay;
                    break;
                case 83: // 'S'
                    if (delay < 100){delay += 5;}
                    delayRate.innerText = delay;
                    break;
                case 85: // 'J'
                    if (ezcolors[0]+ccr <= 1.0) ezcolors[0] += ccr;
                    else{ezcolors[0] = 1.0;}
                    redValue.innerText = ezcolors[0].toFixed(2);
                    break;
                case 73: // 'K'
                    if (ezcolors[1]+ccr <= 1.0) ezcolors[1] += ccr;
                    else{ezcolors[1] = 1.0;}
                    greenValue.innerText = ezcolors[1].toFixed(2);
                    break;
                case 79: // 'L'
                    if (ezcolors[2]+ccr <= 1.0) ezcolors[2] += ccr;
                    else{ezcolors[2] = 1.0;}
                    blueValue.innerText = ezcolors[2].toFixed(2);
                    break;
                case 74: // 'U'
                    if (ezcolors[0]-ccr >= 0.0) ezcolors[0] -= ccr;
                    else{ezcolors[0] = 0.0;}
                    redValue.innerText = ezcolors[0].toFixed(2);
                    break;
                case 75: // 'I'
                    if (ezcolors[1]-ccr >= 0.0) ezcolors[1] -= ccr;
                    else{ezcolors[1] = 0.0;}
                    greenValue.innerText = ezcolors[1].toFixed(2);
                    break;
                case 76: // 'O'
                    if (ezcolors[2]-ccr >= 0.0) ezcolors[2] -= ccr;
                    else{ezcolors[2] = 0.0;}
                    blueValue.innerText = ezcolors[2].toFixed(2);
                    break;
                case 100: // Numpad 4
                    if (bgColor[0] - ccr < 0){bgColor[0] = 0;}
                    else{bgColor[0] -= ccr;}
                    document.body.style.backgroundColor = 'rgb('+(bgColor[0]*255).toFixed(0)+', '+(bgColor[1]*255).toFixed(0)+', '+(bgColor[2]*255).toFixed(0)+')';
                    break;
                case 101: // Numpad 5
                    if (bgColor[1] - ccr < 0){bgColor[1] = 0;}
                    else{bgColor[1] -= ccr;}
                    document.body.style.backgroundColor = 'rgb('+(bgColor[0]*255).toFixed(0)+', '+(bgColor[1]*255).toFixed(0)+', '+(bgColor[2]*255).toFixed(0)+')';
                    break;
                case 102: // Numpad 6
                    if (bgColor[2] - ccr < 0){bgColor[2] = 0;}
                    else{bgColor[2] -= ccr;}
                    document.body.style.backgroundColor = 'rgb('+(bgColor[0]*255).toFixed(0)+', '+(bgColor[1]*255).toFixed(0)+', '+(bgColor[2]*255).toFixed(0)+')';
                    break;
                case 103: // Numpad 7
                    if (bgColor[0] + ccr > 1){bgColor[0] = 1;}
                    else{bgColor[0] += ccr;}
                    document.body.style.backgroundColor = 'rgb('+(bgColor[0]*255).toFixed(0)+', '+(bgColor[1]*255).toFixed(0)+', '+(bgColor[2]*255).toFixed(0)+')';
                    break;
                case 104: // Numpad 8
                    if (bgColor[1] + ccr > 1){bgColor[1] = 1;}
                    else{bgColor[1] += ccr;}
                    document.body.style.backgroundColor = 'rgb('+(bgColor[0]*255).toFixed(0)+', '+(bgColor[1]*255).toFixed(0)+', '+(bgColor[2]*255).toFixed(0)+')';
                    break;
                case 105: // Numpad 9
                    if (bgColor[2] + ccr > 1){bgColor[2] = 1;}
                    else{bgColor[2] += ccr;}
                    document.body.style.backgroundColor = 'rgb('+(bgColor[0]*255).toFixed(0)+', '+(bgColor[1]*255).toFixed(0)+', '+(bgColor[2]*255).toFixed(0)+')';
                    break;
                   }
                }
            });

    /*document.getElementById("slidered").onchange = function() {ezcolors[0] = this.value;
                redValue.innerText = ezcolors[0].toFixed(2);};
            document.getElementById("slidegreen").onchange = function() {ezcolors[1] = this.value;
                greenValue.innerText = ezcolors[1].toFixed(2);};
    document.getElementById("slideblue").onchange = function() {ezcolors[2] = this.value;
        blueValue.innerText = ezcolors[2].toFixed(2);};*/
    

    //  Changing Spin Rate
    var setStartLoc = document.getElementById("startLoc");
    setStartLoc.addEventListener("click",
                function() {
                    theta = 0;
                    ezx = -0.05;
                    ezy = 0;
                    ezscale = 1.0;
                    stop_start = false;
                    scaleRate.innerText = ezscale.toFixed(2);
                });

    var spinFast = document.getElementById("SpinFaster");
    spinFast.addEventListener("click",
                function() {if (delay > 5){delay -= 5;};
                    delayRate.innerText = delay;});
    
    var spinSlow = document.getElementById("SpinSlower");
    spinSlow.addEventListener("click",
                function() {if (delay < 100){delay += 5;}
                    delayRate.innerText = delay;});
    
    var scalePlus = document.getElementById("Scale+");
    scalePlus.addEventListener("click",
        function() {if(ezscale+0.05 > 0.09){ezscale += 0.05;}
        scaleRate.innerText = ezscale.toFixed(2);});

    var scaleMinus = document.getElementById("Scale-");
    scaleMinus.addEventListener("click",
        function() {if(ezscale-0.05 > 0.09){ezscale -= 0.05;}
        scaleRate.innerText = ezscale.toFixed(2);});
    

	// Stop or Start Spinning
    var stopStart = document.getElementById("StopStart");
    stopStart.addEventListener("click",
                function() {stop_start = !stop_start;});
    
    var redPl = document.getElementById("redplus");
    redPl.addEventListener("click", function() {if (ezcolors[0]+ccr <= 1.0) ezcolors[0] += ccr;
        else{ezcolors[0] = 1.0;}
        redValue.innerText = ezcolors[0].toFixed(2);});
            
    var greenPl = document.getElementById("greenplus");
    greenPl.addEventListener("click", function() {if (ezcolors[1]+ccr <= 1.0) ezcolors[1] += ccr;
        else{ezcolors[1] = 1.0;}
        greenValue.innerText = ezcolors[1].toFixed(2);});
            
    var bluePl = document.getElementById("blueplus");
    bluePl.addEventListener("click", function() {if (ezcolors[2]+ccr <= 1.0) ezcolors[2] += ccr;
        else{ezcolors[2] = 1.0;}
        blueValue.innerText = ezcolors[2].toFixed(2);});
            
    var redMin = document.getElementById("redminus");
    redMin.addEventListener("click", function() {if (ezcolors[0]-ccr >= 0.0) ezcolors[0] -= ccr;
        else{ezcolors[0] = 0.0;}
        redValue.innerText = ezcolors[0].toFixed(2);});
            
    var greenMin = document.getElementById("greenminus");
    greenMin.addEventListener("click", function() {if (ezcolors[1]-ccr >= 0.0) ezcolors[1] -= ccr;
        else{ezcolors[1] = 0.0;}
        greenValue.innerText = ezcolors[1].toFixed(2);});
                
    var blueMin = document.getElementById("blueminus");
    blueMin.addEventListener("click", function() {if (ezcolors[2]-ccr >= 0.0) ezcolors[2] -= ccr;
        else{ezcolors[2] = 0.0;}
        blueValue.innerText = ezcolors[2].toFixed(2);});
    
    var b_vertices = [
        vec2(-.45, -.5),		vec2(-.45, .5),		    vec2(-.35, .5),		    vec2(-.35, -.5),
        vec2(-.35, .5),		    vec2(-.27, .5),		    vec2(-.08, .35),		vec2(-.08, .16),
		vec2(-.27, .1),		    vec2(-.08, -.16),		vec2(-.08, -.35),        vec2(-.28, -.5)
    ];

    b_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, b_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(b_vertices), gl.STATIC_DRAW );
    b_vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( b_vPosition, 2, gl.FLOAT, false, 0, 0 );

    var n_vertices = [
        vec2(.2, .5),		vec2(.2, -.5),		vec2(.1, -.5),		vec2(.1, .5),		vec2(.2, .5),
		vec2(.4, -.5),		vec2(.5, -.5),		vec2(.5, .5),		vec2(.4, .5),		vec2(.4, -.5)
    ];
    // Load the data into the GPU

    n_bufferId = gl.createBuffer();
    gl.bindBuffer( gl.ARRAY_BUFFER, n_bufferId );
    gl.bufferData( gl.ARRAY_BUFFER, flatten(n_vertices), gl.STATIC_DRAW );
    n_vPosition = gl.getAttribLocation( program, "vPosition" );
    gl.vertexAttribPointer( n_vPosition, 2, gl.FLOAT, false, 0, 0 );


    thetaLoc = gl.getUniformLocation( program, "theta" );
    scaleLoc = gl.getUniformLocation( program, "ezscale" );
    colorsLoc = gl.getUniformLocation( program, "ezcolors" );
    ezxLoc = gl.getUniformLocation( program, "ezx" );
    ezyLoc = gl.getUniformLocation( program, "ezy" );

    render();
};



function render() {
    setTimeout(function () {
        if (stop_start){theta += (changeSpinDir ? -0.1 : 0.1);}
        gl.clear( gl.COLOR_BUFFER_BIT );

        gl.useProgram( program );

        if(isiklioyuncubilgisayariCanvas){
            epilepsyCanvas();
        }

        gl.clearColor(canvasColor[0], canvasColor[1], canvasColor[2], 1.0);
        
        if(isiklioyuncubilgisayari){
            epilepsyFrag();
        }

        gl.uniform1f( thetaLoc, theta );
        gl.uniform1f( scaleLoc, ezscale );
        gl.uniform4fv( colorsLoc, ezcolors);
        gl.uniform1f( ezxLoc, ezx );
        gl.uniform1f( ezyLoc, ezy );


        gl.enableVertexAttribArray( n_vPosition );
        gl.bindBuffer( gl.ARRAY_BUFFER, n_bufferId );
        gl.vertexAttribPointer( n_vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.drawArrays( gl.TRIANGLE_STRIP, 0, 10 );

        gl.enableVertexAttribArray( b_vPosition );
        gl.bindBuffer( gl.ARRAY_BUFFER, b_bufferId );
        gl.vertexAttribPointer( b_vPosition, 2, gl.FLOAT, false, 0, 0 );
        gl.drawArrays( gl.TRIANGLE_FAN, 0, 12 );


        render();
    }, delay);
}

/*var b_vertices = [
	vec2(-.5, .38),
	vec2(.5, .38),
	vec2(.5, .26),
	vec2(.35, .08),
	vec2(.15, .08),
	vec2(.35, .29),
	vec2(-.15, .08),
	vec2(-.349, .08),
	vec2(-.5, .26)
];*/
