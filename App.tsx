import React, { useState, useMemo } from 'react';
import StartScreen from './components/StartScreen';
import QuestionScreen from './components/QuestionScreen';
import ResultScreen from './components/ResultScreen';
import { GameState, Score, Choice } from './types';
import { QUESTIONS, RESULT_TYPES } from './constants';

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>(GameState.START);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState<Score>({ L: 0, E: 0 });

  const handleStart = () => {
    setScore({ L: 0, E: 0 });
    setCurrentQuestionIndex(0);
    setGameState(GameState.PLAYING);
  };

  const handleAnswer = (choice: Choice) => {
    const newScore = {
      L: score.L + choice.delta.L,
      E: score.E + choice.delta.E,
    };
    setScore(newScore);

    if (currentQuestionIndex < QUESTIONS.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    } else {
      setGameState(GameState.RESULT);
    }
  };

  const handleRestart = () => {
    setGameState(GameState.START);
  };

  const currentResultType = useMemo(() => {
    if (gameState !== GameState.RESULT) return null;
    return RESULT_TYPES.find(type => type.condition(score)) || RESULT_TYPES[3];
  }, [gameState, score]);

  return (
    // Updated background to a softer, more modern gradient
    <div className="min-h-screen bg-[#FDFBF7] relative overflow-hidden flex flex-col items-center">

      {/* Abstract Background Shapes */}
      <div className="fixed top-[-20%] left-[-10%] w-[50%] h-[50%] bg-rose-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob pointer-events-none"></div>
      <div className="fixed top-[20%] right-[-10%] w-[50%] h-[50%] bg-indigo-200 rounded-full mix-blend-multiply filter blur-[80px] opacity-40 animate-blob animation-delay-2000 pointer-events-none"></div>
      <div className="fixed bottom-[-20%] left-[20%] w-[50%] h-[50%] bg-yellow-100 rounded-full mix-blend-multiply filter blur-[80px] opacity-50 animate-blob animation-delay-4000 pointer-events-none"></div>

      <main className="w-full max-w-md mx-auto py-8 px-4 relative z-10 flex-grow">
        {gameState === GameState.START && (
          <StartScreen onStart={handleStart} />
        )}

        {gameState === GameState.PLAYING && (
          <QuestionScreen
            question={QUESTIONS[currentQuestionIndex]}
            totalQuestions={QUESTIONS.length}
            currentStep={currentQuestionIndex}
            onAnswer={handleAnswer}
          />
        )}

        {gameState === GameState.RESULT && currentResultType && (
          <ResultScreen
            score={score}
            resultType={currentResultType}
            onRestart={handleRestart}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="w-full py-6 text-center text-xs text-gray-400 font-medium relative z-10 bg-white/30 backdrop-blur-sm border-t border-white/20">
        <div className="flex flex-col gap-2 items-center">
          <p>© Flirting Ability Test.</p>
          <a
            href="https://mini-bell.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 hover:text-rose-500 transition-colors"
          >
            <span>Made by </span>
            <span className="underline underline-offset-2 decoration-rose-300">Homepage</span>
            <span>🚀</span>
          </a>
        </div>
      </footer>
    </div>
  );
};

export default App;