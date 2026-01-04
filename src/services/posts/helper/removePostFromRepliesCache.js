import postsApi from '../postsApi';

export default function removePostFromRepliesCache(dispatch, getState, postId) {
  const patchResults = [];

  Object.keys(getState().postsApi.queries).forEach((key) => {
    const queryCache = getState().postsApi.queries[key];
    if (
      queryCache &&
      queryCache.endpointName === 'getPostReplies' &&
      queryCache.status === 'fulfilled'
    ) {
      const patch = dispatch(
        postsApi.util.updateQueryData('getPostReplies', queryCache.originalArgs, (draft) => {
          draft.data = draft.data.filter((post) => post.id !== postId);
        })
      );
      patchResults.push(patch);
    }
  });

  return patchResults; // trả về để có thể undo nếu lỗi
}

