export const hasEmptyStringOrNoData = (obj) => {
  return Object.values(obj).some(value => {
    // Kiểm tra value là chuỗi và:
    // 1. rỗng ("")
    // 2. chỉ toàn khoảng trắng
    // 3. hoặc là null hoặc undefined
    return (
      value === null ||
      value === undefined ||
      (typeof value === 'string' && value.trim() === '')
    );
  });
}