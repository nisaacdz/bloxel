from PIL import Image

class Chalk:
    def __init__(self, trace: list[list[tuple[int, int, int, int]]]) -> None:
        self.trace = trace
    
class Eraser:
    def __init__(self, rectangle: tuple[int, int]) -> None:
        self.rectangle = rectangle
    
    
class BloxelBoard:
    def __init__(self, size: tuple[int, int], background: tuple[int, int, int]):
        self.background = background
        self.board = Image.new('RGB', size=size, color=background)
    
    def save(self, location: str):
        self.board.save(location)
    
    def mark(self, chalk: Chalk, pos: tuple[int, int]):
        trace = chalk.trace
        midi = int(len(trace) / 2)
        midj = int(len(trace[0]) / 2)
        x, y = pos
        width, height = self.board.size
        for tj in range(0, len(trace)):
            for ti in range(0, len(trace[0])):
                r1, g1, b1, a = trace[tj][ti]
                ni = x + ti - midi
                nj = y + tj - midj
                if ni >= 0 and ni < width and nj >= 0 and nj < height:
                    r2, g2, b2 = self.board.getpixel((ni, nj))
                    f1 = a / 255
                    f2 = 1.0 - f1
                    r = f1 * r1 + f2 * r2
                    g = f1 * g1 + f2 * g2
                    b = f1 * b1 + f2 * b2
                    self.board.putpixel((ni, nj), (int(r), int(g), int(b)))
                
        
    def erase(self, pos: tuple[int, int], eraser: Eraser):
        e_width, e_height = eraser.rectangle
        width, height = self.board.size
        midi = e_width / 2
        midj = e_height / 2
        x, y = pos
        for ei in range(0, e_width):
            for ej in range(0, e_height):
                ni = x + ei - midi
                nj = y + ej - midj
                if ni >= 0 and ni < width and nj >= 0 and nj < height:
                    self.board.putpixel((ni, nj), self.background)
        
trace = [[(0,0,0,0) for _ in range(0, 21)] for _ in range(0, 21)]

midi = int(len(trace) / 2)
midj = int(len(trace[0]) / 2)
max_dist = max(midi, midj)**2

for i in range(0, len(trace)):
    for j in range(0, len(trace[0])):
        dist = abs(midi - i)**2 + abs(midj - j)**2
        alpha = min(max(0, int(255 - 255 * dist / max_dist)), 255)
        red, green, blue = 255, 255, 255
        shift = abs(j - midj)
        if shift > 2 and shift <= 6:
            red, green, blue = 230, 70, 120
        else:
            red, green, blue = 210, 230, 250
        trace[i][j] = (red, green, blue, alpha)

background = (50, 50, 50)

board = BloxelBoard((480, 480), background)

chalk = Chalk(trace)
board.mark(chalk, (240, 240))

for j in range(40, 440):
   board.mark(chalk, (440, j))
for j in range(40, 440):
   board.mark(chalk, (40, j))
for x in range(40, 440):
   board.mark(chalk, (x, x))

board.save("temp_sheet7.png")