import OrderedSet from '../index'

describe('OrderedSet', () => {
  it('should create an instance of an ordered set', () => {
    const set = new OrderedSet()
    expect(set).toBeInstanceOf(OrderedSet)
  })

  it('should create an instance of an ordered set with values', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set).toBeInstanceOf(OrderedSet)
    expect(set.has(seedArr[0])).toBe(true)
    expect(set.has(seedArr[1])).toBe(true)
    expect(set.has(seedArr[2])).toBe(true)
    expect(set.has(10000)).toBe(false)
  })

  it('should get a value at index of set', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set).toBeInstanceOf(OrderedSet)
    expect(set.get(0)).toEqual(seedArr[0])
    expect(set.get(1)).toEqual(seedArr[1])
    expect(set.get(2)).toEqual(seedArr[2])
  })

  it('should add an item to the end', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set).toBeInstanceOf(OrderedSet)
    expect(set.add(5)).toEqual(set)
    expect(set.get(0)).toEqual(seedArr[0])
    expect(set.get(1)).toEqual(seedArr[1])
    expect(set.get(2)).toEqual(seedArr[2])
    expect(set.get(3)).toEqual(5)
  })

  it('should clear set to be empty', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set).toBeInstanceOf(OrderedSet)
    set.clear()
    expect(set.size).toEqual(0)
    expect(set.get(0)).toBeUndefined()
    expect(set.get(1)).toBeUndefined()
    expect(set.get(2)).toBeUndefined()
  })

  it('should delete an item', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set).toBeInstanceOf(OrderedSet)
    set.delete(seedArr[1])
    expect(set.size).toEqual(seedArr.length - 1)
    expect(set.get(0)).toEqual(seedArr[0])
    expect(set.get(1)).toEqual(seedArr[2])
  })

  it('should be an iterator', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const out = []
    for (let item of set) {
      out.push(item)
    }
    expect(out).toMatchInlineSnapshot(`
      Array [
        2,
        3,
        1,
      ]
    `)
  })

  it('should return an values iterator', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const out = []
    for (let item of set.values()) {
      out.push(item)
    }
    expect(out).toMatchInlineSnapshot(`
      Array [
        2,
        3,
        1,
      ]
    `)
  })

  it('should return an entries iterator', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const out = []
    for (let item of set.entries()) {
      out.push(item)
    }
    expect(out).toMatchInlineSnapshot(`
      Array [
        Array [
          0,
          2,
        ],
        Array [
          1,
          3,
        ],
        Array [
          2,
          1,
        ],
      ]
    `)
  })

  it('should return a keys iterator', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const out = []
    for (let item of set.keys()) {
      out.push(item)
    }
    expect(out).toMatchInlineSnapshot(`
      Array [
        0,
        1,
        2,
      ]
    `)
  })

  it('should forEach loop through each value', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => {
      set.delete(2)
    })
    set.forEach(cb)
    expect(cb.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            3,
            1,
          },
        ],
        Array [
          3,
          1,
          Set {
            3,
            1,
          },
        ],
        Array [
          1,
          2,
          Set {
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should every loop through each value', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.every(cb)).toBe(false)
    expect(cb.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
    const cb2 = jest.fn(() => true)
    expect(set.every(cb2)).toBe(true)
    expect(cb2.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          1,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should filter loop through each value', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb1 = jest.fn(() => false)
    expect(set.filter(cb1)).toMatchInlineSnapshot(`Set {}`)
    const cb2 = jest.fn(() => true)
    expect(set.filter(cb2)).toMatchInlineSnapshot(`
      Set {
        2,
        3,
        1,
      }
    `)
    expect(cb2.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          1,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should find an index using findIndex', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.findIndex(cb)).toBe(-1)
    expect(cb.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          1,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
    const cb2 = jest.fn(() => true)
    expect(set.findIndex(cb2)).toBe(0)
    expect(cb2.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should find an index using indexOf', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.indexOf(3)).toBe(1)
  })

  it('should map loop through each value', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb2 = jest.fn((v) => v.toString())
    expect(set.map(cb2)).toMatchInlineSnapshot(`
      Set {
        "2",
        "3",
        "1",
      }
    `)
    expect(cb2.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          1,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should pop a item off the end', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.pop()).toMatchInlineSnapshot(`1`)
    expect(set.toArray()).toMatchInlineSnapshot(`
      Array [
        2,
        3,
      ]
    `)
    const set2 = new OrderedSet()
    expect(set2.pop()).toMatchInlineSnapshot(`undefined`)
  })

  it('should push an item on the end', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.push(4)).toMatchInlineSnapshot(`4`)
    expect(set.toArray()).toMatchInlineSnapshot(`
      Array [
        2,
        3,
        1,
        4,
      ]
    `)
  })

  it('should reduce the set to a value', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn((memo, val) => memo + val)
    expect(set.reduce(cb, 0)).toMatchInlineSnapshot(`6`)
    expect(cb.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          5,
          1,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
    const cb2 = jest.fn((memo, val) => memo + val)
    expect(set.reduce(cb2)).toMatchInlineSnapshot(`6`)
    expect(cb2.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          5,
          1,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should reduceRight the set to a value', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn((memo, val) => memo + val)
    expect(set.reduceRight(cb, 0)).toMatchInlineSnapshot(`6`)
    expect(cb.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          4,
          2,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
    const cb2 = jest.fn((memo, val) => memo + val)
    expect(set.reduceRight(cb2)).toMatchInlineSnapshot(`6`)
    expect(cb2.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          1,
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          4,
          2,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should push an item on the end', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.push(4)).toMatchInlineSnapshot(`4`)
    expect(set.toArray()).toMatchInlineSnapshot(`
      Array [
        2,
        3,
        1,
        4,
      ]
    `)
  })

  it('should shift remove an item from the start', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.shift()).toMatchInlineSnapshot(`2`)
    expect(set.toArray()).toMatchInlineSnapshot(`
      Array [
        3,
        1,
      ]
    `)
  })

  it('should some loop through each value', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.some(cb)).toMatchInlineSnapshot(`false`)
    expect(cb.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          3,
          1,
          Set {
            2,
            3,
            1,
          },
        ],
        Array [
          1,
          2,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
    const cb2 = jest.fn(() => true)
    expect(set.some(cb2)).toMatchInlineSnapshot(`true`)
    expect(cb2.mock.calls).toMatchInlineSnapshot(`
      Array [
        Array [
          2,
          0,
          Set {
            2,
            3,
            1,
          },
        ],
      ]
    `)
  })

  it('should splice items', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set.splice(2)).toMatchInlineSnapshot(`
      Set {
        2,
        3,
      }
    `)
    expect(set.toArray()).toMatchInlineSnapshot(`
      Array [
        2,
        3,
      ]
    `)
    const seedArr2 = [2, 3, 1]
    const set2 = new OrderedSet(seedArr2)
    expect(set2.splice(1, 2)).toMatchInlineSnapshot(`
      Set {
        2,
      }
    `)
    expect(set2.toArray()).toMatchInlineSnapshot(`
      Array [
        2,
      ]
    `)
  })

  it('should toLocaleString', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set.toLocaleString()).toMatchInlineSnapshot(
      `"[object TimeOrderedSet]"`,
    )
  })

  it('should toString', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    expect(set.toString()).toMatchInlineSnapshot(`"[object TimeOrderedSet]"`)
  })

  it('should unshift a item on the start', () => {
    const seedArr = [2, 3, 1]
    const set = new OrderedSet(seedArr)
    const cb = jest.fn(() => false)
    expect(set.unshift(10)).toMatchInlineSnapshot(`4`)
    expect(set.toArray()).toMatchInlineSnapshot(`
      Array [
        10,
        2,
        3,
        1,
      ]
    `)
  })
})
