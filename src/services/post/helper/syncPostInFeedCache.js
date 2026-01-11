import postService from '../postService';

function syncPostInFeedCache(dispatch, getState, postId, updater) {
  const state = getState();
  const feedCache = state.postService.queries;

  Object.keys(feedCache).forEach((key) => {
    if (key.startsWith('getPostsFeed')) {
      dispatch(
        postService.util.updateQueryData('getPostsFeed', feedCache[key].originalArgs, (draft) => {
          const post = draft.data.find((p) => p.id === postId);
          if (post) updater(post);
        })
      );
    }
  });
}

export default syncPostInFeedCache;
