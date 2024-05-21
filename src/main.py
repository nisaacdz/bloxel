trace = [[(0,0,0,0) for _ in range(0, 21)] for _ in range(0, 21)]

midi = int(len(trace) / 2)
midj = int(len(trace[0]) / 2)
max_dist = midi**2 + midj**2

for i in range(0, len(trace)):
    for j in range(0, len(trace[0])):
        dist = abs(midi - i)**2 + abs(midj - j)**2
        alpha = 255 - int(255 * dist / max_dist)
        red, green, blue = 255, 255, 255
        shift = abs(j - midj)
        if shift > 2 and shift <= 6:
            red, green, blue = 230, 70, 120
        else:
            red, green, blue = 210, 230, 250
        trace[i][j] = (red, green, blue, alpha)
        if i == 1 and j == 0:
            print(trace[1][0])

print(trace[1][0])