import { useState, useEffect } from 'react';
import Image from '../assets/Gamingpic.jpg';
import { auth, googleProvider } from '../config/firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup, signOut, onAuthStateChanged } from 'firebase/auth';

export default function Auth() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [isSignUp, setIsSignUp] = useState(false);

    console.log(auth?.currentUser?.photoURL);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
        });
        return () => unsubscribe();
    }, []);

    // Sign up
    async function SignUp() {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    }

    // Sign in
    async function SignIn() {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.error(err);
        }
    }

    // Sign in with Google
    async function signInWithGoogle() {
        try {
            await signInWithPopup(auth, googleProvider);
        } catch (err) {
            console.error(err);
        }
    }

    // Logout
    async function logout() {
        try {
            await signOut(auth);
        } catch (err) {
            console.error(err);
        }
    }

    return (
        <div
            className="flex items-center justify-center w-full h-screen bg-cover bg-center bg-no-repeat"
            style={{
                backgroundImage: `url(${Image})`,
            }}
        >
            <div className="flex flex-col items-center bg-gray-300 p-6 rounded-lg shadow-lg gap-4 bg-opacity-80">
                {user ? (
                    <>
                        <h2 className="text-xl font-bold">Welcome, {user.email}</h2>
                        <button
                            className="px-6 py-3 text-lg text-teal-100 rounded-sm bg-teal-500 hover:bg-teal-700"
                            onClick={logout}
                        >
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <input
                            className="px-4 py-2 border rounded bg-white hover:bg-violet-500"
                            placeholder="Email..."
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            className="px-4 py-2 border rounded bg-white hover:bg-violet-500"
                            placeholder="Password..."
                            type="password"
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button
                            className="px-6 py-3 text-lg text-teal-100 rounded-sm bg-teal-500 hover:bg-teal-700"
                            onClick={isSignUp ? SignUp : SignIn}
                        >
                            {isSignUp ? 'Sign Up' : 'Sign In'}
                        </button>
                        <button
                            className="px-6 py-3 text-lg text-teal-100 rounded-sm bg-teal-500 hover:bg-teal-700"
                            onClick={signInWithGoogle}
                        >
                            Sign in with Google
                        </button>
                        <button
                            className="mt-4 text-blue-500"
                            onClick={() => setIsSignUp((prev) => !prev)}
                        >
                            {isSignUp ? 'Already have an account? Sign In' : 'Don’t have an account? Sign Up'}
                        </button>
                    </>
                )}
            </div>
        </div>
    );
}
