import "./search-box.styles.css";

const SearchBox = ({ onChangeHandler, placeholder, className }) => {
  //const { onChangeHandler, placeholder, className } = this.props;
  return (
    <input
      className={`search-box ${className}`}
      type="search"
      placeholder={placeholder}
      onChange={onChangeHandler}
      //it's attached to the class itself so callback with *this.* keyword
    />
  );
};

export default SearchBox;
