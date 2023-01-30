
let grate_arr = [ 1, 0, 3,
                  1, 1, 2,  ]

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");

let offs = 0
canvas.addEventListener('click', function(event) {
    var rect = canvas.getBoundingClientRect();
    var x = event.clientX - rect.left;
    var y = event.clientY - rect.top;

    let newX = Math.floor(x / BRICK_SIZE)
    let newY = Math.floor(y / BRICK_SIZE)

    try_move(newX, newY)
}, false)

const BRICK_SIZE = canvas.width / 3
const CIRC_SIZE = BRICK_SIZE / 2

function read_position(x, y) {
    if(x < 0 || x > 2 || y < 0 || y > 1) {
        return -1
    }
    return grate_arr[(y*3)+x]
}

function set_position(x,y,i) {
    grate_arr[(y*3)+x] = i
}

function rect(x, y, w, h, color) {
    ctx.beginPath()
    ctx.rect(x, y, w, h)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
}

function circle(x, y, r, c, clockwise, color) {
    ctx.beginPath()
    ctx.arc(x, y, r, 0, c, clockwise)
    ctx.fillStyle = color
    ctx.fill()
    ctx.closePath()
}

function draw() {
    ctx.clearRect(0,0,canvas.clientWidth, canvas.height)

    for(let i = 0;i < 6;i++) {
        let x = (i % 3) * BRICK_SIZE
        let y = Math.floor((i / 3)) * BRICK_SIZE

        if(grate_arr[i] != 0) {
            rect(x + 0.5,y + 0.5,BRICK_SIZE - 1, BRICK_SIZE - 1,"purple")
        }

        let circ_color = "white"
        if(grate_arr[i] == 2) {
            if(i == 2) {
                circ_color = "lime"
            }
            circle(x + CIRC_SIZE, y + CIRC_SIZE*2, CIRC_SIZE, Math.PI, true, circ_color)
        }
        else if(grate_arr[i] == 3) {
            if(i == 5) {
                circ_color = "lime"
            }
            circle(x + CIRC_SIZE, y + 0, CIRC_SIZE, Math.PI, false,circ_color)
        }
    }
}

function try_move(brick_pos_x, brick_pos_y) {
    let value_to_swap = read_position(brick_pos_x, brick_pos_y)

    // left
    if(read_position(brick_pos_x-1,brick_pos_y) == 0) {
        set_position(brick_pos_x-1,brick_pos_y,value_to_swap)
        set_position(brick_pos_x,brick_pos_y,0)
    }
    // right
    else if(read_position(brick_pos_x+1,brick_pos_y) == 0) {
        set_position(brick_pos_x+1,brick_pos_y,value_to_swap)
        set_position(brick_pos_x,brick_pos_y,0)

    }
    // top
    else if(read_position(brick_pos_x,brick_pos_y-1) == 0) {
        set_position(brick_pos_x,brick_pos_y-1,value_to_swap)
        set_position(brick_pos_x,brick_pos_y,0)
    }
    // bottom
    else if(read_position(brick_pos_x,brick_pos_y+1) == 0) {
        set_position(brick_pos_x,brick_pos_y+1,value_to_swap)
        set_position(brick_pos_x,brick_pos_y,0)
    }

}

setInterval(draw, 10)