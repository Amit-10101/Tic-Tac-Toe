import { useEffect, useState } from 'react';
import Cross from './components/Cross';
import Circle from './components/Circle';

const App = () => {
	const [turn, setTurn] = useState<'cross' | 'circle'>('cross');
	const [board, setBoard] = useState<Array<'cross' | 'circle' | ''>>(Array(9).fill(''));
	const [finished, setFinished] = useState(false);
	const [winner, setWinner] = useState<'cross' | 'circle' | 'draw' | ''>('');

	const handleClick = (index: number) => {
		if (board[index] === '' && !finished) {
			const newBoard = [...board];
			newBoard[index] = turn;
			setBoard(newBoard);
			setTurn(turn === 'cross' ? 'circle' : 'cross');
		}
	};

	const restart = () => {
		setTurn('cross');
		setBoard(Array(9).fill(''));
		setFinished(false);
		setWinner('');
	};

	useEffect(() => {
		const winConditions = [
			[0, 1, 2],
			[3, 4, 5],
			[6, 7, 8],
			[0, 3, 6],
			[1, 4, 7],
			[2, 5, 8],
			[0, 4, 8],
			[2, 4, 6],
		];

		for (const condition of winConditions) {
			const [a, b, c] = condition;
			if (board[a] && board[a] === board[b] && board[a] === board[c]) {
				setFinished(true);
				setWinner(board[a]);
				return;
			}
		}

		if (!board.includes('')) {
			setFinished(true);
			setWinner('draw');
		}
	}, [board]);

	return (
		<>
			<div
				className={`relative h-screen flex justify-center items-center ${
					finished && 'blur-sm'
				}`}
			>
				<div className="grid grid-cols-3 grid-rows-3 h-1/2 w-1/3 bg-slate-200">
					{board.map((box, index) => (
						<div
							key={index}
							className="flex justify-center items-center border border-slate-800/40 hover:bg-slate-300 ease-in-out hover:ease-in-out duration-500 p-5"
							onClick={() => handleClick(index)}
						>
							{box === 'cross' && <Cross />}
							{box === 'circle' && <Circle />}
						</div>
					))}
				</div>
			</div>

			{finished && (
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10 bg-green-200 w-1/2 h-1/2 shadow-md p-5 rounded-lg flex justify-center items-center flex-col gap-10 text-4xl">
					GAME FINISHED
					<h3>
						Winner:{' '}
						{winner === 'draw'
							? "It's a Draw!"
							: winner === 'cross'
							? 'Cross'
							: 'Circle'}
					</h3>
					<button
						className="bg-red-500 rounded-xl py-4 px-6 text-lg text-white hover:bg-red-600"
						onClick={restart}
					>
						Restart
					</button>
				</div>
			)}
		</>
	);
};

export default App;
