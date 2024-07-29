import classes from './Feedback.module.css';

function Feedback({ feedbacks, total }) {
  const positive = Math.round((feedbacks.good / total) * 100);

  return (
    <ul className={classes['feedback']}>
      {Object.entries(feedbacks).map(([name, value]) => (
        <li className={classes['feedback-item']} key={name}>
          {name}:&nbsp;{value}
        </li>
      ))}
      <li className={classes['feedback-item']}>Total:&nbsp;{total}</li>
      <li className={classes['feedback-item']}>Positive:&nbsp;{positive}%</li>
    </ul>
  );
}

export default Feedback;
