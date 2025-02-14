import PropTypes from "prop-types";

const Card = ({ building }) => {
  return (
    <div
      className="card"
      style={{
        backgroundImage: `url(${building.building_picture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="room-count">
        <div className="green-dot"></div>
        <>Rooms Available: {building.rooms_available}</>
      </div>
      <div className="building-name">{building.name}</div>
    </div>
  );
};

Card.propTypes = {
  building: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rooms_available: PropTypes.number.isRequired,
    building_picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default Card;
