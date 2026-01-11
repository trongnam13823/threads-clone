/**
 * Tạo chuỗi replies tuần tự (mỗi reply reply vào reply trước đó)
 * @param {Function} replyFn - Function để tạo reply (nhận { id, content })
 * @param {Array} postsList - Danh sách posts/replies cần tạo
 * @param {number} startIndex - Index bắt đầu (thường là 1, vì item đầu tiên đã được tạo)
 * @param {number} firstItemId - ID của item đầu tiên đã được tạo
 * @returns {Promise<Array>} - Promise resolves với danh sách kết quả
 */
export async function createRepliesChain(replyFn, postsList, startIndex, firstItemId) {
  const replyPromises = [];
  let previousPostId = firstItemId;

  for (let i = startIndex; i < postsList.length; i++) {
    const replyPostData = {
      id: previousPostId,
      content: postsList[i].content,
    };

    const replyResult = await replyFn(replyPostData).unwrap();
    replyPromises.push(Promise.resolve(replyResult));

    previousPostId = replyResult.data?.id || previousPostId;
  }

  return replyPromises;
}

