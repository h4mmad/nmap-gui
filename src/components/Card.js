import unlocked from './unlocked.png'
import locked from './locked.png'


const Card = ({ individualCard }) => {



    return (
        <div className="col">
            <div className="card">
                <div className="card-body">
                    <img style={{ "width": "2rem", "float": "right"}}
                        src={individualCard.state._attributes.state === "open" ? unlocked : locked}
                        alt="lock">
                    </img>
                    <h5 className="card-title">{individualCard._attributes.portid} /{individualCard.service._attributes.name}</h5>
                    <p className="card-text">status: {individualCard.state._attributes.state}</p>
                    <p className="card-text">service: {individualCard.service._attributes.name}</p>
                </div>
            </div>
        </div>

    );
}

export default Card;