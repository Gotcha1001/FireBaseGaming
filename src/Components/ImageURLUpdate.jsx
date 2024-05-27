// ImageURLUpdate.jsx
import { useState } from 'react';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function ImageURLUpdate({ gameId }) {
    const [updatedImageURL, setUpdatedImageURL] = useState("");

    async function updateImageURL() {
        const gameDoc = doc(db, "games", gameId);
        await updateDoc(gameDoc, { imageUrl: updatedImageURL });
    }

    return (
        <div>
            <input
                className="w-full mt-4 py-2 rounded-md text-center bg-stone-500 hover:bg-purple-500 text-stone-200"
                placeholder="New image URL..."
                onChange={(e) => setUpdatedImageURL(e.target.value)}
            />
            <button
                onClick={updateImageURL}
                className="bg-blue-900 rounded-md m-4 p-4 text-purple-200 hover:bg-purple-950"
            >
                Update Image
            </button>
        </div>
    );
}
