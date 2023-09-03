
import '../../app/globals.css'
import React from 'react'
import { useEffect, useState } from 'react';

const Keyboard = ({ currentLetter }) => {
	const rows = [
		['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
		['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
		['Z', 'X', 'C', 'V', 'B', 'N', 'M']
	];

	const [keys, setKeys] = useState(rows.flatMap(row => row.map(key => ({ label: key, isActive: false }))));

	const handleKeyDown = (e) => {
		const updatedKeys = keys.map(key => {
			if (key.label === e.key.toUpperCase()) {
				return { ...key, isActive: true };
			}
			return key;
		});
		setKeys(updatedKeys);
	};

	const handleKeyUp = (e) => {
		const updatedKeys = keys.map(key => {
			if (key.label === e.key.toUpperCase()) {
				return { ...key, isActive: false };
			}
			return key;
		})
		setKeys(updatedKeys);
	};

	useEffect(() => {
		window.addEventListener('keydown', handleKeyDown);
		window.addEventListener('keyup', handleKeyUp);

		return () => {
			window.removeEventListener('keydown', handleKeyDown);
			window.removeEventListener('keyup', handleKeyUp);
		};
	}, [keys]);

	return (
		<div className="bg-slate-300 relative p-6 rounded-xl shadow-md h-72 w-3/5">
			{rows.map((row, index) => (
				<div key={index} className="flex justify-center mb-2">
					{row.map(label => {
						const key = keys.find(k => k.label === label);
						return (
							<button
								key={key.label}
								className={`bg-black border border-gray-300 rounded py-4 px-6 text-xl focus:outline-none ${key.isActive ? 'bg-gray-400' : ''}`}
							>
								{key.label}
							</button>
						);
					})}
				</div>
			))}
			<span className="text-black absolute bottom-2 right-6 text-md">HHKB</span>
		</div>
	);
}

export default Keyboard;
