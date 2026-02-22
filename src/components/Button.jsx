import { Plus } from "lucide-react";

const Button = ({ name,onclick }) => {
  return (
    <button
    onClick={onclick}
      className="
        flex items-center gap-2
        bg-[#004080] hover:bg-[#00408084]
        text-white
        px-4 py-2
        rounded-lg
        font-medium
        transition
        min-w-40
      "
    >
      <Plus size={18} />
      {name}
    </button>
  );
};

export default Button;

