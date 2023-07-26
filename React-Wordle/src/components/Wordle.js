import React from 'react'
import useWordle from '../hooks/useWordle';
import { useEffect,useState } from 'react';
import Grid from './Grid';
import Keypad from './Keypad';
import Modal from './Modal';

export default function Wordle({solution}) {
      const {currentGuess, handleKeyup, guesses, isCorrect,turn,usedKeys} =  useWordle(solution);
      const [showModal, setShowModal] = useState(false)
  
      useEffect(() => {
        window.addEventListener('keyup', handleKeyup)
    
        if (isCorrect) {
          setTimeout(() => setShowModal(true), 2000)
          window.removeEventListener('keyup', handleKeyup)
        }
        if (turn > 5) {
          setTimeout(() => setShowModal(true), 2000)
          window.removeEventListener('keyup', handleKeyup)
        }
    
        return () => window.removeEventListener('keyup', handleKeyup)
      }, [handleKeyup, isCorrect, turn])
      

        return (
            <div>
            {/* <div>solution is - {solution}</div> */}
            {/* <div>current guess is - {currentGuess}</div> */}
            <Grid guesses={guesses} currentGuess={currentGuess} turn={turn} />
            <Keypad  usedKeys={usedKeys}/>
            {showModal && <Modal isCorrect={isCorrect} turn={turn} solution={solution} />}
            </div>

        )
}
