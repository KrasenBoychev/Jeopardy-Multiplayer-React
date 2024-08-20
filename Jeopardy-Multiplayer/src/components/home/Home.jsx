import './home.css';

export default function Home() {
    const data = ['test', 'test', 'test', 'test', 'test', 'test']

    return (
        <main>
            <div className='leaderboards'>
                <div className="leaderboard-today">
                    <p>Leaderboard Today</p>
                    <ul>
                        {data.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
                <div className="leaderboard-all-time">
                    <p>Leaderboard All Time</p>
                    <ul>
                        {data.map((item, index) => <li key={index}>{item}</li>)}
                    </ul>
                </div>
            </div>

            <div className='play-button'>
                <button>Play</button>
            </div>
        </main>
    );
}