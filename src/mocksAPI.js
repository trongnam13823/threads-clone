export const userInfo = {
  username: "namtran138",
  avatar: "https://github.com/shadcn.png",
  fullname: "Tran Trong Nam",
  followers: "1000",
};

export const allPosts = [
  {
    id: "1",
    author: {
      username: "shorty",
      avatar: "https://i.pravatar.cc/36?img=1",
      fullname: "Shorty Name",
    },
    createdAt: "2025-11-09T12:00:00Z",
    content: `<p>Chỉ một dòng thôi: <b>Hôm nay thật tuyệt</b> ✨</p>`,
    stats: { likes: 12, comments: 0, reposts: 0, shares: 1 },
  },
  {
    id: "2",
    author: {
      username: "coderjoe",
      avatar: "https://i.pravatar.cc/36?img=2",
      fullname: "Coder Joe",
    },
    createdAt: "2025-11-09T11:40:00Z",
    content: `
      <p><b>Tip:</b> <i>Write tests before you write features.</i> 🚀</p>
      <p>Giữ code sạch, giữ tâm bình.</p>
    `,
    stats: { likes: 48, comments: 6, reposts: 3, shares: 2 },
  },
  {
    id: "3",
    author: {
      username: "anh.photo",
      avatar: "https://i.pravatar.cc/36?img=3",
      fullname: "Anh Photo",
    },
    createdAt: "2025-11-09T11:00:00Z",
    content: `
      <p><b>📷 Today's frame:</b></p>
      <p><img src="https://picsum.photos/seed/1/400/200" alt="photo" style="max-width:100%; border-radius:8px;" /></p>
      <p><i>Khoảnh khắc vô tình, cảm xúc vẹn nguyên.</i></p>
    `,
    stats: { likes: 132, comments: 18, reposts: 11, shares: 22 },
  },
  {
    id: "4",
    author: {
      username: "poet.soul",
      avatar: "https://i.pravatar.cc/36?img=4",
      fullname: "Poet Soul",
    },
    createdAt: "2025-11-09T09:00:00Z",
    content: `
      <p>Đêm nay muốn viết:</p>
      <blockquote>“Có những nỗi nhớ không cần lý do, chỉ cần một bản nhạc.”</blockquote>
      <p><i>— Viết cho chính mình.</i></p>
    `,
    stats: { likes: 210, comments: 34, reposts: 9, shares: 30 },
  },
  {
    id: "5",
    author: {
      username: "travelbug",
      avatar: "https://i.pravatar.cc/36?img=5",
      fullname: "Travel Bug",
    },
    createdAt: "2025-11-09T06:00:00Z",
    content: `
      <p><b>Checklist cho chuyến du lịch 2 ngày:</b></p>
      <ul>
        <li>🧳 Passport / ID</li>
        <li>📷 Máy ảnh & pin</li>
        <li>🍞 Snack & nước</li>
      </ul>
      <p><i>Nhỏ gọn, vẫn vui.</i></p>
    `,
    stats: { likes: 87, comments: 12, reposts: 5, shares: 9 },
  },
  {
    id: "6",
    author: {
      username: "devlog",
      avatar: "https://i.pravatar.cc/36?img=6",
      fullname: "Dev Log",
    },
    createdAt: "2025-11-09T04:00:00Z",
    content: `
      <p><b>Deploy checklist</b></p>
      <ol>
        <li>Run tests</li>
        <li>Build</li>
        <li>Smoke test on staging</li>
      </ol>
      <p><i>Thực tế: thường là "run tests" → coffee → panic → fix → deploy.</i></p>
    `,
    stats: { likes: 99, comments: 20, reposts: 7, shares: 6 },
  },
  {
    id: "7",
    author: {
      username: "minimalista",
      avatar: "https://i.pravatar.cc/36?img=7",
      fullname: "Minimalista",
    },
    createdAt: "2025-11-09T02:00:00Z",
    content: `<p><i>Less is more.</i> Bớt một chút, bạn sẽ thấy dư dả hơn.</p>`,
    stats: { likes: 178, comments: 15, reposts: 4, shares: 12 },
  },
  {
    id: "8",
    author: {
      username: "foodie.local",
      avatar: "https://i.pravatar.cc/36?img=8",
      fullname: "Foodie Local",
    },
    createdAt: "2025-11-09T00:00:00Z",
    content: `
      <p><b>Hôm nay ăn:</b> Bún riêu bày tận miệng 🍜</p>
      <p><i>Góc phố nhỏ, nhưng vị thì lớn.</i></p>
      <p>Đính kèm: <img src="https://picsum.photos/seed/2/300/180" alt="food" style="max-width:100%; border-radius:6px;" /></p>
    `,
    stats: { likes: 254, comments: 48, reposts: 10, shares: 26 },
  },
  {
    id: "9",
    author: {
      username: "late.night",
      avatar: "https://i.pravatar.cc/36?img=9",
      fullname: "Late Night",
    },
    createdAt: "2025-11-08T22:00:00Z",
    content: `
      <p>Một chuỗi dài suy nghĩ:</p>
      <p>1. Mọi thứ bắt đầu bằng câu hỏi.</p>
      <p>2. Câu trả lời đôi khi chỉ là thử — <i>và thử lại</i>.</p>
      <p>3. Và rồi bạn sẽ nhìn lại và nói: "Ồ, mình đã làm được."</p>
      <p><b>Hãy kiên trì.</b></p>
    `,
    stats: { likes: 73, comments: 9, reposts: 1, shares: 3 },
  },
  {
    id: "10",
    author: {
      username: "sci.fun",
      avatar: "https://i.pravatar.cc/36?img=10",
      fullname: "Sci Fun",
    },
    createdAt: "2025-11-08T12:00:00Z",
    content: `
      <p><b>Fascinating fact:</b> Octopuses have three hearts. ❤️❤️❤️</p>
      <p><i>Biology is wild.</i></p>
    `,
    stats: { likes: 401, comments: 60, reposts: 32, shares: 44 },
  },
  {
    id: "11",
    author: {
      username: "rant_corner",
      avatar: "https://i.pravatar.cc/36?img=11",
      fullname: "Rant Corner",
    },
    createdAt: "2025-11-08T11:00:00Z",
    content: `
      <p>Tối qua laptop tự tắt giữa chừng.</p>
      <p><b>Thì ra:</b> quên save file — 2 giờ làm lại.</p>
      <p><i>Lesson learned: save early, save often.</i></p>
    `,
    stats: { likes: 54, comments: 11, reposts: 2, shares: 1 },
  },
  {
    id: "12",
    author: {
      username: "longform.writer",
      avatar: "https://i.pravatar.cc/36?img=12",
      fullname: "Longform Writer",
    },
    createdAt: "2025-11-07T12:00:00Z",
    content: `
      <p><b>Về việc trưởng thành:</b></p>
      <p>Trưởng thành không như trong phim. Không có một cú huých đúng lúc, chỉ có hàng ngàn lần bạn phải lựa chọn.</p>
      <p><i>Bạn học cách nói không, bạn học cách lắng nghe, và bạn học cách tha thứ.</i></p>
      <p>Đôi khi cái giá của trưởng thành là biết buông những điều vẫn còn yêu.</p>
      <p>Nhưng bù lại: bạn tìm thấy một phiên bản mạnh mẽ hơn của chính mình.</p>
    `,
    stats: { likes: 620, comments: 102, reposts: 28, shares: 80 },
  },
  {
    id: "13",
    author: {
      username: "ux_tips",
      avatar: "https://i.pravatar.cc/36?img=13",
      fullname: "UX Tips",
    },
    createdAt: "2025-11-07T10:00:00Z",
    content: `
      <p><b>Microcopy matters.</b></p>
      <p>Thay vì "Submit", thử "Save draft" — người dùng sẽ cảm thấy yên tâm hơn.</p>
      <p><i>Small words, big difference.</i></p>
    `,
    stats: { likes: 142, comments: 12, reposts: 9, shares: 7 },
  },
  {
    id: "14",
    author: {
      username: "funnybot",
      avatar: "https://i.pravatar.cc/36?img=14",
      fullname: "Funny Bot",
    },
    createdAt: "2025-11-06T12:00:00Z",
    content: `
      <p>Hỏi: Tại sao dev thích cà phê?</p>
      <p>Đáp: Vì bug <b>không</b> fix được bằng nước lọc 😅</p>
    `,
    stats: { likes: 999, comments: 210, reposts: 420, shares: 300 },
  },
  {
    id: "15",
    author: {
      username: "mind.trainer",
      avatar: "https://i.pravatar.cc/36?img=15",
      fullname: "Mind Trainer",
    },
    createdAt: "2025-11-05T12:00:00Z",
    content: `
      <p><b>7 phút buổi sáng:</b></p>
      <ol>
        <li>Uống nước</li>
        <li>Hít thở 1 phút</li>
        <li>Viết 1 dòng biết ơn</li>
        <li>Duỗi 2 phút</li>
        <li>Đặt 1 mục tiêu nhỏ</li>
      </ol>
      <p><i>Thói quen bé, thay đổi lớn.</i></p>
    `,
    stats: { likes: 311, comments: 44, reposts: 25, shares: 33 },
  },
  {
    id: "16",
    author: {
      username: "street.notes",
      avatar: "https://i.pravatar.cc/36?img=16",
      fullname: "Street Notes",
    },
    createdAt: "2025-11-04T12:00:00Z",
    content: `
      <p>Gặp một cụ già cho bánh mì hôm trước.</p>
      <p><i>Người ta nói: "Con, ăn cho no. Đừng vội." — Lời nhỏ mà ấm.</i></p>
      <p>Những câu chuyện nhỏ làm ngày bớt cô đơn.</p>
    `,
    stats: { likes: 189, comments: 22, reposts: 6, shares: 11 },
  },
  {
    id: "17",
    author: {
      username: "chef.secret",
      avatar: "https://i.pravatar.cc/36?img=17",
      fullname: "Chef Secret",
    },
    createdAt: "2025-11-03T12:00:00Z",
    content: `
      <p><b>Recipe mini:</b> Mì xào tỏi ớt trong 10 phút</p>
      <p>1. Luộc mì — để ráo</p>
      <p>2. Phi tỏi, cho ớt băm</p>
      <p>3. Xào mì với nước mắm, chút đường</p>
      <p><i>Hoàn hảo cho đêm đói.</i> 🍜</p>
    `,
    stats: { likes: 272, comments: 38, reposts: 15, shares: 20 },
  },
  {
    id: "18",
    author: {
      username: "tinyphilosophy",
      avatar: "https://i.pravatar.cc/36?img=18",
      fullname: "Tiny Philosophy",
    },
    createdAt: "2025-11-02T12:00:00Z",
    content: `
      <p><b>Triết lý tí hon:</b></p>
      <p><i>Hạnh phúc không phải điểm đến, mà là cách bạn bước đi giữa những ngày bình thường.</i></p>
      <p>Đừng chờ dịp, hãy tạo dịp cho mình.</p>
    `,
    stats: { likes: 401, comments: 71, reposts: 23, shares: 66 },
  },
  {
    id: "19",
    author: {
      username: "longpost.author",
      avatar: "https://i.pravatar.cc/36?img=19",
      fullname: "Longpost Author",
    },
    createdAt: "2025-10-26T12:00:00Z",
    content: `
      <p><b>Chuyện dài:</b></p>
      <p>Tôi bắt đầu viết khi 16 tuổi, với một cây bút hết mực và một quyển vở rách. Viết để giấu mình, viết để tìm lại mình.</p>
      <p>Khi lớn hơn, tôi nhận ra: chữ không mất đi, chữ chỉ chuyển thành ký ức người khác.</p>
      <p>Đó là món quà lớn nhất — được để lại dấu ấn, dù nhỏ.</p>
      <p><i>Nếu bạn có một câu chuyện — kể đi.</i></p>
      <p>— kết thúc không hẳn là một dấu chấm mà có khi là một dấu phẩy, để tiếp tục.</p>
    `,
    stats: { likes: 820, comments: 144, reposts: 58, shares: 102 },
  },
  {
    id: "20",
    author: {
      username: "emoji.king",
      avatar: "https://i.pravatar.cc/36?img=20",
      fullname: "Emoji King",
    },
    createdAt: "2025-10-19T12:00:00Z",
    content: `<p>❤️❤️❤️</p>`,
    stats: { likes: 1000, comments: 5, reposts: 0, shares: 0 },
  },
];

