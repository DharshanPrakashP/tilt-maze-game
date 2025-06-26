//  LEVELS: each level is a 5x5 maze (0 = path, 1 = wall)
let levels = [[[0, 1, 0, 0, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 0, 0, 0, 0]], [[0, 1, 1, 1, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 0, 0, 0, 0], [0, 1, 1, 1, 0]], [[0, 1, 0, 1, 0], [0, 1, 0, 1, 0], [0, 0, 0, 1, 0], [1, 1, 0, 1, 0], [0, 0, 0, 0, 0]]]
let level_index = 0
let maze = levels[level_index]
let player_x = 0
let player_y = 0
let goal_x = 4
let goal_y = 4
function draw() {
    basic.clearScreen()
    for (let y = 0; y < 5; y++) {
        for (let x = 0; x < 5; x++) {
            if (maze[y][x] == 1) {
                led.plotBrightness(x, y, 20)
            }
            
        }
    }
    led.plotBrightness(player_x, player_y, 255)
}

function next_level() {
    
    level_index += 1
    if (level_index < levels.length) {
        maze = levels[level_index]
        player_x = 0
        player_y = 0
        draw()
    } else {
        basic.showIcon(IconNames.Yes)
        basic.pause(2000)
        control.reset()
    }
    
}

draw()
basic.forever(function on_forever() {
    
    let new_x = player_x
    let new_y = player_y
    if (input.acceleration(Dimension.X) < -300) {
        new_x -= 1
    } else if (input.acceleration(Dimension.X) > 300) {
        new_x += 1
    }
    
    if (input.acceleration(Dimension.Y) < -300) {
        new_y -= 1
    } else if (input.acceleration(Dimension.Y) > 300) {
        new_y += 1
    }
    
    if (0 <= new_x && new_x < 5 && (0 <= new_y && new_y < 5)) {
        if (maze[new_y][new_x] == 0) {
            player_x = new_x
            player_y = new_y
            draw()
        }
        
    }
    
    if (player_x == goal_x && player_y == goal_y) {
        basic.showIcon(IconNames.Happy)
        basic.pause(1000)
        next_level()
    }
    
    basic.pause(200)
})
