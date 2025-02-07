'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const ScoreCounter: React.FC = () => {
  const [concentrationScore, setConcentrationScore] = useState(0);
  const [difficultyScore, setDifficultyScore] = useState(0);
  const [concentrationInput, setConcentrationInput] = useState('');
  const [difficultyInput, setDifficultyInput] = useState('');
  const [scoreHistory, setScoreHistory] = useState([
    { date: '2/7', concentration: 0, difficulty: 0 }
  ]);

  const addScoreToHistory = (newConcentration: number, newDifficulty: number) => {
    const today = new Date();
    const dateStr = `${today.getMonth() + 1}/${today.getDate()}`;
    
    setScoreHistory(prev => {
      if (prev[prev.length - 1].date === dateStr) {
        const newHistory = [...prev];
        newHistory[newHistory.length - 1] = {
          date: dateStr,
          concentration: newConcentration,
          difficulty: newDifficulty
        };
        return newHistory;
      }
      return [...prev, {
        date: dateStr,
        concentration: newConcentration,
        difficulty: newDifficulty
      }];
    });
  };

  const handleScoreInput = (value: string, type: 'concentration' | 'difficulty') => {
    const numberValue = parseInt(value);
    if (!isNaN(numberValue) && numberValue >= 0) {
      if (type === 'concentration') {
        setConcentrationScore(numberValue);
        setConcentrationInput('');
        addScoreToHistory(numberValue, difficultyScore);
      } else {
        setDifficultyScore(numberValue);
        setDifficultyInput('');
        addScoreToHistory(concentrationScore, numberValue);
      }
    }
  };

  const increaseConcentration = () => {
    const newScore = concentrationScore + 1;
    setConcentrationScore(newScore);
    addScoreToHistory(newScore, difficultyScore);
  };

  const decreaseConcentration = () => {
    if (concentrationScore > 0) {
      const newScore = concentrationScore - 1;
      setConcentrationScore(newScore);
      addScoreToHistory(newScore, difficultyScore);
    }
  };

  const increaseDifficulty = () => {
    const newScore = difficultyScore + 1;
    setDifficultyScore(newScore);
    addScoreToHistory(concentrationScore, newScore);
  };

  const decreaseDifficulty = () => {
    if (difficultyScore > 0) {
      const newScore = difficultyScore - 1;
      setDifficultyScore(newScore);
      addScoreToHistory(concentrationScore, newScore);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 p-6">
      <div className="text-center">
        <h1 className="text-3xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
          전서진의 한글 용사 천재 되기 프로젝트
        </h1>
        <div className="mt-2 text-gray-600">매일매일 성장하는 전서진의 한글 실력!</div>
      </div>
      
      <div className="flex gap-4 justify-center">
        <Card className="w-64">
          <CardHeader>
            <CardTitle className="text-center">집중력</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-4xl font-bold">{concentrationScore}</div>
            <div className="flex gap-2 w-full">
              <Input
                type="number"
                min="0"
                value={concentrationInput}
                onChange={(e) => setConcentrationInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleScoreInput(e.target.value, 'concentration');
                  }
                }}
                placeholder="점수 입력"
                className="text-center"
              />
            </div>
            <div className="flex gap-2 w-full">
              <Button 
                onClick={decreaseConcentration}
                className="w-1/2"
                variant="outline"
              >
                감소
              </Button>
              <Button 
                onClick={increaseConcentration}
                className="w-1/2"
              >
                증가
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card className="w-64">
          <CardHeader>
            <CardTitle className="text-center">난이도</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center gap-4">
            <div className="text-4xl font-bold">{difficultyScore}</div>
            <div className="flex gap-2 w-full">
              <Input
                type="number"
                min="0"
                value={difficultyInput}
                onChange={(e) => setDifficultyInput(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    handleScoreInput(e.target.value, 'difficulty');
                  }
                }}
                placeholder="점수 입력"
                className="text-center"
              />
            </div>
            <div className="flex gap-2 w-full">
              <Button 
                onClick={decreaseDifficulty}
                className="w-1/2"
                variant="outline"
              >
                감소
              </Button>
              <Button 
                onClick={increaseDifficulty}
                className="w-1/2"
              >
                증가
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="w-full max-w-3xl">
        <CardHeader>
          <CardTitle>일별 성장 그래프</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={scoreHistory}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="date" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line 
                  type="monotone" 
                  dataKey="concentration" 
                  stroke="#8884d8" 
                  name="집중력"
                />
                <Line 
                  type="monotone" 
                  dataKey="difficulty" 
                  stroke="#82ca9d" 
                  name="난이도"
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ScoreCounter;
