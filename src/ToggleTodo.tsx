import Button from "./Button";
import { FaCirclePlus } from "react-icons/fa6";

type ToggleTodo = {
  onClick: () => void;
};

export default function ToggleTodo({ onClick }: ToggleTodo) {
  return (
    <div className="text-center mb-0">
      <Button onClick={onClick}>
        <FaCirclePlus color="#6c63ff" size={35} />
      </Button>
    </div>
  );
}
