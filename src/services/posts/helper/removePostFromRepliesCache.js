import postService from '../postService';

export default function removePostFromRepliesCache(dispatch, getState, postId) {
  const patchResults = [];

  Object.keys(getState().postService.queries).forEach((key) => {
    const queryCache = getState().postService.queries[key];
    if (
      queryCache &&
      queryCache.endpointName === 'getPostReplies' &&
      queryCache.status === 'fulfilled'
    ) {
      const patch = dispatch(
        postService.util.updateQueryData('getPostReplies', queryCache.originalArgs, (draft) => {
          draft.data = draft.data.filter((post) => post.id !== postId);
        })
      );
      patchResults.push(patch);
    }
  });

  return patchResults; // trả về để có thể undo nếu lỗi
}

