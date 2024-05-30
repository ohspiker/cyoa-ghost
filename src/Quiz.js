// src/Quiz.js
// olivia handspiker
import React, { useState, useEffect } from 'react';

const Quiz = () => {
  const [currentScenario, setCurrentScenario] = useState(null);
  const [storyData, setStoryData] = useState([]);
  const [storyStarted, setStoryStarted] = useState(false);
  const [diaryFound, setDiaryFound] = useState(false);

  useEffect(() => {
      fetch(`${process.env.PUBLIC_URL}/questions.json`)
        .then((response) => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then((data) => {
          setStoryData(data);
          setCurrentScenario(data.find((scenario) => scenario.id === 1)); // Start with the first scenario
        })
        .catch((error) => console.error('Error fetching story data:', error));
    }, []);

  const startStory = () => {
    setStoryStarted(true);
  };

  const restartStory = () => {
    setCurrentScenario(storyData.find((scenario) => scenario.id === 1));
    setDiaryFound(false);
    setStoryStarted(false);
  };

  return (
    <div className='App'>
      <div className='card'>
        {storyStarted && (
          <button className="restart-button" onClick={restartStory}>Restart Adventure</button>
        )}
        {!storyStarted ? (
          <div className='start-page'>
            <h1>Haunting of the<br />Grand Orpheum Theatre</h1>
            <p>
              As a daring journalist with a penchant for the supernatural, you venture into the old Grand Orpheum Theatre.<br />
              Rumoured to be haunted by the spirits of its past, you must uncover the truth hidden within its decaying walls.<br />
              Will you brave the shadows and reveal the secrets that have long been buried?
            </p>
            <div className="start-button-container">
              <button onClick={startStory}>Start Adventure</button>
            </div>
          </div>
        ) : storyData.length === 0 ? (
          <div>Loading...</div>
        ) : currentScenario ? (
          <>
            <div className='scenario-section'>
              <div
                className='scenario-text'
                dangerouslySetInnerHTML={{ __html: currentScenario.scenario }}
              />
              {currentScenario.image && (
                <img src={currentScenario.image} alt="Scenario" className='scenario-image' />
              )}
            </div>
            <div className='answer-section'>
              {currentScenario.choices.map((choice, index) => (
                <div className="buttonChoice" key={index}>
                  <button>
                    {choice.text}
                  </button>
                </div>
              ))}
            </div>
            <div className='question-count'>
              <span>Page {storyData.indexOf(currentScenario) + 1}</span>/{storyData.length}
            </div>
          </>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
