import { useEffect, useState } from "react";
import { db, auth } from '../config/firebase';
import { getDocs, collection, addDoc, deleteDoc, doc } from "firebase/firestore";
import ImageURLUpdate from './ImageURLUpdate';
import FileUpload from './FileUpload';

export default function Games() {
    const [gamesList, setGamesList] = useState([]);
    const [newGameTitle, setNewGameTitle] = useState('');
    const [newReleaseDate, setNewReleaseDate] = useState('');
    const [isMultiplayer, setIsMultiplayer] = useState(false);
    const [newImageUrl, setNewImageUrl] = useState('');
    const [newReview, setNewReview] = useState('');
    const [isGameAdded, setIsGameAdded] = useState(false);

    const gamesCollectionRef = collection(db, "games");

    async function getGamesList() {
        try {
            const data = await getDocs(gamesCollectionRef);
            const filteredData = data.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
            setGamesList(filteredData);
        } catch (err) {
            console.error(err);
        }
    }

    useEffect(() => {
        getGamesList();
    }, []);

    async function onSubmitGame() {
        try {
            await addDoc(gamesCollectionRef, {
                title: newGameTitle,
                releaseDate: newReleaseDate,
                multiPlayer: isMultiplayer,
                imageUrl: newImageUrl,
                review: newReview,
                userId: auth?.currentUser?.uid,
            });
            setNewGameTitle('');
            setNewReleaseDate('');
            setIsMultiplayer(false);
            setNewImageUrl('');
            setNewReview('');
            setIsGameAdded(true);
            setTimeout(() => {
                setIsGameAdded(false);
            }, 3000);
            getGamesList();
        } catch (err) {
            console.error(err);
        }
    }

    async function deleteGame(id) {
        const gameDoc = doc(db, "games", id);
        await deleteDoc(gameDoc);
        getGamesList();
    }

    return (
        <section className="bg-gray-900 text-white min-h-screen p-8">
            {isGameAdded && (
                <div className="fixed top-10 right-0 left-0 mx-auto w-2/3 max-w-lg bg-green-500 text-white px-4 py-2 m-4 rounded-md shadow-md text-center">
                    Game added!
                </div>
            )}
            <div className="bg-black p-8 rounded-lg shadow-lg mx-auto max-w-2xl">
                <h2 className="text-center text-2xl mb-4">Add New Game</h2>
                <div className="flex flex-col gap-4">
                    <input
                        className="w-full py-2 rounded-md text-center bg-gray-800 text-white"
                        placeholder="Game title.."
                        value={newGameTitle}
                        onChange={(e) => setNewGameTitle(e.target.value)}
                    />
                    <input
                        type="date"
                        className="w-full py-2 rounded-md text-center bg-gray-800 text-white"
                        placeholder="Game Release Date.."
                        value={newReleaseDate}
                        onChange={(e) => setNewReleaseDate(e.target.value)}
                    />
                    <input
                        className="w-full py-2 rounded-md text-center bg-gray-800 text-white"
                        placeholder="Image URL.."
                        value={newImageUrl}
                        onChange={(e) => setNewImageUrl(e.target.value)}
                    />
                    <textarea
                        className="w-full py-2 rounded-md text-center bg-gray-800 text-white"
                        placeholder="Review.."
                        value={newReview}
                        onChange={(e) => setNewReview(e.target.value)}
                    />
                    <div className="my-2 flex items-center gap-2">
                        <input
                            type="checkbox"
                            id="multiplayerCheckbox"
                            className="hidden"
                            checked={isMultiplayer}
                            onChange={(e) => setIsMultiplayer(e.target.checked)}
                        />
                        <label
                            htmlFor="multiplayerCheckbox"
                            className="m-2 w-6 h-6 rounded-md bg-gray-700 flex items-center justify-center cursor-pointer"
                        >
                            {isMultiplayer && (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="w-4 h-4 text-white"
                                >
                                    <path
                                        fillRule="evenodd"
                                        d="M9 2.75A6.75 6.75 0 102.75 9 6.758 6.758 0 009 2.75zm0 1.5a5.25 5.25 0 110 10.5A5.258 5.258 0 013.75 9 5.252 5.252 0 019 4.25zm3.72 2.22a.75.75 0 00-1.06 0L8.25 9.88l-1.47-1.47a.75.75 0 00-1.06 1.06l2 2a.75.75 0 001.06 0l3.5-3.5a.75.75 0 000-1.06z"
                                        clipRule="evenodd"
                                    />
                                </svg>
                            )}
                        </label>
                        <span className="text-white">Multiplayer</span>
                    </div>
                    <button onClick={onSubmitGame} className="bg-black text-white rounded-md p-4 hover:bg-gray-700">
                        Submit Game
                    </button>
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-8">
                {gamesList.map((game) => (
                    <div key={game.id} className="bg-gray-800 p-4 rounded-lg shadow-lg">
                        {game.imageUrl && (
                            <img src={game.imageUrl} alt={game.title} className="w-full h-48 object-cover rounded-md mb-4" />
                        )}
                        <h1 className="text-center font-bold text-xl">Title: {game.title}</h1>
                        <p className="text-center">Date released: {game.releaseDate}</p>
                        <p className="text-center">Multiplayer: {game.multiPlayer ? 'Yes' : 'No'}</p>
                        <p className="text-center">Review: {game.review}</p>
                        <ImageURLUpdate gameId={game.id} />
                        <button
                            onClick={() => deleteGame(game.id)}
                            className="bg-red-600 text-white rounded-md p-2 hover:bg-red-700 mt-4"
                        >
                            Delete Game
                        </button>
                    </div>
                ))}
            </div>
            {/* <FileUpload /> */}
        </section>
    );
}
