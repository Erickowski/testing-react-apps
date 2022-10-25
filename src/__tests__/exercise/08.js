// testing custom hooks
// http://localhost:3000/counter-hook

import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import useCounter from '../../components/use-counter'

// 🐨 create a simple function component that uses the useCounter hook
// and then exposes some UI that our test can interact with to test the
// capabilities of this hook
// 💰 here's how to use the hook:
// const {count, increment, decrement} = useCounter()
const TestComponent = () => {
  const {count, increment, decrement} = useCounter()

  return (
    <>
      <button onClick={increment}>Increment</button>
      <button onClick={decrement}>Decrement</button>
      <p>The count is: {count}</p>
    </>
  )
}

test('exposes the count and increment/decrement functions', async () => {
  // 🐨 render the component
  render(<TestComponent />)
  // 🐨 get the elements you need using screen
  const increment = screen.getByText(/increment/i)
  const decrement = screen.getByText(/decrement/i)
  const message = screen.getByText(/the count is:/i)
  // 🐨 assert on the initial state of the hook
  expect(message).toHaveTextContent('The count is: 0')
  // 🐨 interact with the UI using userEvent and assert on the changes in the UI
  await userEvent.click(increment)
  expect(message).toHaveTextContent('The count is: 1')
  await userEvent.click(decrement)
  expect(message).toHaveTextContent('The count is: 0')
})

/* eslint no-unused-vars:0 */
