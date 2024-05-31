export const CartButton = ({ text, onClick, className }) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex w-full justify-center rounded-md px-3 py-2 text-sm font-semibold shadow-sm ${className}`}>
        {text}
      </button>
    </>
  );
};
