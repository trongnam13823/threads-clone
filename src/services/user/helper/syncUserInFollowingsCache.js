import userService from '../userService';

function togglePivotInFollowingsCache(dispatch, getState, userId) {
  const state = getState();
  const followingsCache = state.userService.queries;

  Object.keys(followingsCache).forEach((key) => {
    if (key.startsWith('getFollowings')) {
      dispatch(
        userService.util.updateQueryData(
          'getFollowings',
          followingsCache[key].originalArgs,
          (draft) => {
            const user = draft.data.find((u) => u.id === userId);
            if (user) {
              if (user.pivot) {
                // Nếu đang follow → toggle sang unfollow
                user.pivot = null;
              } else {
                // Nếu chưa follow → toggle sang follow (tạo pivot tạm)
                user.pivot = {
                  user_id: draft.user_id || 0,
                  following_id: userId,
                  created_at: new Date().toISOString(),
                };
              }
            }
          }
        )
      );
    }
  });
}

export default togglePivotInFollowingsCache;
