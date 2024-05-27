// FileUpload.jsx
import { useState } from 'react';
import { ref, uploadBytes } from 'firebase/storage';
import { storage } from '../config/firebase';

export default function FileUpload() {
    const [fileUpload, setFileUpload] = useState(null);

    async function uploadFile() {
        if (!fileUpload) return;
        const filesFolderRef = ref(storage, `projectFiles/${fileUpload.name}`);
        try {
            await uploadBytes(filesFolderRef, fileUpload);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div>
            <input
                className="w-full mt-4 py-2 rounded-md text-center bg-stone-500 hover:bg-purple-500 text-stone-200"
                type="file"
                onChange={(e) => setFileUpload(e.target.files[0])}
            />
            <button
                className="bg-blue-900 rounded-md m-4 p-4 text-purple-200 hover:bg-purple-950"
                onClick={uploadFile}
            >
                Upload File
            </button>
        </div>
    );
}
