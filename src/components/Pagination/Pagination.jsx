// components/Pagination/Pagination.jsx
const Pagination = ({ current, total, limit, onChange }) => {
  const totalPages = Math.ceil(total / limit);

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      onChange(page);
    }
  };

  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={() => handlePageChange(current - 1)}
        disabled={current === 1}
      >
        Previous
      </button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => handlePageChange(page)}
          className={current === page ? "active" : ""}
        >
          {page}
        </button>
      ))}

      <button
        onClick={() => handlePageChange(current + 1)}
        disabled={current === totalPages}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;