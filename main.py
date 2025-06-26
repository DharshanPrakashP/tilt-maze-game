# LEVELS: each level is a 5x5 maze (0 = path, 1 = wall)
levels = [
    [
        [0, 1, 0, 0, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ],
    [
        [0, 1, 1, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0],
        [0, 1, 1, 1, 0]
    ],
    [
        [0, 1, 0, 1, 0],
        [0, 1, 0, 1, 0],
        [0, 0, 0, 1, 0],
        [1, 1, 0, 1, 0],
        [0, 0, 0, 0, 0]
    ]
]

level_index = 0
maze = levels[level_index]
player_x = 0
player_y = 0
goal_x = 4
goal_y = 4

def draw():
    basic.clear_screen()
    for y in range(5):
        for x in range(5):
            if maze[y][x] == 1:
                led.plot_brightness(x, y, 20)
    led.plot_brightness(player_x, player_y, 255)

def next_level():
    global level_index, maze, player_x, player_y
    level_index += 1
    if level_index < len(levels):
        maze = levels[level_index]
        player_x = 0
        player_y = 0
        draw()
    else:
        basic.show_icon(IconNames.YES)
        basic.pause(2000)
        control.reset()

draw()

def on_forever():
    global player_x, player_y
    new_x = player_x
    new_y = player_y

    if input.acceleration(Dimension.X) < -300:
        new_x -= 1
    elif input.acceleration(Dimension.X) > 300:
        new_x += 1
    if input.acceleration(Dimension.Y) < -300:
        new_y -= 1
    elif input.acceleration(Dimension.Y) > 300:
        new_y += 1

    if 0 <= new_x < 5 and 0 <= new_y < 5:
        if maze[new_y][new_x] == 0:
            player_x = new_x
            player_y = new_y
            draw()

    if player_x == goal_x and player_y == goal_y:
        basic.show_icon(IconNames.HAPPY)
        basic.pause(1000)
        next_level()

    basic.pause(200)

basic.forever(on_forever)
