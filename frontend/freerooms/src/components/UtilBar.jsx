import FilterButton from "./FilterButton";
import SortButton from "./SortButton";
import SearchBar from "./SearchBar";
const UtilBar = () => {
  return (
    <div className="util-bar">
      <div className="mobile-bar">
        <SearchBar></SearchBar>
      </div>

      <FilterButton></FilterButton>
      <div className="desktop-bar">
        <SearchBar></SearchBar>
      </div>
      <SortButton></SortButton>
    </div>
  );
};

export default UtilBar;
