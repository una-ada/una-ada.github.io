import sys
import time

def variance(data):
	total = 0
	sqTotal = 0
	for i in data:
		total += i
		sqTotal += i ** 2
	return (sqTotal / 10) - ((total / 10) ** 2)

def testVariance():
	data = [0,0,0,0,0,0,0,0,0,0]
	n = 1
	while 1:
		for m in range(1,11):
			data[m - 1] = 1 + (m / (10 ** n))
		var = variance(data)
		print(var)
		if var != 8.25 / (10 ** ((2 * n) - 1)):
			break
		else:
			n += 1
	return n

print()
start = time.time()
print(testVariance())
print("%.3f seconds" % (time.time() - start))
print()