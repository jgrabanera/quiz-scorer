import { FaMedal, FaUserAlt, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Options from "@/Components/Options";
import { io } from "socket.io-client";
import ApplicationLogo from "@/Components/ApplicationLogo";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "@inertiajs/react";
const socket = io("http://10.10.141.77:3001");

const getRankIcon = (index) => {
    switch (index) {
        case 0: return <FaMedal className="text-yellow-400" title="Gold" />;
        case 1: return <FaMedal className="text-gray-400" title="Silver" />;
        case 2: return <FaMedal className="text-amber-600" title="Bronze" />;
        case 3:
        case 4: return <FaStar className="text-indigo-400" title="Top 5" />;
        default: return null;
    }
};

const Leaderboard = () => {
    const [leaderboards, setLeaderboards] = useState([]);
    const [isFinal, setIsFinal] = useState(0);
    const stages = [
        { value: 0, label: "Semi Finals" },
        { value: 1, label: "Finals" },
    ];

    useEffect(() => { loadLeaderBoards(); }, [isFinal]);

    useEffect(() => {
        socket.on("chat message", loadLeaderBoards);
        return () => socket.off("chat message");
    }, []);

    const loadLeaderBoards = () => {
        axios.get(`/load-leaderboard/${isFinal}`).then((res) => {
            setLeaderboards(res.data);
        });
    };

    const handleStageChange = (e) => {
        setIsFinal(e.target.value);
    };

    return (
        <div className="w-full bg-blue-200 min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-2 ">
                <div className="flex justify-between gap-3">
                    <Link href="/dashboard">
                        <div className="bg-blue-500 rounded-lg shadow-md px-4 py-2 w-fit text-white font-bold">
                            Back
                        </div>
                    </Link>
                    <Options
                        id="stage"
                        items={stages}
                        itemValue="value"
                        itemName="label"
                        name="stage"
                        defaultValue={stages.find(dif => Number(dif.value) === Number(isFinal))?.label || "Unknown Stage"}
                        onChange={handleStageChange}
                    />
                </div>
                <ApplicationLogo className="w-80 mb-6 mx-auto" />

                {/* Top 5 Players */}
                <div className="bg-white rounded-md shadow-lg overflow-hidden mb-8 p-2">
                    <div className="bg-blue-500 px-6 py-4 rounded-t-md">
                        <h2 className="text-xl font-semibold text-gray-100"> 🏆 Top 5 Players</h2>
                    </div>
                    <table className="w-full divide-y divide-gray-200 text-sm">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left font-medium text-gray-700">Rank</th>
                                <th className="px-6 py-3 text-left font-medium text-gray-700">Name</th>
                                <th className="px-6 py-3 text-center font-medium text-gray-700">Score</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100">
                            <AnimatePresence>
                                {leaderboards.slice(0, 5).map((user, index) => (
                                    <motion.tr
                                        key={`${user.name}-${user.total_score}`}
                                        initial={{ opacity: 0, y: -10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        transition={{ duration: 0.3 }}
                                        layout
                                        className={`
                                        transition-all duration-150 hover:bg-gray-50
                                        ${index === 0 ? 'bg-blue-100' :
                                                index === 1 ? 'bg-yellow-100' :
                                                    index === 2 ? 'bg-green-100' :
                                                        index === 3 ? 'bg-pink-100' :
                                                            'bg-red-50'}
                                    `}
                                    >
                                        <td className="px-6 py-4 font-semibold text-gray-800">
                                            <div className="flex items-center gap-2">
                                                {getRankIcon(index)}
                                                <span className="text-lg">{index + 1}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-gray-700">
                                            <div className="flex items-center gap-3">
                                                <FaUserAlt className="text-white bg-gray-400 w-6 h-6 rounded-full p-1" />
                                                <span className=" text-sm font-medium truncate">{user.name}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-center  text-blue-600 font-extrabold text-md">
                                            {user.total_score}
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Other Players */}
                {isFinal == 0 && (
                    <div className="bg-white rounded-lg shadow-lg overflow-hidden p-2">
                        <div className="bg-gray-700 px-6 py-4">
                            <h2 className="text-lg font-semibold text-gray-50">Other Participants</h2>
                        </div>
                        <table className="w-full divide-y divide-gray-200 text-sm">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3 text-left text-gray-700 font-medium">#</th>
                                    <th className="px-4 py-3 text-left text-gray-700 font-medium">Name</th>
                                    <th className="px-4 py-3 text-right text-gray-700 font-medium">Score</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                                {leaderboards.slice(5).map((user, index) => (
                                    <tr key={user.name} className="hover:bg-gray-50">
                                        <td className="px-4 py-3">{index + 6}</td>
                                        <td className="px-4 py-3 flex items-center gap-2 text-gray-800">
                                            <FaUserAlt className="text-gray-500" />
                                            {user.name}
                                        </td>
                                        <td className="px-4 py-3 text-right text-gray-700 font-semibold">
                                            {user.total_score}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
