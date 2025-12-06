import React, { useMemo } from 'react';
import { Question, Choice } from '../types';
import { MessageCircle } from 'lucide-react';

interface QuestionScreenProps {
  question: Question;
  totalQuestions: number;
  currentStep: number;
  onAnswer: (choice: Choice) => void;
}

const QuestionScreen: React.FC<QuestionScreenProps> = ({
  question,
  totalQuestions,
  currentStep,
  onAnswer,
}) => {
  const progress = ((currentStep + 1) / totalQuestions) * 100;

  // Shuffle choices only when the question changes to prevent re-shuffling on re-renders
  const shuffledChoices = useMemo(() => {
    return [...question.choices].sort(() => Math.random() - 0.5);
  }, [question]);

  return (
    <div className="w-full max-w-md mx-auto space-y-6 animate-fade-in-up px-2">
      
      {/* Header & Progress */}
      <div className="flex items-center justify-between mb-4">
        <span className="text-sm font-bold text-rose-500 bg-rose-50 px-3 py-1 rounded-full border border-rose-100">
          Q{question.id}
        </span>
        <div className="flex-1 mx-4 h-2 bg-gray-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-rose-400 to-purple-500 transition-all duration-500 ease-out"
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        <span className="text-xs font-medium text-gray-400">
          {currentStep + 1}/{totalQuestions}
        </span>
      </div>

      {/* Scenario Bubble (Chat Style) */}
      <div className="relative">
        <div className="absolute -top-3 -left-2 text-4xl animate-bounce z-10">🤔</div>
        <div className="glass p-8 rounded-3xl shadow-lg border-2 border-white/50 relative overflow-hidden min-h-[140px] flex items-center justify-center">
           <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-100 to-transparent rounded-bl-full opacity-50"></div>
           <h2 className="text-xl md:text-2xl font-bold text-gray-800 text-center leading-relaxed relative z-10 break-keep">
            {question.scenario}
          </h2>
        </div>
      </div>

      {/* Choices Grid */}
      <div className="grid gap-3 pt-4">
        {shuffledChoices.map((choice, index) => (
          <button
            key={index}
            onClick={() => onAnswer(choice)}
            className="relative w-full text-left p-5 bg-white rounded-2xl shadow-sm border-2 border-transparent hover:border-rose-300 hover:shadow-md hover:-translate-y-1 transition-all duration-200 group overflow-hidden"
          >
            <div className="absolute left-0 top-0 h-full w-1 bg-gray-100 group-hover:bg-rose-400 transition-colors"></div>
            <div className="flex items-start gap-3 pl-2">
              <MessageCircle className="w-5 h-5 text-gray-300 group-hover:text-rose-500 mt-0.5 shrink-0 transition-colors" />
              <span className="text-gray-700 font-medium group-hover:text-gray-900 text-lg leading-snug break-keep">
                {choice.text}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuestionScreen;