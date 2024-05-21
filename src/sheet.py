from PIL import Image


class Pencil:
    def __init__(self, trace: list[list[tuple[int, int, int, int]]]) -> None:
        self.trace = trace
    
class Eraser:
    def __init__(self, rectangle: tuple[int, int]) -> None:
        self.rectangle = rectangle
    
    
class BloxelSheet:
    def __init__(self, size: tuple[int, int], background: tuple[int, int, int]):
        self.background = background
        self.sheet = Image.new('RGB', size=size, color=background)
    
    def save(self, location: str):
        self.sheet.save(location)
    
    def mark(self, pencil: Pencil, pos: tuple[int, int]):
        trace = pencil.trace
        midi = int(len(trace) / 2)
        midj = int(len(trace[0]) / 2)
        x, y = pos
        width, height = self.sheet.size
        for ti in range(0, len(trace)):
            for tj in range(0, len(trace[0])):
                r1, g1, b1, a = trace[ti][tj]
                ni = x + ti - midi
                nj = y + tj - midj
                if ni >= 0 and ni < width and nj >= 0 and nj < height:
                    r2, g2, b2 = self.sheet.getpixel((ni, nj))
                    f1 = a / 255.0
                    f2 = 1.0 - f1
                    r = f1 * r1 + f2 * r2
                    g = f1 * g1 + f2 * g2
                    b = f1 * b1 + f2 * b2
                    self.sheet.putpixel((ni, nj), (int(r), int(g), int(b)))
                
        
    def erase(self, pos: tuple[int, int], eraser: Eraser):
        e_width, e_height = eraser.rectangle
        width, height = self.sheet.size
        midi = e_width / 2
        midj = e_height / 2
        x, y = pos
        for ei in range(0, e_width):
            for ej in range(0, e_height):
                ni = x + ei - midi
                nj = y + ej - midj
                if ni >= 0 and ni < width and nj >= 0 and nj < height:
                    self.sheet.putpixel((ni, nj), self.background)
        
trace = [
    [(230, 70, 120, 100)] * 20,
    [(230, 70, 120, 100)] * 20,
    [(230, 70, 120, 100)] * 20,
    [(230, 70, 120, 100)] * 20,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,255)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,255)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,255)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,255)] * 4 + [(255,255,255,180)] * 4 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 4 + [(255,255,255,180)] * 12 + [(230,70,120,100)] * 4,
    [(230, 70, 120, 100)] * 20,
    [(230, 70, 120, 100)] * 20,
    [(230, 70, 120, 100)] * 20,
    [(230, 70, 120, 100)] * 20,
]

background = (50, 50, 50)

bsheet = BloxelSheet((480, 480), background)

pencil = Pencil(trace)

for i in range(100, 300):
    bsheet.mark(pencil, (i, i))
bsheet.save("temp_sheet.png")