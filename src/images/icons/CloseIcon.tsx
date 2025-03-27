export const CloseIcon = ({ onClick = () => {} }: { onClick?: () => void }) => {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="mt-1"
    >
      <path
        d="M12 0.768914L11.2312 0L6.00009 5.2311L0.768734 0L0 0.768914L5.23136 6.00001L0 11.2311L0.768734 12L6.00009 6.76893L11.2312 12L12 11.2311L6.7689 6.00001L12 0.768914Z"
        fill="#C4C4C4"
      />
    </svg>
  );
};
