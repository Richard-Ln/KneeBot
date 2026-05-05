import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import exerciseData from './ExerciseData.json'; // Direct import of JSON data

const ExercisePage = () => {
    // Manage which tab is currently active
    const [currentTab, setCurrentTab] = useState('stretch');
    // Manage which specific exercise cards are expanded to show details
    const [expandedCards, setExpandedCards] = useState({});

    // Retrieve the exercises for the active tab, defaulting to an empty array if none exist
    const currentExercises = exerciseData[currentTab] || [];

    const toggleDetails = (name) => {
        setExpandedCards((prev) => ({
            ...prev,
            [name]: !prev[name],
        }));
    };

    return (
        <div className="font-sans w-full pb-12">

            <header className="bg-[#102952] text-center pt-10 pb-10 px-4 mb-8 shadow-inner">
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 uppercase">
                    EXERCISES
                </h1>
                <p className="text-lg text-blue-100 font-medium">Movements to strengthen and stretch your knees.</p>
            </header>

            {/* TABS */}
            <div className="flex justify-center gap-3 mb-10 px-4" role="tablist">
                <button
                    role="tab"
                    aria-selected={currentTab === 'stretch'}
                    onClick={() => setCurrentTab('stretch')}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-sm md:text-base ${
                        currentTab === 'stretch'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Stretch
                </button>
                <button
                    role="tab"
                    aria-selected={currentTab === 'strength'}
                    onClick={() => setCurrentTab('strength')}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-sm md:text-base ${
                        currentTab === 'strength'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Strength
                </button>
                <button
                    role="tab"
                    aria-selected={currentTab === 'other'}
                    onClick={() => setCurrentTab('other')}
                    className={`px-5 py-2.5 rounded-lg font-medium transition-all focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-offset-2 text-sm md:text-base ${
                        currentTab === 'other'
                            ? 'bg-blue-600 text-white shadow-md'
                            : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                >
                    Other
                </button>
            </div>

            {/* CONTENT */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4 md:p-8 max-w-7xl mx-auto">
                {currentExercises.length === 0 ? (
                    <p className="col-span-full text-center text-gray-500 py-10 text-lg">No exercises found.</p>
                ) : (
                    currentExercises.map((exercise) => (
                        <div
                            key={exercise.name}
                            className="bg-white p-5 rounded-xl cursor-pointer shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border border-gray-100 focus-within:ring-2 focus-within:ring-blue-600"
                            onClick={() => toggleDetails(exercise.name)}
                            tabIndex={0}
                            role="button"
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' || e.key === ' ') {
                                    e.preventDefault();
                                    toggleDetails(exercise.name);
                                }
                            }}
                        >
                            <img
                                src={exercise.image}
                                alt={`Illustration of ${exercise.name}`}
                                className="w-full h-40 object-cover rounded-lg mb-4 bg-gray-100"
                                onError={(e) => { e.target.src = 'https://via.placeholder.com/300x150'; }}
                            />
                            <h3 className="text-lg font-bold text-gray-800">{exercise.name}</h3>

                            {/* Toggle the details display based on unique exercise name */}
                            <div
                                className={`mt-4 text-sm text-gray-700 space-y-2 bg-slate-50 p-4 rounded-md border border-gray-100 transition-opacity ${expandedCards[exercise.name] ? 'block' : 'hidden'}`}
                            >
                                <p><strong className="text-gray-900 font-semibold">Helps With:</strong> {exercise.help}</p>
                                <p><strong className="text-gray-900 font-semibold">How To Do:</strong> {exercise.how}</p>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default ExercisePage;