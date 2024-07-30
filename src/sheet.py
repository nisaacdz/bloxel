from PIL import Image
    
class OverPad:
    """
    Creates a new chalk object with the cross-sectional area passed. The cross-sectional area is a matrix of a tuple of rgba values.
    For chalks with non-rectangular cross-section, the input matrix should rely on the alpha channel to make relevant parts of the cross-section transparent
    Generally, chalks tend to has circular cross-sectional area with regions around the circumference more transparent than the regions within it.
    """
    def __init__(self, trace: list[list[tuple[int, int, int, int]]]) -> None:
        self.trace = trace
    
class Chalk:
    def __init__(self, overpad: OverPad) -> None:
        self.overpad = overpad
            
class Duster:
    def __init__(self, rectangle: tuple[int, int], color: tuple[int, int, int, int]) -> None:
        width, height = rectangle
        trace = [[color for _ in range(0, width)] for _ in range(0, height)]
        self.pad = OverPad(trace)
        

class Selector:
    def __init__(self) -> None:
        pass
    
class SquareTool:
    def __init__(self, chalk: Chalk) -> None:
        self.chalk = chalk
    

class Highlight:
    def __init__(self, area: list[list[tuple[int, int, int, int]]], pos: tuple[int, int]) -> None:
        self.area = area
        self.pos = pos
    
    def higlight(self, img: Image.Image):
        trace = self.pad.trace
        midi = len(trace) // 2
        midj = len(trace[0]) // 2
        x, y = self.pos
        width, height = img.size
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
                    trace[tj][ti] = img.getpixel((ni, nj))
                    img.putpixel((ni, nj), (int(r), int(g), int(b)))
                    
    def unhighlight(self, img: Image.Image):
        self.higlight(img)
    
    
class BloxelBoard:
    def __init__(self, size: tuple[int, int], background: tuple[int, int, int]):
        self.background = background
        self.board = Image.new('RGB', size=size, color=background)
    
    def save(self, location: str):
        self.board.save(location)
        
    
    def draw(self, pad: OverPad, pos: tuple[int, int]):
        trace = pad.trace
        midi = len(trace) // 2
        midj = len(trace[0]) // 2
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
                
        
    def erase(self, pos: tuple[int, int], duster: Duster):
        self.draw(duster.pad, pos)



color1 = 65, 72, 205
color2 = 255, 255, 255


def merge_bases(val1: int, val2: int) -> tuple[int, int, int]:
    red1, green1, blue1 = color1
    red2, green2, blue2 = color2
    red = int((val1*red1 + val2*red2) / (val1 + val2))
    green = int((val1*green1 + val2*green2) / (val1 + val2))
    blue = int((val1*blue1 + val2*blue2) / (val1 + val2))
    return red, green, blue


trace = [[(0,0,0,0) for _ in range(0, 15)] for _ in range(0, 15)]

midi = len(trace) // 2
midj = len(trace[0]) // 2
max_dist = max(midi, midj)**2

# for i in range(0, len(trace)):
#     for j in range(0, len(trace[0])):
#         dist = abs(midi - i)**2 + abs(midj - j)**2
#         alpha = min(max(0, int(255 - 255 * dist / max_dist)), 255)
#         red, green, blue = 255, 255, 255
#         shift = abs(midj - j)
#         if shift <= 3:
#             r = shift
#             w = 3 - shift
#             red, green, blue = merge_bases(r**2, w**2)
#         elif shift <= 6:
#             r = 6 - shift
#             w = shift - 3
#             red, green, blue = merge_bases(r**2, w**2)
#         else:
#             red, green, blue = color2
#         trace[i][j] = red, green, blue, alpha

for i in range(0, len(trace)):
    for j in range(0, len(trace[0])):
        dist = abs(midi - i)**2 + abs(midj - j)**2
        alpha = min(max(0, int(255 - 255 * dist / max_dist)), 255)
        red, green, blue = color1
        trace[i][j] = red, green, blue, alpha
        

print(trace)

background = (50, 50, 50)

board = BloxelBoard((480, 480), background)

duster = Duster((50, 50), (*board.background, 255))
chalk = Chalk(OverPad(trace))

board.draw(chalk.overpad, (120, 240))

for j in range(200, 360):
    board.draw(chalk.overpad, (j, 240))
    
board.save('temp_sheet3.png')
