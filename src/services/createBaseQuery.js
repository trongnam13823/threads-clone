import { fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { setToken } from '../features/auth/authSlice';
import { API_URL } from '@/configs/paths';
import { logoutThunk } from '@/features/auth/authThunks';
import { toast } from 'sonner';

const isRefreshToken = false;
const refreshQueue = [];

export function createBaseQuery(path) {
  const rawBaseQuery = fetchBaseQuery({
    baseUrl: API_URL + path,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = getState().auth.accessToken;
      if (accessToken) headers.set('Authorization', `Bearer ${accessToken}`);
      return headers;
    },
  });

  return async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    // --- Xử lý lỗi server (5xx) ---
    if (result.error && result.error.status >= 500 && result.error.status < 600) {
      toast.error('Server đang gặp sự cố, vui lòng thử lại sau.');
      return result.error;
    }

    // --- Xử lý token hết hạn ---
    if (
      result.error &&
      result.error.status === 401 &&
      result.error.data.message.includes('expired')
    ) {
      if (isRefreshToken) {
        // nếu đang có request refresh token thì đẩy request hiện tại vào hàng đợi
        await new Promise((resolve, reject) => {
          refreshQueue.push({ resolve, reject });
        });
      } else {
        const refreshToken = api.getState().auth.refreshToken;

        // nếu không có refresh token thì logout luôn
        if (!refreshToken) {
          api.dispatch(logoutThunk());
          return;
        }

        const response = await fetch(`${API_URL}/auth/refresh`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ refresh_token: refreshToken }),
        });

        const newToken = await response.json();

        // nếu lấy token mới thành công
        if (newToken.data) {
          // lưu token mới
          api.dispatch(setToken(newToken.data));
          // thông báo cho các request trong hàng đợi tiếp tục
          refreshQueue.forEach((p) => p.resolve());
        } else {
          // thông báo lỗi cho các request trong hàng đợi
          refreshQueue.forEach((p) => p.reject());

          // refresh token thất bại thì logout
          api.dispatch(logoutThunk());
          return;
        }
      }

      refreshQueue.length = 0;

      // gọi lại api ban đầu với token mới
      result = await rawBaseQuery(args, api, extraOptions);
    }

    return result.data ?? result;
  };
}
