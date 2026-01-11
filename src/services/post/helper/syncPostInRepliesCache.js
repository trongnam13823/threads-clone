import postService from '../postService';

function syncPostInRepliesCache(dispatch, getState, postId, updater) {
  const state = getState();
  const repliesCache = state.postService.queries;

  Object.keys(repliesCache).forEach((key) => {
    if (key.startsWith('getPostReplies')) {
      dispatch(
        postService.util.updateQueryData('getPostReplies', repliesCache[key].originalArgs, (draft) => {
          const post = draft.data.find((p) => p.id === postId);
          if (post) updater(post);
        })
      );
    }
  });
}

export default syncPostInRepliesCache;

