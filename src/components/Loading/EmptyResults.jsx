function EmptyResults({ isEmpty, message = 'Không có dữ liệu' }) {
  if (!isEmpty) return null;

  return (
    <div className='flex flex-1 items-center justify-center py-10'>
      <p className='text-lg text-(--text-secondary)'>{message}</p>
    </div>
  );
}

export default EmptyResults;
