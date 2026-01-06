import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Các văn bản dịch
const resources = {
  en: {
    translation: {
      // Menu
      menu: {
        theme: 'Theme',
        language: 'Language',
        details: 'Details',
        settings: 'Settings',
        feedBoard: 'Feed Board',
        saved: 'Saved',
        liked: 'Liked',
        reportIssue: 'Report Issue',
        logout: 'Logout',
        vietnamese: 'Vietnamese',
        english: 'English',
      },
      // Feed
      feed: {
        feedBoard: 'Feed Board',
        forYou: 'For You',
        following: 'Following',
        ghostPosts: 'Ghost Posts',
      },
      // Pin Menu
      pinMenu: {
        forYou: 'For You',
        following: 'Following',
        ghostPosts: 'Ghost Posts',
        search: 'Search',
        activity: 'Activity',
        profile: 'Profile',
      },
      // Follow
      follow: {
        follow: 'Follow',
        following: 'Following',
        unfollow: 'Unfollow',
        unfollowConfirm: 'Unfollow {{username}}?',
        cancel: 'Cancel',
        followed: 'Followed',
        unfollowed: 'Unfollowed',
        actionFailed: 'Action failed',
      },
      // Post Menu
      postMenu: {
        save: 'Save',
        unsave: 'Unsave',
        notInterested: 'Not Interested',
        turnOffNotifications: 'Turn Off Notifications',
        restrict: 'Restrict',
        block: 'Block',
        report: 'Report',
        edit: 'Edit',
        delete: 'Delete',
        copyLink: 'Copy Link',
        deleteConfirm: 'Delete post?',
        deleteWarning: 'If you delete this post, you will not be able to recover it.',
        cancel: 'Cancel',
        deleted: 'Deleted',
        deleteError: 'Error deleting post',
        reported: 'Report sent',
        reportError: 'Error sending report',
        reportTitle: 'Why are you reporting this post?',
        reportDescription:
          "Your report will be anonymous. If someone is in danger, don't hesitate to contact local emergency services immediately.",
        reportReasons: {
          notLike: "I just don't like this content",
          bullying: 'Bullying or unwanted contact',
          selfHarm: 'Suicide, self-injury or eating disorders',
          violence: 'Violence, hatred or exploitation',
          restricted: 'Selling or advertising restricted items',
          nudity: 'Nudity or sexual activity',
          spam: 'Fraud, scams or spam',
          falseInfo: 'False information',
          intellectualProperty: 'Intellectual property',
        },
        additionalDescription: 'Additional description (optional)',
        send: 'Send',
      },
      // Auth
      auth: {
        login: 'Login',
        register: 'Register',
        logout: 'Logout',
        username: 'Username',
        email: 'Email',
        password: 'Password',
        newPassword: 'New Password',
        confirmPassword: 'Confirm Password',
        usernameOrEmail: 'Username or email',
        forgotPassword: 'Forgot Password?',
        resetPassword: 'Reset Password',
        createNewPassword: 'Create New Password',
        forgotPasswordTitle: 'Forgot Password',
        forgotPasswordDescription: 'Enter your email to receive a password reset link',
        emailSent: 'Email Sent',
        resetPasswordLinkSent: 'Password reset link has been sent to your email.',
        goToLogin: 'Go to login page',
        goToLoginLink: 'login',
        noAccount: "Don't have an account?",
        haveAccount: 'Already have an account?',
        loginError: 'Incorrect login information',
        registerSuccess: 'Registration successful',
        registerError: 'Registration failed',
        verifyEmail: 'Verify Email',
        verifyEmailDescription:
          'We have sent a verification link to your email.\nPlease check your email to verify your account.',
        resend: 'Resend',
        verificationEmailSent: 'Verification email sent successfully',
        cannotSendVerification: 'Unable to send verification email. Please try again later.',
        verifying: 'Verifying...',
        verificationSuccess: 'Verification successful',
        verificationFailed: 'Verification failed',
        verificationSuccessMessage:
          'Your email has been verified.\nYou can now use all system features.',
        verificationFailedMessage: 'The link has expired or is invalid.',
        goToLoginPage: 'Go to login page',
        accountVerified: 'Account verified successfully, please login!',
        newPasswordCreated: 'New password created successfully, please login!',
        validating: 'Validating...',
        pleaseWait: 'Please wait a moment',
        validationFailed: 'Validation failed',
        linkExpired: 'The link has expired or is invalid.',
        goToForgotPassword: 'Go to forgot password page',
        resetTokenInvalid: 'Invalid password reset link',
        resetTokenExpired: 'Password reset link is invalid or has expired',
      },
      // Validation
      validation: {
        usernameRequired: 'Username or Email cannot be empty',
        passwordRequired: 'Password cannot be empty',
        emailInvalid: 'Invalid email',
        passwordMinLength: 'Password must be at least 8 characters',
        usernameMinLength: 'Username must be at least 3 characters',
        usernamePattern:
          'Username can only contain letters, numbers, hyphens (-) and underscores (_)',
        usernameExists: 'Username already exists',
        emailExists: 'Email already exists',
        passwordMismatch: 'Password confirmation does not match',
      },
      // Common
      common: {
        cancel: 'Cancel',
        send: 'Send',
        save: 'Save',
        delete: 'Delete',
        edit: 'Edit',
        loading: 'Loading...',
        error: 'An error occurred, please try again',
      },
      // Post Card
      postCard: {
        linkCopied: 'Link copied',
        linkCopyFailed: 'Unable to copy link',
        viewOnThreads: 'View on Threads',
      },
      // Share
      share: {
        imageCopied: 'Image copied',
        imageDownloaded: 'Image downloaded',
        embedCopied: 'Embed code copied',
        copyLink: 'Copy link',
        copyAsImage: 'Copy as image',
        getEmbedCode: 'Get embed code',
        showData: 'Show data',
        copy: 'Copy',
      },
      // Repost
      repost: {
        removed: 'Removed',
        reposted: 'Reposted',
        repostFailed: 'Repost failed',
        remove: 'Remove',
        repost: 'Repost',
        post: 'Post',
      },
      // Post Panel
      postPanel: {
        followedProfile: 'Profiles you follow',
        cannotGetFirstPostId: 'Cannot get first post ID',
        cannotGetFirstReplyId: 'Cannot get first reply ID',
        postNotFound: 'Post not found to reply',
        edited: 'Edited',
        replied: 'Replied',
        posted: 'Posted',
        newThread: 'New Thread',
        editThread: 'Edit Thread',
        replyThread: 'Reply Thread',
        addToThread: 'Add to thread',
        replyTo: 'Reply to {{username}}...',
        anyone: 'Anyone',
        yourFollowers: 'Your followers',
        profilesYouFollow: 'Profiles you follow',
        onlyWhenMentioned: 'Only when mentioned',
        whatsNew: "What's new?",
        post: 'Post',
        whatElseToSay: 'What else do you want to say...',
      },
      // Pin
      pin: {
        unpin: 'Unpin',
        pinToHome: 'Pin to home',
        forYou: 'For You',
        following: 'Following',
        ghostPosts: 'Ghost Posts',
        search: 'Search',
        activity: 'Activity',
        profile: 'Profile',
        createNewFeedBoard: 'Create new feed board',
      },
      // Profile
      profile: {
        profile: 'Profile',
        threads: 'Threads',
        replyThreads: 'Reply Threads',
        mediaFiles: 'Media Files',
        reposts: 'Reposts',
        editProfile: 'Edit Profile',
        noThreads: 'No threads yet.',
      },
      // Activity
      activity: {
        all: 'All',
        activity: 'Activity',
        follows: 'Follows',
        replyThreads: 'Reply Threads',
        mentions: 'Mentions',
        quotes: 'Quotes',
        reposts: 'Reposts',
        verified: 'Verified',
        noActivity: 'No activity yet.',
        viewActivity: 'View activity',
      },
      // Search
      search: {
        search: 'Search',
        noResults: 'No results found',
        topics: 'Topics',
        people: 'People',
        followers: 'followers',
        followSuggestions: 'Follow suggestions',
        noSuggestions: 'No suggestions yet',
        posts: 'posts',
      },
      // Empty
      empty: {
        noData: 'No data',
      },
      // Auth Register
      authRegister: {
        registerLink: 'Register',
      },
      // Post Panel Footer
      postPanelFooter: {
        replyOptions: 'Reply options',
        whoCanReply: 'Who can reply and quote',
        reviewAndApprove: 'Review and approve replies',
        post: 'Post',
        done: 'Done',
        reply: 'Reply',
      },
      // Post Panel Toast
      postPanelToast: {
        editing: 'Editing...',
        edited: 'Edited',
        editError: 'Error editing',
        replying: 'Replying...',
        replied: 'Replied',
        replyError: 'Error replying',
        posting: 'Posting...',
        posted: 'Posted',
        postError: 'Error posting',
      },
      // Quote
      quote: {
        quote: 'Quote',
      },
      // Post Detail
      postDetail: {
        top: 'Top',
        viewActivity: 'View activity',
        noReplies: 'No replies yet',
      },
      // Ghost Posts
      ghostPosts: {
        noPosts: 'No disappearing posts yet',
        description:
          'The system will store disappearing posts after 24 hours and move reply threads to messages. Only you can see who liked and replied.',
      },
      // Follow List
      followList: {
        following: 'Following',
        followers: 'Followers',
        noFollowers: 'No followers yet',
        notFollowingAnyone: 'Not following anyone',
      },
      // Home
      home: {
        noPosts: 'No posts yet',
      },
    },
  },
  vi: {
    translation: {
      // Menu
      menu: {
        theme: 'Giao diện',
        language: 'Ngôn ngữ',
        details: 'Thông tin chi tiết',
        settings: 'Cài đặt',
        feedBoard: 'Bảng feed',
        saved: 'Đã lưu',
        liked: 'Đã thích',
        reportIssue: 'Báo cáo sự cố',
        logout: 'Đăng xuất',
        vietnamese: 'Tiếng Việt',
        english: 'English',
      },
      // Feed
      feed: {
        feedBoard: 'Bảng Feed',
        forYou: 'Dành cho bạn',
        following: 'Đang theo dõi',
        ghostPosts: 'Bài viết tự hủy',
      },
      // Pin Menu
      pinMenu: {
        forYou: 'Dành cho bạn',
        following: 'Đang theo dõi',
        ghostPosts: 'Bài viết tự hủy',
        search: 'Tìm kiếm',
        activity: 'Hoạt động',
        profile: 'Trang cá nhân',
      },
      // Follow
      follow: {
        follow: 'Theo dõi',
        following: 'Đang theo dõi',
        unfollow: 'Bỏ theo dõi',
        unfollowConfirm: 'Bỏ theo dõi {{username}}?',
        cancel: 'Hủy',
        followed: 'Đã theo dõi',
        unfollowed: 'Đã bỏ theo dõi',
        actionFailed: 'Thao tác thất bại',
      },
      // Post Menu
      postMenu: {
        save: 'Lưu',
        unsave: 'Bỏ lưu',
        notInterested: 'Không quan tâm',
        turnOffNotifications: 'Tắt thông báo',
        restrict: 'Hạn chế',
        block: 'Chặn',
        report: 'Báo cáo',
        edit: 'Chỉnh sửa',
        delete: 'Xóa',
        copyLink: 'Sao chép liên kết',
        deleteConfirm: 'Xóa bài viết?',
        deleteWarning: 'Nếu xóa bài viết này, bạn sẽ không khôi phục được nữa.',
        cancel: 'Hủy',
        deleted: 'Đã xóa',
        deleteError: 'Lỗi khi xóa bài viết',
        reported: 'Đã gửi báo cáo',
        reportError: 'Lỗi khi gửi báo cáo',
        reportTitle: 'Tại sao bạn báo cáo bài viết này?',
        reportDescription:
          'Báo cáo của bạn sẽ được ẩn danh. Nếu ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy báo ngay cho dịch vụ khẩn cấp tại địa phương.',
        reportReasons: {
          notLike: 'Chỉ là tôi không thích nội dung này',
          bullying: 'Bắt nạt hoặc liên hệ theo cách không mong muốn',
          selfHarm: 'Tự tử, tự gây thương tích hoặc ăn uống thất thường',
          violence: 'Bạo lực, thù ghét hoặc bóc lột',
          restricted: 'Bán hoặc quảng cáo mặt hàng bị hạn chế',
          nudity: 'Ảnh khỏa thân hoặc hoạt động tình dục',
          spam: 'Lừa đảo, gian lận hoặc spam',
          falseInfo: 'Thông tin sai sự thật',
          intellectualProperty: 'Quyền sở hữu trí tuệ',
        },
        additionalDescription: 'Mô tả thêm (tùy chọn)',
        send: 'Gửi',
      },
      // Auth
      auth: {
        login: 'Đăng nhập',
        register: 'Đăng kí',
        logout: 'Đăng xuất',
        username: 'Tên người dùng',
        email: 'Email',
        password: 'Mật khẩu',
        newPassword: 'Mật khẩu mới',
        confirmPassword: 'Xác nhận mật khẩu',
        usernameOrEmail: 'Tên người dùng hoặc email',
        forgotPassword: 'Quên mật khẩu?',
        resetPassword: 'Đặt lại mật khẩu',
        createNewPassword: 'Tạo mật khẩu mới',
        forgotPasswordTitle: 'Quên mật khẩu',
        forgotPasswordDescription: 'Nhập email của bạn để nhận liên kết đặt lại mật khẩu',
        emailSent: 'Email đã được gửi',
        resetPasswordLinkSent: 'Liên kết đặt lại mật khẩu đã được gửi tới email của bạn.',
        goToLogin: 'Đi tới trang đăng nhập',
        goToLoginLink: 'đăng nhập',
        noAccount: 'Bạn chưa có tài khoản?',
        haveAccount: 'Bạn đã có tài khoản?',
        loginError: 'Thông tin đăng nhập không chính xác',
        registerSuccess: 'Đăng kí thành công',
        registerError: 'Đăng kí không thành công',
        verifyEmail: 'Xác thực email',
        verifyEmailDescription:
          'Chúng tôi đã gửi một liên kết xác thực tới email của bạn.\nVui lòng kiểm tra email để xác thực tài khoản.',
        resend: 'Gửi lại',
        verificationEmailSent: 'Email xác thực đã được gửi thành công',
        cannotSendVerification: 'Không thể gửi email xác thực. Vui lòng thử lại sau.',
        verifying: 'Đang xác thực...',
        verificationSuccess: 'Xác thực thành công',
        verificationFailed: 'Xác thực thất bại',
        verificationSuccessMessage:
          'Email của bạn đã được xác thực.\nBây giờ bạn có thể sử dụng đầy đủ các chức năng của hệ thống.',
        verificationFailedMessage: 'Liên kết đã hết hạn hoặc không hợp lệ.',
        goToLoginPage: 'Đi tới trang đăng nhập',
        accountVerified: 'Đã xác minh tài khoản thành công, vui lòng đăng nhập!',
        newPasswordCreated: 'Tạo mật khẩu mới thành công, vui lòng đăng nhập!',
        validating: 'Đang xác thực...',
        pleaseWait: 'Vui lòng chờ trong giây lát',
        validationFailed: 'Xác thực thất bại',
        linkExpired: 'Liên kết đã hết hạn hoặc không hợp lệ.',
        goToForgotPassword: 'Đi tới trang quên mật khẩu',
        resetTokenInvalid: 'Link đặt lại mật khẩu không hợp lệ',
        resetTokenExpired: 'Link đặt lại mật khẩu không hợp lệ hoặc đã hết hạn',
      },
      // Validation
      validation: {
        usernameRequired: 'Tên người dùng hoặc Email không được để trống',
        passwordRequired: 'Mật khẩu không được để trống',
        emailInvalid: 'Email không hợp lệ',
        passwordMinLength: 'Mật khẩu tối thiểu 8 ký tự',
        usernameMinLength: 'Tên người dùng tối thiểu 3 ký tự',
        usernamePattern:
          'Tên người dùng chỉ được chứa chữ cái, số, dấu gạch ngang (-) và gạch dưới (_)',
        usernameExists: 'Tên người dùng đã tồn tại',
        emailExists: 'Email người dùng đã tồn tại',
        passwordMismatch: 'Xác nhận mật khẩu không khớp',
      },
      // Common
      common: {
        cancel: 'Hủy',
        send: 'Gửi',
        save: 'Lưu',
        delete: 'Xóa',
        edit: 'Chỉnh sửa',
        loading: 'Đang tải...',
        error: 'Có lỗi xảy ra, vui lòng thử lại',
      },
      // Post Card
      postCard: {
        linkCopied: 'Đã sao chép liên kết',
        linkCopyFailed: 'Không thể sao chép liên kết',
        viewOnThreads: 'Xem trên Threads',
      },
      // Share
      share: {
        imageCopied: 'Đã sao chép hình ảnh',
        imageDownloaded: 'Đã tải hình ảnh',
        embedCopied: 'Đã sao chép mã nhúng',
        copyLink: 'Sao chép liên kết',
        copyAsImage: 'Sao chép dưới dạng hình ảnh',
        getEmbedCode: 'Lấy mã nhúng',
        showData: 'Hiển thị số liệu',
        copy: 'Sao chép',
      },
      // Repost
      repost: {
        removed: 'Đã gỡ',
        reposted: 'Đã đăng lại',
        repostFailed: 'Đăng lại thất bại',
        remove: 'Gỡ',
        repost: 'Đăng lại',
        post: 'Đăng',
      },
      // Post Panel
      postPanel: {
        followedProfile: 'Trang cá nhân mà bạn theo dõi',
        cannotGetFirstPostId: 'Không thể lấy ID của post đầu tiên',
        cannotGetFirstReplyId: 'Không thể lấy ID của reply đầu tiên',
        postNotFound: 'Không tìm thấy post để trả lời',
        edited: 'Đã chỉnh sửa',
        replied: 'Đã trả lời',
        posted: 'Đã đăng',
        newThread: 'Thread mới',
        editThread: 'Thread chỉnh sửa',
        replyThread: 'Thread trả lời',
        addToThread: 'Thêm vào thread',
        replyTo: 'Trả lời {{username}}...',
        anyone: 'Bất kỳ ai',
        yourFollowers: 'Người theo dõi của bạn',
        profilesYouFollow: 'Trang cá nhân mà bạn theo dõi',
        onlyWhenMentioned: 'Chỉ khi được nhắc đến',
        whatsNew: 'Có gì mới?',
        post: 'Đăng',
        whatElseToSay: 'Bạn nói gì thêm đi...',
      },
      // Pin
      pin: {
        unpin: 'Bỏ ghim',
        pinToHome: 'Ghim lên trang chủ',
        forYou: 'Dành cho bạn',
        following: 'Đang theo dõi',
        ghostPosts: 'Bài viết tự hủy',
        search: 'Tìm kiếm',
        activity: 'Hoạt động',
        profile: 'Trang cá nhân',
        createNewFeedBoard: 'Tạo bảng feed mới',
      },
      // Profile
      profile: {
        profile: 'Trang cá nhân',
        threads: 'Threads',
        replyThreads: 'Thread trả lời',
        mediaFiles: 'File phương tiện',
        reposts: 'Bài đăng lại',
        editProfile: 'Chỉnh sửa trang cá nhân',
        noThreads: 'Chưa có thread nào.',
      },
      // Activity
      activity: {
        all: 'Tất cả',
        activity: 'Hoạt động',
        follows: 'Lượt theo dõi',
        replyThreads: 'Thread trả lời',
        mentions: 'Lượt nhắc',
        quotes: 'Lượt trích dẫn',
        reposts: 'Bài đăng lại',
        verified: 'Đã xác minh',
        noActivity: 'Chưa có hoạt động nào.',
        viewActivity: 'Xem hoạt động',
      },
      // Search
      search: {
        search: 'Tìm kiếm',
        noResults: 'Không tìm thấy kết quả nào',
        topics: 'Chủ đề',
        people: 'Mọi người',
        followers: 'người theo dõi',
        followSuggestions: 'Gợi ý theo dõi',
        noSuggestions: 'Chưa có gợi ý nào',
        posts: 'bài viết',
      },
      // Empty
      empty: {
        noData: 'Không có dữ liệu',
      },
      // Auth Register
      authRegister: {
        registerLink: 'Đăng ký',
      },
      // Post Panel Footer
      postPanelFooter: {
        replyOptions: 'Các lựa chọn để kiểm soát câu trả lời',
        whoCanReply: 'Ai có thể trả lời và trích dẫn',
        reviewAndApprove: 'Xem xét và phê duyệt câu trả lời',
        post: 'Đăng',
        done: 'Xong',
        reply: 'Trả lời',
      },
      // Post Panel Toast
      postPanelToast: {
        editing: 'Đang chỉnh sửa...',
        edited: 'Đã chỉnh sửa',
        editError: 'Lỗi khi chỉnh sửa',
        replying: 'Đang trả lời...',
        replied: 'Đã trả lời',
        replyError: 'Lỗi khi trả lời',
        posting: 'Đang đăng...',
        posted: 'Đã đăng',
        postError: 'Lỗi khi đăng',
      },
      // Quote
      quote: {
        quote: 'Trích dẫn',
      },
      // Post Detail
      postDetail: {
        top: 'Hàng đầu',
        viewActivity: 'Xem hoạt động',
        noReplies: 'Chưa có phản hồi nào',
      },
      // Ghost Posts
      ghostPosts: {
        noPosts: 'Chưa có bài viết bài viết tự biến mất nào',
        description:
          'Hệ thống sẽ lưu trữ bài viết tự hủy sau 24 giờ và chuyển thread trả lời vào tin nhắn. Chỉ mình bạn xem được ai đã thích và trả lời.',
      },
      // Follow List
      followList: {
        following: 'Đang theo dõi',
        followers: 'Người theo dõi',
        noFollowers: 'Chưa có người theo dõi',
        notFollowingAnyone: 'Chưa theo dõi ai',
      },
      // Home
      home: {
        noPosts: 'Chưa có bài viết nào',
      },
    },
  },
};

// Lấy ngôn ngữ từ localStorage hoặc dùng mặc định
const getStoredLanguage = () => {
  const stored = localStorage.getItem('i18nextLng');
  if (stored && (stored === 'en' || stored === 'vi')) {
    return stored;
  }
  return 'en'; // ngôn ngữ mặc định
};

i18n
  .use(initReactI18next) // kết nối i18next với react-i18next
  .init({
    resources, // dữ liệu dịch
    lng: getStoredLanguage(), // ngôn ngữ từ localStorage hoặc mặc định
    interpolation: {
      escapeValue: false, // React đã an toàn khỏi XSS
    },
  });

export default i18n;
