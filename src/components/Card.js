import unlocked from './unlocked.png'
import locked from './locked.png'


const Card = ({ individualCard }) => {



    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <img style={{ "width": "2rem", "float": "right"}}
                        src={individualCard.status === "open" ? unlocked : locked}
                        alt="lock">
                    </img>
                    <h5 className="card-title">{individualCard.port}</h5>
                    <p className="card-text">status: {individualCard.status}</p>
                    <p className="card-text">service: {individualCard.service}</p>
                </div>
            </div>
        </div>

    );
}

export default Card;