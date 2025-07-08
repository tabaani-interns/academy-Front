interface PointsBarProps {
    points: number;
    totalPoints: number;
    days: number;
    ticksCount?: number; // how many rectangular ticks inside the bar
}

export default function PointsBar({ points, totalPoints, days, ticksCount = 20 }: PointsBarProps) {
    const percentage = (points / totalPoints) * 100;

    return (
        <div className="w-full max-w-md p-4 rounded-lg">
            <div className="relative w-full h-4 rounded-full   overflow-hidden">

                 <div className="absolute top-0 left-0 w-full h-1 flex justify-between items-center px-1 pointer-events-none">
                    {Array.from({ length: ticksCount }).map((_, i) => (
                        <div
                            key={i}
                            className="rounded-sm bg-gray-300  "
                            style={{
                                width: '15px',
                                height: '5px',
                            }}
                        />
                    ))}
                </div>
                <div
                    className="absolute top-0 left-0 h-1 rounded-full"
                    style={{
                        width: `${percentage}%`,
                        background: "linear-gradient(to right, #fff1e0, #87ffbe)",
                    }}
                />
                <div
                    className="absolute rounded-full bg-orange-500"
                    style={{
                        top: '50%',
                        left: `${percentage}%`,
                        width: '12px',
                        height: '12px',
                        transform: 'translate(-85%, -85%)',
                    }}
                />


            </div>

            <div className="flex justify-between text-gray-800 mt-2">
                <span>Points : {points} / {totalPoints}</span>
                <span>Days : {days}</span>
            </div>

        </div>
    );
}
