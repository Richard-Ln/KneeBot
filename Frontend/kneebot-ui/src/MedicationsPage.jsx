import React from 'react';
import { Link } from 'react-router-dom';

const MedicationsPage = () => {
    return (
        <div className="font-sans w-full pb-12">
            <header className="bg-[#102952] text-center pt-10 pb-10 px-4 mb-8 shadow-inner">
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2 uppercase">
                    PAIN MEDICATIONS
                </h1>
                <p className="text-lg text-blue-100 font-medium">Browse common over-the-counter pain relief options.</p>
            </header>

            <main className="p-5 md:p-8 max-w-7xl mx-auto">
                <section className="flex flex-col gap-10">

                    {/* Pain Medications Category */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-6">
                            Pain Medications
                        </h2>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Tylenol Card */}
                            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 flex flex-col transition-shadow hover:shadow-lg">
                                <img src="/images/Tylenol.jpg" alt="Tylenol" className="w-full h-[150px] object-contain bg-white rounded-lg mb-3" />
                                <h3 className="text-lg font-semibold my-2 text-gray-800">Acetaminophen <br /> (Tylenol)</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Dosage: 1-2 capsules every 4-6 hours</p>

                                <details className="mt-auto bg-gray-50 border border-gray-200 rounded-lg overflow-hidden text-left group">
                                    <summary className="cursor-pointer font-semibold p-2 bg-gray-100 group-hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-md">
                                        More Info
                                    </summary>
                                    <div className="p-3 text-sm text-gray-700 bg-white border-t border-gray-200">
                                        <p className="font-bold text-red-600 mb-1">WARNINGS:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Maximum daily dose: 4000mg</li>
                                            <li>Do not take with other acetaminophen-containing products</li>
                                            <li>May cause liver damage if taken in excess</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>

                            {/* AA Combo Card */}
                            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 flex flex-col transition-shadow hover:shadow-lg">
                                <img src="/images/AA combo.jpg" alt="Acetaminophen & Aspirin" className="w-full h-[150px] object-contain bg-white rounded-lg mb-3" />
                                <h3 className="text-lg font-semibold my-2 text-gray-800">Acetaminophen & Aspirin</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Dosage: 2 tablets every 6 hours</p>

                                <details className="mt-auto bg-gray-50 border border-gray-200 rounded-lg overflow-hidden text-left group">
                                    <summary className="cursor-pointer font-semibold p-2 bg-gray-100 group-hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-md">
                                        More Info
                                    </summary>
                                    <div className="p-3 text-sm text-gray-700 bg-white border-t border-gray-200">
                                        <p className="font-bold text-red-600 mb-1">WARNINGS:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Combines risk of both medications</li>
                                            <li>Overdose risk if taken with other medications</li>
                                            <li>May cause stomach irritation or bleeding</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>

                            {/* Bayer Card */}
                            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 flex flex-col transition-shadow hover:shadow-lg">
                                <img src="/images/Bayer.jpg" alt="Bayer Aspirin" className="w-full h-[150px] object-contain bg-white rounded-lg mb-3" />
                                <h3 className="text-lg font-semibold my-2 text-gray-800">Aspirin <br />(Bayer)</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Dosage: 1-2 tablets every 4-6 hours</p>

                                <details className="mt-auto bg-gray-50 border border-gray-200 rounded-lg overflow-hidden text-left group">
                                    <summary className="cursor-pointer font-semibold p-2 bg-gray-100 group-hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-md">
                                        More Info
                                    </summary>
                                    <div className="p-3 text-sm text-gray-700 bg-white border-t border-gray-200">
                                        <p className="font-bold text-red-600 mb-1">WARNINGS:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Risk of bleeding</li>
                                            <li>Not for children/teens</li>
                                            <li>Can irritate stomach</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>

                            {/* Ibuprofen Card */}
                            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 flex flex-col transition-shadow hover:shadow-lg">
                                <img src="/images/Ibuprofen.jpg" alt="Ibuprofen" className="w-full h-[150px] object-contain bg-white rounded-lg mb-3" />
                                <h3 className="text-lg font-semibold my-2 text-gray-800">Ibuprofen</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Dosage: 1-2 capsules every 4-6 hours</p>

                                <details className="mt-auto bg-gray-50 border border-gray-200 rounded-lg overflow-hidden text-left group">
                                    <summary className="cursor-pointer font-semibold p-2 bg-gray-100 group-hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-md">
                                        More Info
                                    </summary>
                                    <div className="p-3 text-sm text-gray-700 bg-white border-t border-gray-200">
                                        <p className="font-bold text-red-600 mb-1">WARNINGS:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Stomach pain, ulcers, or bleeding</li>
                                            <li>Increased risk of heart attack or stroke</li>
                                            <li>May cause kidney problems</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>

                            {/* Naproxen Card */}
                            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 flex flex-col transition-shadow hover:shadow-lg">
                                <img src="/images/Naproxen Background Removed.png" alt="Naproxen" className="w-full h-[150px] object-contain bg-white rounded-lg mb-3" />
                                <h3 className="text-lg font-semibold my-2 text-gray-800">Naproxen</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Dosage: 1 tablet every 8-12 hours</p>

                                <details className="mt-auto bg-gray-50 border border-gray-200 rounded-lg overflow-hidden text-left group">
                                    <summary className="cursor-pointer font-semibold p-2 bg-gray-100 group-hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-md">
                                        More Info
                                    </summary>
                                    <div className="p-3 text-sm text-gray-700 bg-white border-t border-gray-200">
                                        <p className="font-bold text-red-600 mb-1">WARNINGS:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Stomach irritation or bleeding</li>
                                            <li>Increased heart risk</li>
                                            <li>Avoid taking too close together</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>

                        </div>
                    </section>

                    {/* Topical Treatments */}
                    <section>
                        <h2 className="text-2xl font-bold text-slate-800 border-b-2 border-slate-300 pb-2 mb-6">
                            Topical Treatments
                        </h2>
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">

                            {/* Aspercreme Card */}
                            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 flex flex-col transition-shadow hover:shadow-lg">
                                <img src="/images/Aspercreme.jpg" alt="Aspercreme" className="w-full h-[150px] object-contain bg-white rounded-lg mb-3" />
                                <h3 className="text-lg font-semibold my-2 text-gray-800">Aspercreme</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Dosage: Apply up to 3-4 times daily</p>

                                <details className="mt-auto bg-gray-50 border border-gray-200 rounded-lg overflow-hidden text-left group">
                                    <summary className="cursor-pointer font-semibold p-2 bg-gray-100 group-hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-md">
                                        More Info
                                    </summary>
                                    <div className="p-3 text-sm text-gray-700 bg-white border-t border-gray-200">
                                        <p className="font-bold text-red-600 mb-1">WARNINGS:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Mild skin irritation</li>
                                            <li>Avoid eyes and open wounds</li>
                                            <li>Stop use if irritation worsens</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>

                            {/* Orthosis Card */}
                            <div className="bg-white rounded-xl p-4 text-center shadow-md border border-gray-100 flex flex-col transition-shadow hover:shadow-lg">
                                <img src="/images/kneebrace.jpg" alt="Orthosis" className="w-full h-[150px] object-contain bg-white rounded-lg mb-3" />
                                <h3 className="text-lg font-semibold my-2 text-gray-800">Orthosis <br /> (Brace/Support)</h3>
                                <p className="text-sm text-gray-600 mb-4 flex-grow">Usage: Wear during activity or as needed</p>

                                <details className="mt-auto bg-gray-50 border border-gray-200 rounded-lg overflow-hidden text-left group">
                                    <summary className="cursor-pointer font-semibold p-2 bg-gray-100 group-hover:bg-gray-200 transition-colors focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-blue-500 rounded-md">
                                        More Info
                                    </summary>
                                    <div className="p-3 text-sm text-gray-700 bg-white border-t border-gray-200">
                                        <p className="font-bold text-red-600 mb-1">WARNINGS:</p>
                                        <ul className="list-disc pl-5 space-y-1">
                                            <li>Overuse may weaken muscles</li>
                                            <li>May restrict circulation</li>
                                            <li>Use only when necessary</li>
                                        </ul>
                                    </div>
                                </details>
                            </div>

                        </div>
                    </section>
                </section>
            </main>
        </div>
    );
};

export default MedicationsPage;