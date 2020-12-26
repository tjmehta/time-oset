export default class TimeOrderedSet<T> extends Set<T> {
  /*
   * Overridden methods
   */
  // @ts-ignore
  keys: () => IterableIterator<number> = function* () {
    let index = 0
    // @ts-ignore
    for (let value of this.values()) {
      yield index
      index++
    }
  }
  // @ts-ignore
  entries: () => IterableIterator<[number, T]> = function* () {
    let index = 0
    // @ts-ignore
    for (let value of this.values()) {
      yield [index, value]
      index++
    }
  }
  // @ts-ignore
  forEach(
    callbackfn: (value: T, index: number, set: TimeOrderedSet<T>) => void,
    thisArg?: any,
  ): void {
    let set = this
    let index = 0
    this.values()
    super.forEach(function (value, value2) {
      if (thisArg != null) {
        callbackfn.call(thisArg, value, index, set)
      } else {
        callbackfn(value, index, set)
      }
      index++
    })
  }

  /*
   * Extended methods
   */
  toArray() {
    return [...this.values()]
  }
  get(atIndex: number) {
    return this.find((value, index) => {
      return atIndex === index
    })
  }

  /*
   * Array instance and iteration methods
   */
  // concat - n/a
  // copyWithin - n/a
  // entries - from set
  // @ts-ignore
  every<S extends T>(
    predicate: (value: T, index: number, set: TimeOrderedSet<T>) => unknown,
    thisArg?: any,
  ): this is TimeOrderedSet<S>
  every(
    predicate: (value: T, index: number, set: TimeOrderedSet<T>) => unknown,
    thisArg?: any,
  ): boolean {
    const set = this
    let result = true
    let index = 0

    for (let value of this) {
      if (thisArg != null) {
        result = result && Boolean(predicate.call(thisArg, value, index, set))
      } else {
        result = result && Boolean(predicate(value, index, set))
      }
      if (!result) return result
      index++
    }

    return result
  }
  // fill - n/a
  filter(
    predicate: (value: T, index: number, set: TimeOrderedSet<T>) => unknown,
    thisArg?: any,
  ): TimeOrderedSet<T> {
    const set = this
    const filtered = new TimeOrderedSet<T>()
    let result
    let index = 0

    for (let value of this) {
      if (thisArg != null) {
        result = predicate.call(thisArg, value, index, set)
      } else {
        result = predicate(value, index, set)
      }
      if (result) filtered.add(value)
      index++
    }

    return filtered
  }
  find(
    predicate: (value: T, index: number, set: TimeOrderedSet<T>) => boolean,
    thisArg?: any,
  ): T | undefined {
    const set = this
    let result
    let index = 0

    for (let value of this) {
      if (thisArg != null) {
        result = predicate.call(thisArg, value, index, set)
      } else {
        result = predicate(value, index, set)
      }
      if (result) return value
      index++
    }

    return undefined
  }
  // @ts-ignore
  findIndex(
    predicate: (value: T, index: number, set: TimeOrderedSet<T>) => boolean,
    thisArg?: any,
  ): number {
    const set = this
    let result
    let index = 0

    for (let value of this) {
      if (thisArg != null) {
        result = predicate.call(thisArg, value, index, set)
      } else {
        result = predicate(value, index, set)
      }
      if (result) return index
      index++
    }

    return -1
  }
  // forEach - from set
  // includes - n/a, use has from set
  indexOf(searchElement: T, fromIndex: number = -1): number {
    let index = 0

    for (let value of this) {
      if (index < fromIndex) continue
      if (value === searchElement) return index
      index++
    }

    return -1
  }
  join(separator?: string): string {
    return this.toArray().join(separator)
  }
  // keys - from set
  lastIndexOf(searchElement: T, fromIndex?: number): number {
    return this.toArray().lastIndexOf(searchElement, fromIndex)
  }
  map<U>(
    callbackfn: (value: T, index: number, set: TimeOrderedSet<T>) => U,
    thisArg?: any,
  ): TimeOrderedSet<U> {
    const set = this
    const mapped = new TimeOrderedSet<U>()
    let result: U
    let index = 0

    for (let value of this) {
      if (thisArg != null) {
        result = callbackfn.call(thisArg, value, index, set)
      } else {
        result = callbackfn(value, index, set)
      }
      mapped.add(result)
      index++
    }

    return mapped
  }
  pop(): T | undefined {
    if (this.size === 0) return
    const arr = [...this]
    const item = arr.pop()
    if (item == null) return
    this.delete(item)
    return item
  }
  push(item: T): number {
    this.add(item)
    return this.size
  }
  reduce<U = T>(
    callbackfn: (
      previousValue: U | T,
      currentValue: T,
      currentIndex: number,
      set: TimeOrderedSet<T>,
    ) => U,
  ): U
  reduce<U = T>(
    callbackfn: (memo: U, value: T, index: number, set: TimeOrderedSet<T>) => U,
    initialValue?: U,
  ): U {
    if (this.size === 0) {
      if (arguments.length > 1) {
        throw new TypeError('Reduce of empty array with no initial value')
      } else if (arguments.length > 0) {
        return arguments[0]
      }
    }

    let memo: U = initialValue as U

    this.forEach((value, index, set) => {
      if (arguments.length > 0 && index === 0) {
        memo = (value as any) as U
        return
      }
      memo = callbackfn(memo, value, index, set)
    })

    return memo
  }
  reduceRight<U = T>(
    callbackfn: (
      previousValue: U | T,
      currentValue: T,
      currentIndex: number,
      set: TimeOrderedSet<T>,
    ) => U,
  ): U
  reduceRight<U = T>(
    callbackfn: (memo: U, value: T, index: number, set: TimeOrderedSet<T>) => U,
    initialValue?: U,
  ): U {
    if (this.size === 0) {
      if (arguments.length > 1) {
        throw new TypeError('Reduce of empty array with no initial value')
      } else if (arguments.length > 0) {
        return arguments[0]
      }
    }

    const set = this
    let memo: U = initialValue as U

    this.toArray()
      .reverse()
      .forEach((value, index) => {
        if (arguments.length > 0 && index === 0) {
          memo = (value as any) as U
          return
        }
        memo = callbackfn(memo, value, index, set)
      })

    return memo
  }
  // reverse - n/a
  shift(): T | undefined {
    for (let item of this) {
      this.delete(item)
      return item
    }
  }
  // slice - n/a
  some(
    predicate: (value: T, index: number, set: TimeOrderedSet<T>) => unknown,
    thisArg?: any,
  ): boolean {
    const set = this
    return this.toArray().some(function (value, index) {
      // @ts-ignore
      return predicate.call(this, value, index, set)
    }, thisArg)
  }
  // sort - n/a
  splice(start: number, deleteCount?: number) {
    const totalDeleteCount = deleteCount ?? Infinity
    let deletedCount = 0

    this.forEach((value, index) => {
      if (index >= start && deletedCount < totalDeleteCount) {
        this.delete(value)
        deletedCount++
      }
    })
    return this
  }
  toLocaleString() {
    return '[object TimeOrderedSet]'
  }
  toString() {
    return '[object TimeOrderedSet]'
  }
  unshift(value: T): number {
    // this is expensive has to repush the whole set..
    const arr = [...this.values()]

    this.clear()
    this.push(value)
    arr.forEach((val) => this.push(val))

    return this.size
  }
}
