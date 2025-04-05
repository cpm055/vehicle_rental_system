import '../css/car.css'

function Car({ name, price, image }) {
    return (
        <>
            <div className="car">
                <img className="car-img" src={image}/>
                <div className="car-details">
                    <p className="car-name">{name}</p>
                    <p className="car-price">RS. {price} / Day</p>
                </div>
            </div>
        </>
    );
}

export default Car;