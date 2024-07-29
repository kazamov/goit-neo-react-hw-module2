import { useCallback, useEffect, useState } from 'react';

import classes from './App.module.css';

import Description from './Description';
import Options from './Options';
import Feedback from './Feedback';
import Notification from './Notification';

function readFromStorage(key, defaultValue) {
  try {
    const item = globalThis.localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function writeToStorage(key, value) {
  globalThis.localStorage.setItem(key, JSON.stringify(value));
}

const DEFAULT_STATE = {
  good: 0,
  neutral: 0,
  bad: 0,
};

function App() {
  const [feedbacks, setFeedbacks] = useState(() => readFromStorage('feedbacks', DEFAULT_STATE));
  const totalFeedback = feedbacks.good + feedbacks.neutral + feedbacks.bad;
  const positiveFeedback = Math.round((feedbacks.good / totalFeedback) * 100);

  const updateFeedback = useCallback(type => {
    setFeedbacks(prevFeedbacks => {
      return {
        ...prevFeedbacks,
        [type]: prevFeedbacks[type] + 1,
      };
    });
  }, []);

  const resetFeedback = useCallback(() => {
    setFeedbacks(DEFAULT_STATE);
  }, []);

  useEffect(() => {
    writeToStorage('feedbacks', feedbacks);
  }, [feedbacks]);

  return (
    <div className={classes['app']}>
      <Description />
      <Options
        onFeedbackChange={updateFeedback}
        onFeedbackReset={resetFeedback}
        total={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedbacks={feedbacks}
          totalFeedback={totalFeedback}
          positiveFeedback={positiveFeedback}
        />
      ) : (
        <Notification />
      )}
    </div>
  );
}

export default App;