export const followingPosts = [
  {
    id: "101",
    author: {
      username: "artlover",
      avatar: "https://i.pravatar.cc/36?img=21",
      fullname: "Art Lover",
    },
    createdAt: "2025-11-09T14:00:00Z",
    content: `
      <p><b>Sketch of the day:</b></p>
      <p><img src="https://picsum.photos/seed/3/400/200" alt="sketch" style="max-width:100%; border-radius:8px;" /></p>
      <p><i>Mỗi nét bút đều kể câu chuyện riêng.</i></p>
    `,
    stats: { likes: 152, comments: 12, reposts: 4, shares: 6 },
  },
  {
    id: "102",
    author: {
      username: "bookworm",
      avatar: "https://i.pravatar.cc/36?img=22",
      fullname: "Book Worm",
    },
    createdAt: "2025-11-09T13:30:00Z",
    content: `
      <p>Đang đọc: <b>"Atomic Habits"</b> ✨</p>
      <p><i>Mỗi thói quen nhỏ đều góp phần tạo nên bạn lớn.</i></p>
    `,
    stats: { likes: 87, comments: 5, reposts: 2, shares: 1 },
  },
  {
    id: "103",
    author: {
      username: "dailycoder",
      avatar: "https://i.pravatar.cc/36?img=23",
      fullname: "Daily Coder",
    },
    createdAt: "2025-11-09T12:45:00Z",
    content: `
      <p>Snippet hôm nay:</p>
      <pre><code>const sum = (a, b) => a + b;</code></pre>
      <p><i>Nhỏ gọn nhưng hiệu quả.</i></p>
    `,
    stats: { likes: 198, comments: 22, reposts: 9, shares: 5 },
  },
  {
    id: "104",
    author: {
      username: "music.junkie",
      avatar: "https://i.pravatar.cc/36?img=24",
      fullname: "Music Junkie",
    },
    createdAt: "2025-11-09T12:00:00Z",
    content: `
      <p>Playlist buổi sáng: <b>Chill Vibes</b> 🎵</p>
      <ul>
        <li>Track 1: Calm Waves</li>
        <li>Track 2: Early Sun</li>
        <li>Track 3: Coffee Mood</li>
      </ul>
    `,
    stats: { likes: 245, comments: 30, reposts: 12, shares: 15 },
  },
  {
    id: "105",
    author: {
      username: "fitnessguru",
      avatar: "https://i.pravatar.cc/36?img=25",
      fullname: "Fitness Guru",
    },
    createdAt: "2025-11-09T11:00:00Z",
    content: `
      <p><b>Workout tip:</b> 10 phút plank mỗi sáng 🏋️‍♂️</p>
      <p><i>Khiến core khỏe mạnh, tinh thần sảng khoái.</i></p>
    `,
    stats: { likes: 312, comments: 40, reposts: 18, shares: 20 },
  },
  {
    id: "106",
    author: {
      username: "mindful.moments",
      avatar: "https://i.pravatar.cc/36?img=26",
      fullname: "Mindful Moments",
    },
    createdAt: "2025-11-09T10:30:00Z",
    content: `
      <p><i>Hít sâu 3 lần.</i> Thở ra chậm. Lặng yên.</p>
      <p>Mỗi khoảnh khắc đều đáng giá.</p>
    `,
    stats: { likes: 190, comments: 18, reposts: 5, shares: 8 },
  },
  {
    id: "107",
    author: {
      username: "techreview",
      avatar: "https://i.pravatar.cc/36?img=27",
      fullname: "Tech Review",
    },
    createdAt: "2025-11-09T09:45:00Z",
    content: `
      <p><b>Review gadget:</b> Smartwatch 2025</p>
      <ul>
        <li>Pin: 7 ngày</li>
        <li>Chức năng sức khỏe</li>
        <li>Thiết kế sang trọng</li>
      </ul>
    `,
    stats: { likes: 270, comments: 33, reposts: 12, shares: 17 },
  },
  {
    id: "108",
    author: {
      username: "dailyquotes",
      avatar: "https://i.pravatar.cc/36?img=28",
      fullname: "Daily Quotes",
    },
    createdAt: "2025-11-09T09:00:00Z",
    content: `
      <p><b>Quote hôm nay:</b></p>
      <blockquote>“Hãy là người bạn muốn gặp trong thế giới này.”</blockquote>
    `,
    stats: { likes: 423, comments: 50, reposts: 21, shares: 29 },
  },
  {
    id: "109",
    author: {
      username: "nature.clicks",
      avatar: "https://i.pravatar.cc/36?img=29",
      fullname: "Nature Clicks",
    },
    createdAt: "2025-11-09T08:30:00Z",
    content: `
      <p><b>Morning walk:</b></p>
      <p><img src="https://picsum.photos/seed/4/400/200" alt="nature" style="max-width:100%; border-radius:8px;" /></p>
      <p><i>Bầu trời và tĩnh lặng.</i></p>
    `,
    stats: { likes: 152, comments: 15, reposts: 4, shares: 10 },
  },
  {
    id: "110",
    author: {
      username: "travel.notes",
      avatar: "https://i.pravatar.cc/36?img=30",
      fullname: "Travel Notes",
    },
    createdAt: "2025-11-08T20:00:00Z",
    content: `
      <p><b>Weekend getaway:</b> Hồ Xanh 🏞️</p>
      <p><i>Chuyến đi ngắn, kỷ niệm dài.</i></p>
    `,
    stats: { likes: 312, comments: 40, reposts: 15, shares: 22 },
  },
  {
    id: "111",
    author: {
      username: "film.buff",
      avatar: "https://i.pravatar.cc/36?img=31",
      fullname: "Film Buff",
    },
    createdAt: "2025-11-08T18:30:00Z",
    content: `
      <p>Đêm nay xem: <b>Inception</b> 🎬</p>
      <p><i>Tua đi tua lại mà vẫn chưa hết kinh ngạc.</i></p>
    `,
    stats: { likes: 198, comments: 23, reposts: 7, shares: 12 },
  },
  {
    id: "112",
    author: {
      username: "streetfoodie",
      avatar: "https://i.pravatar.cc/36?img=32",
      fullname: "Street Foodie",
    },
    createdAt: "2025-11-08T17:00:00Z",
    content: `
      <p>Góc phố hôm nay: <b>Bánh mì nướng chảo</b> 🥖</p>
      <p><i>Vị thơm, giòn tan.</i></p>
    `,
    stats: { likes: 276, comments: 30, reposts: 12, shares: 18 },
  },
  {
    id: "113",
    author: {
      username: "hobby.crafter",
      avatar: "https://i.pravatar.cc/36?img=33",
      fullname: "Hobby Crafter",
    },
    createdAt: "2025-11-08T15:30:00Z",
    content: `
      <p>DIY hôm nay: làm bookmark từ giấy cũ ✂️📖</p>
      <p><i>Thú vui nhỏ mà hạnh phúc lớn.</i></p>
    `,
    stats: { likes: 182, comments: 16, reposts: 5, shares: 7 },
  },
  {
    id: "114",
    author: {
      username: "mindcoach",
      avatar: "https://i.pravatar.cc/36?img=34",
      fullname: "Mind Coach",
    },
    createdAt: "2025-11-08T14:00:00Z",
    content: `
      <p><b>Motivation tip:</b> Viết ra 3 việc quan trọng nhất cho ngày hôm nay ✍️</p>
      <p><i>Trí não bạn sẽ biết ưu tiên.</i></p>
    `,
    stats: { likes: 242, comments: 28, reposts: 10, shares: 12 },
  },
  {
    id: "115",
    author: {
      username: "photo.daily",
      avatar: "https://i.pravatar.cc/36?img=35",
      fullname: "Photo Daily",
    },
    createdAt: "2025-11-08T12:30:00Z",
    content: `
      <p><b>Chụp cảnh chiều:</b></p>
      <p><img src="https://picsum.photos/seed/5/400/200" alt="photo" style="max-width:100%; border-radius:8px;" /></p>
      <p><i>Ánh sáng đẹp làm tâm hồn cũng tươi sáng.</i></p>
    `,
    stats: { likes: 197, comments: 20, reposts: 7, shares: 9 },
  },
  {
    id: "116",
    author: {
      username: "cooking.lab",
      avatar: "https://i.pravatar.cc/36?img=36",
      fullname: "Cooking Lab",
    },
    createdAt: "2025-11-08T11:00:00Z",
    content: `
      <p>Recipe ngắn: <b>Salad trộn nhanh</b> 🥗</p>
      <ul>
        <li>Xà lách</li>
        <li>Cà chua</li>
        <li>Hạt điều</li>
        <li>Dressing: mật ong & chanh</li>
      </ul>
      <p><i>Ăn ngon, sống khỏe.</i></p>
    `,
    stats: { likes: 218, comments: 25, reposts: 10, shares: 11 },
  },
  {
    id: "117",
    author: {
      username: "daily.thoughts",
      avatar: "https://i.pravatar.cc/36?img=37",
      fullname: "Daily Thoughts",
    },
    createdAt: "2025-11-08T10:00:00Z",
    content: `
      <p><i>Cuộc sống không phải là đích đến, mà là hành trình bạn đi mỗi ngày.</i></p>
      <p>Một bước nhỏ hôm nay cũng là bước dài mai sau.</p>
    `,
    stats: { likes: 315, comments: 40, reposts: 15, shares: 22 },
  },
  {
    id: "118",
    author: {
      username: "tinyartist",
      avatar: "https://i.pravatar.cc/36?img=38",
      fullname: "Tiny Artist",
    },
    createdAt: "2025-11-08T09:00:00Z",
    content: `
      <p>Sketch ngẫu hứng 5 phút ✏️</p>
      <p><img src="https://picsum.photos/seed/6/400/200" alt="sketch" style="max-width:100%; border-radius:8px;" /></p>
      <p><i>Nhanh, đơn giản, nhưng vui.</i></p>
    `,
    stats: { likes: 132, comments: 10, reposts: 3, shares: 4 },
  },
  {
    id: "119",
    author: {
      username: "tech.news",
      avatar: "https://i.pravatar.cc/36?img=39",
      fullname: "Tech News",
    },
    createdAt: "2025-11-08T08:30:00Z",
    content: `
      <p><b>Tin mới:</b> AI có thể viết nhạc 🎼</p>
      <p><i>Tương lai sáng tạo đang thay đổi nhanh chóng.</i></p>
    `,
    stats: { likes: 312, comments: 50, reposts: 18, shares: 22 },
  },
  {
    id: "120",
    author: {
      username: "green.life",
      avatar: "https://i.pravatar.cc/36?img=40",
      fullname: "Green Life",
    },
    createdAt: "2025-11-08T07:30:00Z",
    content: `
      <p>Tip sống xanh 🌱</p>
      <ul>
        <li>Giảm nhựa</li>
        <li>Tiết kiệm nước</li>
        <li>Tái chế đồ cũ</li>
      </ul>
      <p><i>Một hành động nhỏ, ảnh hưởng lớn.</i></p>
    `,
    stats: { likes: 275, comments: 30, reposts: 12, shares: 18 },
  },
];
