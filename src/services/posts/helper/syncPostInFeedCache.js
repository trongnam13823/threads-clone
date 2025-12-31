import postsApi from '../postsApi';

function syncPostInFeedCache(dispatch, getState, postId, updater) {
  const state = getState();
  const feedCache = state.postsApi.queries;

  Object.keys(feedCache).forEach((key) => {
    if (key.startsWith('getPostsFeed')) {
      dispatch(
        postsApi.util.updateQueryData('getPostsFeed', feedCache[key].originalArgs, (draft) => {
          const post = draft.data.find((p) => p.id === postId);
          if (post) updater(post);
        })
      );
    }
  });
}

export default syncPostInFeedCache;
