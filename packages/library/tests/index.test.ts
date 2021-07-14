import { expect } from 'chai'
import * as sinon from 'sinon'

import { createUser, User, showUser } from '../src/index'

describe('test user', () => {
  it('create user', () => {
    // Give
    const name = 'Alice'
    const age = 20

    // When
    const user: User = createUser(name, age)

    // Then
    expect(user.name).equal(name)
    expect(user.age).equal(age)
  })

  it('display user', () => {
    // Give
    const name = 'Alice'
    const age = 20

    // When
    const spy = sinon.spy(console, 'log')
    const user: User = createUser(name, age)
    showUser(user)

    // Then
    expect(spy.calledWith(`Alice is 20 years old.`)).equal(true)
  })
})
