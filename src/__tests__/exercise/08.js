// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen, act, renderHook} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
// const TestComponent = () => {
//   const {count, increment, decrement} = useCounter()

//   return (
//     <>
//       <button onClick={increment}>Increment</button>
//       <button onClick={decrement}>Decrement</button>
//       <p>The count is: {count}</p>
//     </>
//   )
// }

// function setup({initialProps} = {}) {
//   const result = {}
//   function TestComponent() {
//     result.current = useCounter(initialProps)
//     return null
//   }
//   render(<TestComponent />)
//   return result
// }

test('exposes the count and increment/decrement functions', async () => {
  // const result = setup()
  const {result} = renderHook(useCounter)
  // 🐨 render the component
  // let result
  // function TestComponent(props) {
  //   result = useCounter(props)
  //   return null
  // }
  // render(<TestComponent />)
  // 🐨 get the elements you need using screen
  // const increment = screen.getByText(/increment/i)
  // const decrement = screen.getByText(/decrement/i)
  // const message = screen.getByText(/the count is:/i)
  // 🐨 assert on the initial state of the hook
  // expect(message).toHaveTextContent('The count is: 0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  // await userEvent.click(increment)
  // expect(message).toHaveTextContent('The count is: 1')
  // await userEvent.click(decrement)
  // expect(message).toHaveTextContent('The count is: 0')
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(1)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('allows customization of the initial count', () => {
  // const result = setup({initialProps: {initialCount: 1}})
  const {result} = renderHook(useCounter, {initialProps: {initialCount: 1}})
  expect(result.current.count).toBe(1)
})

test('allows customization of the step', () => {
  // const result = setup({initialProps: {step: 2}})
  const {result} = renderHook(useCounter, {initialProps: {step: 2}})
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(2)
  act(() => result.current.decrement())
  expect(result.current.count).toBe(0)
})

test('the step can be changed', () => {
  const {result, rerender} = renderHook(useCounter, {
    initialProps: {step: 3},
  })
  expect(result.current.count).toBe(0)
  act(() => result.current.increment())
  expect(result.current.count).toBe(3)
  rerender({step: 2})
  act(() => result.current.decrement())
  expect(result.current.count).toBe(1)
})

/* eslint no-unused-vars:0 */
