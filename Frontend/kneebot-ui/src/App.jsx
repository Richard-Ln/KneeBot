import { Routes, Route, Link, NavLink } from 'react-router-dom';

// Import your page components
import QuizWizard from './QuizWizard';
import NhusPage from './NhusPage';
import ExercisePage from './ExercisePage';
import MedicationsPage from './MedicationsPage';

function App() {
    // Helper function to replicate the NhusPage active button styling using Tailwind
    const navLinkStyles = ({ isActive }) =>
        `px-4 py-2 rounded-lg text-base font-semibold transition-colors font-sans ${
            isActive
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-slate-600 hover:bg-slate-200 hover:text-slate-900'
        }`;

    return (
        <div className="bg-slate-50 text-slate-900 min-h-screen flex flex-col">
            {/* UNIVERSAL NAVBAR (NhusPage Design) */}
            <nav className="flex items-center justify-between px-6 md:px-12 h-[68px] bg-white border-b border-gray-200 sticky top-0 z-50 w-full flex-wrap gap-2 shadow-sm">
                <Link to="/" className="font-serif text-2xl font-bold text-slate-900 tracking-wide cursor-pointer hover:text-blue-600 transition-colors">
                    KneeBot
                </Link>
                <div className="flex gap-1 flex-wrap">
                    <NavLink to="/" className={navLinkStyles}>Home</NavLink>
                    <NavLink to="/medications" className={navLinkStyles}>OTC Meds</NavLink>
                    <NavLink to="/exercise" className={navLinkStyles}>Exercises</NavLink>
                    <NavLink to="/quiz" className={navLinkStyles}>Take Quiz</NavLink>
                </div>
            </nav>

            {/* PAGE CONTENT */}
            <main className="flex-grow">
                <Routes>
                    <Route path="/" element={<NhusPage />} />
                    <Route path="/quiz" element={<QuizWizard />} />
                    <Route path="/exercise" element={<ExercisePage />} />
                    <Route path="/medications" element={<MedicationsPage />} />
                </Routes>
            </main>
        </div>
    );
}

export default App;