export const timeAgo = (dateString) => {
  const now = new Date();
  const then = new Date(dateString);
  const diff = Math.floor((now - then) / 1000); // giây

  const units = [
    { label: "y", seconds: 31536000 }, // năm
    { label: "mo", seconds: 2592000 }, // tháng
    { label: "w", seconds: 604800 }, // tuần
    { label: "d", seconds: 86400 }, // ngày
    { label: "h", seconds: 3600 }, // giờ
    { label: "m", seconds: 60 }, // phút
    { label: "s", seconds: 1 }, // giây
  ];

  for (const unit of units) {
    const count = Math.floor(diff / unit.seconds);
    if (count >= 1) return `${count}${unit.label}`;
  }

  return "just now";
};
