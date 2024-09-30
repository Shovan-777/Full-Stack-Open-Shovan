import {useState} from 'react'

const StatisticLine = ({text, value}) => {
  if (text =="positive") {
    return (
      <tr><td>{text} {value}%</td></tr>
    )
  }

  return (
    <tr><td>{text} {value}</td></tr>
  )
}

const Statistics = ({clicks}) => {
    const total = clicks.good + clicks.neutral + clicks.bad
    const average = (clicks.good * 1 + clicks.bad * -1) / total
    const positive = clicks.good * (100/total)

    if (total === 0) {
      return (
        <div>
          No feedback given
        </div>
      )
    }

    return (
      <div>
        <table>
          <tbody>
            <StatisticLine text="good" value={clicks.good} />
            <StatisticLine text="neutral" value={clicks.neutral} />
            <StatisticLine text="bad" value={clicks.bad} />
            <StatisticLine text="all" value={total} />
            <StatisticLine text="average" value={average} />
            <StatisticLine text="positive" value={positive} />
          </tbody>
        </table>
      </div>
    )
}


const Button = ({ onClick, text }) => <button onClick={onClick}>{text} </button>


const App = () => {
  const [clicks, setClicks] = useState({
    good: 0, neutral: 0, bad: 0
  })

  const handleGoodClick = () =>
    setClicks({...clicks, good: clicks.good + 1})

  const handleNeutralClick = () =>
    setClicks({...clicks, neutral: clicks.neutral + 1})

  const handleBadClick = () =>
    setClicks({...clicks, bad: clicks.bad + 1})


  return (
    <>
      <h1>give feedback</h1>
      <Button onClick={handleGoodClick} text='good'/>
      <Button onClick={handleNeutralClick} text='neutral'/>
      <Button onClick={handleBadClick} text='bad'/>
      <h1>Statistics given</h1>
      <Statistics clicks={clicks} />
    </>
  );
}

export default App