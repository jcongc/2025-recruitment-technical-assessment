import PropTypes from "prop-types";

const MobileCard = ({ building }) => {
  return (
    <div
      className="mobile-card"
      style={{
        backgroundImage: `url(${building.building_picture})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <p className="mobile-name">{building.name}</p>
      <div className="mobile-count">
        <div className="green-dot"></div>
        <>
          {building.rooms_available} / {building.rooms_available}
        </>
      </div>
    </div>
  );
};

MobileCard.propTypes = {
  building: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rooms_available: PropTypes.number.isRequired,
    building_picture: PropTypes.string.isRequired,
  }).isRequired,
};

export default MobileCard;
