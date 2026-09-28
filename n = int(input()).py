n = int(input())

activities = []

for _ in range(n):
    start, finish = map(int, input().split())
    activities.append((start, finish))

activities.sort(key=lambda x: x[1])

selected = []
last_finish = -1

for start, finish in activities:
    if start >= last_finish:
        selected.append((start, finish))
        last_finish = finish

print("Selected:", end=" ")

for activity in selected:
    print(activity, end=" ")

print()
print("Maximum Activities:", len(selected))