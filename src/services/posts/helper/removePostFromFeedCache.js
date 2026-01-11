import postService from '../postService';

export default function removePostFromFeedCache(dispatch, getState, postId) {
  const patchResults = [];

  Object.keys(getState().postService.queries).forEach((key) => {
    const queryCache = getState().postService.queries[key];
    if (
      queryCache &&
      queryCache.endpointName === 'getPostsFeed' &&
      queryCache.status === 'fulfilled'
    ) {
      const patch = dispatch(
        postService.util.updateQueryData('getPostsFeed', queryCache.originalArgs, (draft) => {
          draft.data = draft.data.filter((post) => post.id !== postId);
        })
      );
      patchResults.push(patch);
    }
  });

  return patchResults; // trả về để có thể undo nếu lỗi
}
