

mystr = """
[[(65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0)], [(65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 
0), (65, 72, 205, 51), (65, 72, 205, 81), (65, 72, 205, 91), (65, 72, 205, 81), (65, 72, 205, 51), (65, 72, 205, 0), 
(65, 72, 205, 0)], [(65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 71), (65, 72, 205, 122), (65, 72, 205, 153), (65, 72, 205, 163), (65, 72, 205, 153), (65, 72, 205, 122), (65, 72, 205, 71), (65, 72, 205, 0)], [(65, 72, 205, 0), (65, 72, 205, 51), (65, 72, 205, 122), (65, 72, 205, 173), (65, 72, 205, 204), (65, 72, 205, 214), (65, 72, 205, 204), 
(65, 72, 205, 173), (65, 72, 205, 122), (65, 72, 205, 51)], [(65, 72, 205, 0), (65, 72, 205, 81), (65, 72, 205, 153), (65, 72, 205, 204), (65, 72, 205, 234), (65, 72, 205, 244), (65, 72, 205, 234), (65, 72, 205, 204), (65, 72, 205, 153), (65, 72, 205, 81)], [(65, 72, 205, 0), (65, 72, 205, 91), (65, 72, 205, 163), (65, 72, 205, 214), (65, 72, 205, 244), (65, 72, 205, 255), (65, 72, 205, 244), (65, 72, 205, 214), (65, 72, 205, 163), (65, 72, 205, 91)], [(65, 72, 205, 0), (65, 72, 205, 81), (65, 72, 205, 153), (65, 72, 205, 204), (65, 72, 205, 234), (65, 72, 205, 244), (65, 72, 205, 234), (65, 72, 205, 204), (65, 72, 205, 153), (65, 72, 205, 81)], [(65, 72, 205, 0), (65, 72, 205, 51), (65, 72, 205, 122), (65, 72, 205, 173), (65, 72, 205, 204), (65, 72, 205, 214), (65, 72, 205, 204), (65, 72, 205, 173), (65, 72, 205, 122), (65, 72, 205, 51)], [(65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 71), (65, 72, 205, 122), (65, 72, 205, 153), (65, 72, 205, 163), (65, 72, 205, 153), (65, 72, 205, 122), (65, 72, 205, 71), (65, 72, 205, 0)], [(65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 0), (65, 72, 205, 51), (65, 72, 205, 81), (65, 72, 205, 91), (65, 72, 205, 81), (65, 72, 205, 51), (65, 72, 205, 0), (65, 72, 205, 0)]]
"""


mystr = mystr.replace('(', '[')
mystr = mystr.replace(')', ']')

print(mystr)