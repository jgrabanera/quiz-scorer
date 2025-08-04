import { FaMedal, FaUserAlt, FaStar } from "react-icons/fa";
import { useEffect, useState } from "react";
import Options from "@/Components/Options";
import { io } from "socket.io-client";
import { motion, AnimatePresence } from "framer-motion";
const socket = io("http://localhost:3001");

const getRankIcon = (index) => {
    switch (index) {
        case 0:
            return <FaMedal className="text-yellow-400" title="Gold" />;
        case 1:
            return <FaMedal className="text-gray-400" title="Silver" />;
        case 2:
            return <FaMedal className="text-amber-600" title="Bronze" />;
        case 3:
        case 4:
            return <FaStar className="text-indigo-400" title="Top 5" />;
        default:
            return null;
    }
};

const Leaderboard = () => {
    const [leaderboards, setLeaderboards] = useState([]);
    const [isFinal, setIsFinal] = useState(0);
    const stages = [
        {
            value: 0,
            label: "Semi Finals",
        },
        {
            value: 1,
            label: "Finals",
        },
    ];

    useEffect(() => {
        loadLeaderBoards()
    }, [isFinal]);

    useEffect(() => {
        socket.on("chat message", (data) => {
            loadLeaderBoards()
        });

        return () => socket.off("chat message");
    }, []);

    const loadLeaderBoards = () => {
        axios.get('/load-leaderboard/' + isFinal).then(
            res => {
                setLeaderboards(res.data)
            }
        )
    }

    const handleStageChange = (e) => {
        setIsFinal(e.target.value)
    }

    return (
        <div className="max-w-3xl mx-auto p-4">
            <Options
                id="stage"
                items={stages}
                itemValue="value"
                itemName="label"
                name="stage"
                defaultValue={stages.find(dif => Number(dif.value) === Number(isFinal))?.label || "Unknown Stage"}
                onChange={handleStageChange}
            />
            <h1 className="text-3xl font-bold text-center mb-6">
                🏆 Leaderboard
            </h1>

            {/* Top 5 Section */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                <h2 className="bg-gray-100 px-6 py-3 text-lg font-semibold text-gray-700">
                    Top 5 Players
                </h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Rank
                            </th>
                            <th className="px-4 py-2 text-r text-sm font-medium text-gray-700">
                                Name
                            </th>
                            <th className="px-4 py-2 text-center text-sm font-medium text-gray-700">
                                Total Score
                            </th>
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
                                    transition={{ duration: 0.3, ease: "easeOut" }}
                                    layout
                                    className={`${index === 0
                                        ? "bg-yellow-100"
                                        : index === 1
                                            ? "bg-gray-100"
                                            : index === 2
                                                ? "bg-amber-100"
                                                : index === 3
                                                    ? "bg-green-100"
                                                    : index === 4
                                                        ? "bg-blue-100"
                                                        : "bg-white"
                                        } hover:bg-gray-50 transition-colors duration-150`}
                                >
                                    <td className="px-6 py-4 text-sm font-semibold text-gray-800">
                                        <div className="flex items-center gap-2">
                                            <span>{getRankIcon(index)}</span>
                                            <span>#{index + 1}</span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm text-gray-700">
                                        <div className="flex  items-center gap-3">
                                            <FaUserAlt className="text-gray-700 w-8 h-8 p-2  rounded-full bg-gray-300 flex items-center justify-center" />
                                            <span className="font-medium truncate">
                                                {user.name}
                                            </span>
                                        </div>
                                    </td>

                                    <td className="px-6 py-4 text-sm font-bold text-center text-gray-900">
                                        {user.total_score}
                                    </td>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </tbody>
                </table>
            </div>

            {/* Other Players Section */}
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="bg-gray-100 px-6 py-3 text-lg font-semibold text-gray-700">
                    Other Players
                </h2>
                <table className="min-w-full divide-y divide-gray-200">
                    <thead>
                        <tr className="bg-gray-50">
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                #
                            </th>
                            <th className="px-4 py-2 text-left text-sm font-medium text-gray-700">
                                Name
                            </th>
                            <th className="px-4 py-2 text-right text-sm font-medium text-gray-700">
                                Score
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {leaderboards.slice(5).map((user, index) => (
                            <tr key={user.name} className="hover:bg-gray-50">
                                <td className="px-4 py-3">{index + 6}</td>
                                <td className="px-4 py-3 flex items-center gap-2">
                                    <FaUserAlt className="text-gray-500" />
                                    {user.name}
                                </td>
                                <td className="px-4 py-3 text-right">
                                    {user.total_score}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Leaderboard;
