/*eslint-env browser*/
var canvas = document.querySelector('canvas');
//var head = document.getElementById('head');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;
//head.innerHTML = "Heading";
var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}
var MaxRadius = 60;
//var MinRadius = 2;
window.addEventListener('mousemove', function (event) {
    mouse.x = event.x;
    mouse.y = event.y;
})
window.addEventListener('resize',function(){
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
})
var colorArray = [
    '#f22720', '#ff6c3d', '#e1e7e1', '#4f6978', '#45464b'
]



function Circle(x, y, dx, dy, radius, s) {
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.MinRadius = radius;
    this.s = s;

    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);

        c.strokeStyle = colorArray[this.s];
        c.fillStyle = colorArray[this.s];
        c.fill();
        c.stroke();
    }
    this.update = function () {

        this.draw();
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        if (Math.abs(this.x - mouse.x) < 50 && Math.abs(this.y - mouse.y) < 50) {
            if (this.radius < MaxRadius) {
                this.radius += 2;
            }
        } else if (this.radius > this.MinRadius) {
            this.radius -= 1;
        }
    }
}

var circleArray = [];

for (var i = 0; i < 800; i++) {
    var r = (Math.random() * 3) + 1;
    var x = (Math.random() * (innerWidth - r * 2)) + r;
    var y = (Math.random() * (innerHeight - r * 2)) + r;
    var dx = (Math.random() - .5) * 3;
    var dy = (Math.random() - .5) * 3;
    var s = Math.floor(Math.random() * 4);
    // To randomize colors you can use code written below and call function above
    //    var a, b, e, d;
    //    a = Math.floor(Math.random() * 255).toString();
    //    b = Math.floor(Math.random() * 255).toString();
    //    e = Math.floor(Math.random() * 255).toString();
    //    d = Math.random().toString();
    //    var color = 'rgba(' + a + ',' + b + ',' + e + ',' + d + ')';
    circleArray.push(new Circle(x, y, dx, dy, r, s));
}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    for (i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
}

animate();
