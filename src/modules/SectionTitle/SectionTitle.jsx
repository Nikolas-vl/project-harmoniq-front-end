const SectionTitle = ({ children }) => {
  return (
    <h1
      style={{
        fontWeight: 700,
        fontSize: '40px',
        color: '#000',
        paddingTop: '48px',
      }}
    >
      {children}
    </h1>
  );
};

export default SectionTitle;
