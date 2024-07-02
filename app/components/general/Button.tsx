import { IconType } from 'react-icons';

interface ButtonProps {
  text: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  small?: boolean;
  outline?: boolean;
  disabled?: boolean;
  icon?: IconType; // IconType'ı kabul edin
}

const Button: React.FC<ButtonProps> = ({
  text,
  onClick,
  small,
  outline,
  disabled,
  icon: Icon,
}) => {
  return (
    <button
      disabled={disabled}
      className={`my-1 flex items-center justify-center rounded-lg p-3 gap-2 font-bold ${small ? "w-[200px]" : "w-full"} ${
        outline ? "border text-black" : "bg-red-500 text-white"
      }`}
      onClick={onClick}
    >
      <div className="flex items-center justify-center gap-2">
        {Icon && <Icon className="mr-2" />} {/* İkon varsa göster */}
        <span>{text}</span> {/* Metin */}
      </div>
    </button>
  );
};

export default Button;
