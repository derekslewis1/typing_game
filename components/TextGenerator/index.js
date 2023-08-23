
'use client'
import React, { useState, useEffect } from 'react';
import Keyboard from '../Keyboard';

const TextGenerator = () => {

	const [highScore, setHighScore] = useState(() => {
		const savedHighScore = localStorage.getItem('highScore');
		return savedHighScore ? Number(savedHighScore) : 0;
	});

	const [isEnteringUsername, setIsEnteringUsername] = useState(false);

	const [highScoreHolder, setHighScoreHolder] = useState(() => {
		const savedHighScoreHolder = localStorage.getItem('highScoreHolder');
		return savedHighScoreHolder ? savedHighScoreHolder : "No one yet";
	});

	const [sentences] = useState([
		"First time in a long time, hurting deeply inside, first time in a looongg timeeee, hurting.. deeply.. TRUST",
		"Got a big stick and im finna up it on your big homie you aint gonna do shit about it",
		"Buddy you are really learning rust when C is a language just give it up already",
		"I am the president of the united states joe biden and i hereby declare you gay",
		"Dylan sucks huge penis and will never type one hundred and fifty words per minute for his entire lifetime"
	]);

	const [isStarted, setIsStarted] = useState(false);
	const [startTime, setStartTime] = useState(null);
	const [wpm, setWpm] = useState(0);

	const randomSentence = () => {
		return sentences[Math.floor(Math.random() * sentences.length)];
	}
	const [currentLetterIndex, setCurrentLetterIndex] = useState(0);

	const [currentSentence, setCurrentSentence] = useState(() => {
			return sentences[0].split('').map(char => ({ char, status: 'pending' }));
	});

	useEffect(() => {
		setCurrentSentence(randomSentence().split('').map(char => ({ char, status: 'pending' })));
	}, []);

	const handleKeyDown = (e) => {
		if (!isStarted) {
			setIsStarted(true);
			setStartTime(Date.now());
		}
		if (currentLetterIndex < currentSentence.length) {
			if (e.key === currentSentence[currentLetterIndex].char) {
				const newSentence = [...currentSentence];
				newSentence[currentLetterIndex].status = 'correct';
				setCurrentSentence(newSentence);
				setCurrentLetterIndex(prevIndex => prevIndex + 1);

				// Load a new sentence when the current one is finished
				if (currentLetterIndex === currentSentence.length - 1) {
					setCurrentSentence(randomSentence().split('').map(char => ({ char, status: 'pending' })));
					setCurrentLetterIndex(0);
					const elapsedTime = (Date.now() - startTime) / 60000;
					const numberOfWords = currentSentence.length / 5;
					const calculatedWpm = numberOfWords / elapsedTime;
					setWpm(Math.round(calculatedWpm));
				
					if (calculatedWpm > highScore) {
						setHighScore(calculatedWpm);
						localStorage.setItem('highScore', String(calculatedWpm));
					}
					if (calculatedWpm > highScore) {
						setIsEnteringUsername(true);
						setHighScore(Math.round(calculatedWpm));
						localStorage.setItem('highScore', String(Math.round(calculatedWpm)));
					}


					
					setIsStarted(false);
					setStartTime(null);
				}
			} else {
				const newSentence = [...currentSentence];
				newSentence[currentLetterIndex].status = 'wrong';
				setCurrentSentence(newSentence);
			}
		}
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		return () => {
			window.removeEventListener('keydown', handleKeyDown);
		};
	}, [currentSentence, currentLetterIndex]);

	const handleSubmit = () => {
			localStorage.setItem('highScoreHolder', highScoreHolder);
			setIsEnteringUsername(false);
	}

	return (
		<>
			<div className="text-2xl mb-10 align-center w-3/4 text-center">
				{currentSentence.map((letter, index) => (
					<span
						key={index}
						className={
							letter.status === 'correct' ? 'text-green-600' :
								letter.status === 'wrong' ? 'text-red-600' :
									index === currentLetterIndex ? 'bg-slate-500' :
										''
						}
					>
						{letter.char}
					</span>
				))}
			</div>
			<Keyboard currentLetter={currentSentence[currentLetterIndex]?.char} />

			<div className="flex flex-col text-xl my-8 text-center">
				<span>Words Per Minute: {wpm}</span>
				<span className="my-4 text-green-600">The all time high score is {highScore} wpm set by {highScoreHolder}</span>
			</div>
			{isEnteringUsername && ( 
				<div className="w-1/2 h-1/2 absolute m-auto bg-black rounded-lg border-2 border-green-600">
					<span className='relative top-20 left-20 text-center text-xl text-green-600'>Congrats, you set a new high score!</span>
					<span className='absolute top-36 left-20 text-lg text-slate-100'>Enter a username</span>
					<textarea onChange={(e)=> setHighScoreHolder(e.target.value)} className="rounded-lg bg-slate-100 h-10 w-2/3 absolute resize-none text-black text-center top-44 left-20"/>
					<button onClick={handleSubmit} className='rounded-lg absolute px-4 left-20 top-60 py-2 bg-green-600 text-black'>submit</button>
				</div>

			)}
		</>
	);
}

export default TextGenerator;

