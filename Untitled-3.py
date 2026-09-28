def greedy(intervals):
    intervals = sorted(intervals, key=lambda x: x[1])

    count = 0
    last_finish = -1

    for start, finish in intervals:
        if start >= last_finish:
            count += 1
            last_finish = finish

    return count


def optimal(intervals, index, last_finish):
    if index == len(intervals):
        return 0

    skip = optimal(intervals, index + 1, last_finish)

    take = 0

    if intervals[index][0] >= last_finish:
        take = 1 + optimal(
            intervals,
            index + 1,
            intervals[index][1]
        )

    return max(take, skip)


tests = [
    [(1, 3), (2, 5), (3, 4), (5, 7)],
    [(1, 2), (2, 3), (3, 4)],
    [(0, 4), (1, 5), (5, 7)],
    [(1, 3), (3, 5), (5, 8)],
    [(2, 3), (3, 6), (6, 8)]
]

matches = 0

for intervals in tests:
    g = greedy(intervals)
    o = optimal(sorted(intervals, key=lambda x: x[0]), 0, -1)

    if g == o:
        matches += 1

print("Test Cases:", len(tests))
print("Greedy-Optimal Matches:", matches)

if matches == len(tests):
    print("Greedy Correctness Check: PASSED")
else:
    print("Greedy Correctness Check: FAILED")