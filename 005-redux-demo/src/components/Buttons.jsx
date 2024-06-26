export const PrimaryButton = ({ text, onClick, className }) => {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={`inline-flex justify-center px-3 py-2 text-xs font-bold font-inter uppercase shadow-sm select-none transition-all disabled:opacity-50 disabled:pointer-events-none shadow-gray-900/10 hover:shadow-lg focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none ${className}`}>
        {text}
      </button>
    </>
  );
};

export const FormButton = ({text, onClick, className}) => {
  return (
    <>
      <button
        type="submit"
        onClick={onClick}
        className={`flex items-center justify-center rounded-md border border-transparent px-8 py-3 text-base font-medium focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 ${className}`}>
        {text}
      </button>
    </>
  );
};
