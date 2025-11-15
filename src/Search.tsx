import { CiSearch } from "react-icons/ci";
import Button from "./Button";

export default function Search() {
  return (
    <div className="search-container">
      <input type="text" name="" id="" placeholder="Search note..." />
      <Button>
        <CiSearch size={25} color="#6C63FF" />
      </Button>
    </div>
  );
}
