import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import {
  BellOffIcon,
  BookmarkIcon,
  BookmarkXIcon,
  EllipsisIcon,
  EyeOffIcon,
  LinkIcon,
  MessageSquareWarningIcon,
  PencilIcon,
  TrashIcon,
  UserRoundMinusIcon,
  UserRoundXIcon,
} from 'lucide-react';
import { useSelector } from 'react-redux';
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '../ui/dialog';
import {
  useDeletePostMutation,
  useSavePostMutation,
  useReportPostMutation,
} from '@/services/posts/postsApi';
import { toast } from 'sonner';
import { PostPanel } from './PostPanel';
import { POST_PANEL_TYPES } from './PostPanel';

const DIALOG_TYPES = {
  DELETE_POST: 'DELETE_POST',
  EDIT_POST: 'EDIT_POST',
  REPORT_POST: 'REPORT_POST',
};

export default function PostMenu({ hidden, post, onCopyLink }) {
  const userInfo = useSelector((state) => state.auth.userInfo);
  const isOwner = userInfo.id === post.user_id;
  const [open, setOpen] = useState(false);
  const [dialogType, setDialogType] = useState(null);
  const [deletePost] = useDeletePostMutation();
  const [savePost] = useSavePostMutation();
  const [reportPost] = useReportPostMutation();

  const handleDeletePost = async () => {
    try {
      await deletePost(post.id).unwrap();
      setOpen(false);
      toast.success('Đã xóa');
    } catch {
      toast.error('Lỗi khi xóa bài viết');
    }
  };

  const handleSavePost = async () => {
    try {
      await savePost(post.id).unwrap();
    } catch {
      // lỗi đã được rollback trong mutation
    }
  };

  const handleReportPost = async (reason, description) => {
    try {
      await reportPost({ id: post.id, reason, description }).unwrap();
      setOpen(false);
      toast.success('Đã gửi báo cáo');
    } catch {
      toast.error('Lỗi khi gửi báo cáo');
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            hidden={hidden}
            variant='ghost'
            size='icon-sm'
            className={cn('ml-auto', 'text-(--text-secondary)', 'hover:scale-105')}
          >
            <EllipsisIcon className='size-4.5' />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align='end' alignOffset={-10}>
          <DropdownMenuItem onClick={handleSavePost}>
            <span>{post.is_saved_by_auth ? 'Bỏ lưu' : 'Lưu'}</span>
            {post.is_saved_by_auth ? (
              <BookmarkXIcon className='size-5 text-inherit' />
            ) : (
              <BookmarkIcon className='size-5 text-inherit' />
            )}
          </DropdownMenuItem>
          {!isOwner && (
            <>
              <DropdownMenuItem className='opacity-50'>
                <span>Không quan tâm</span>
                <EyeOffIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='opacity-50'>
                <span>Tắt thông báo</span>
                <BellOffIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem className='opacity-50'>
                <span>Hạn chế</span>
                <UserRoundMinusIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem className='text-(--error-text)! opacity-50'>
                <span>Chặn</span>
                <UserRoundXIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-(--error-text)!'
                onClick={() => {
                  setDialogType(DIALOG_TYPES.REPORT_POST);
                  setOpen(true);
                }}
              >
                <span>Báo cáo</span>
                <MessageSquareWarningIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          {isOwner && (
            <>
              <DropdownMenuItem
                onClick={() => {
                  setDialogType(DIALOG_TYPES.EDIT_POST);
                  setOpen(true);
                }}
              >
                <span>Chỉnh sửa</span>
                <PencilIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-(--error-text)!'
                onClick={() => {
                  setDialogType(DIALOG_TYPES.DELETE_POST);
                  setOpen(true);
                }}
              >
                <span>Xóa</span>
                <TrashIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={onCopyLink}>
            <span>Sao chép liên kết</span>
            <LinkIcon className='size-5 text-inherit' />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
      <DialogContent>
        <DialogTitle className='hidden' />
        <DialogDescription className='hidden' />
        {dialogType === DIALOG_TYPES.DELETE_POST && (
          <DeletePostConfirmDialog onClose={() => setOpen(false)} onDelete={handleDeletePost} />
        )}

        {dialogType === DIALOG_TYPES.EDIT_POST && (
          <PostPanel onClose={() => setOpen(false)} post={post} type={POST_PANEL_TYPES.EDIT_POST} />
        )}

        {dialogType === DIALOG_TYPES.REPORT_POST && (
          <ReportPostDialog onClose={() => setOpen(false)} onReport={handleReportPost} />
        )}
      </DialogContent>
    </Dialog>
  );
}

function DeletePostConfirmDialog({ onClose, onDelete }) {
  return (
    <div className='w-full rounded-2xl border border-(--lines-primary) bg-(--elevated-background) text-center md:w-[280px]'>
      <div className='p-6'>
        <p className='font-bold'>Xóa bài viết?</p>
        <p className='mt-5 text-(--text-secondary)'>
          Nếu xóa bài viết này, bạn sẽ không khôi phục được nữa.
        </p>
      </div>

      <div className='relative flex border-t border-inherit'>
        <div className='absolute left-1/2 h-full w-px -translate-x-1/2 bg-(--lines-primary)' />

        <button className='h-[54px] flex-1 focus-visible:outline-0' onClick={onClose}>
          Hủy
        </button>

        <button
          className='h-[54px] flex-1 font-bold text-(--error-text) focus-visible:outline-0'
          onClick={onDelete}
        >
          Xóa
        </button>
      </div>
    </div>
  );
}

const REPORT_REASONS = [
  {
    id: 1,
    reason: 'spam',
    title: 'Chỉ là tôi không thích nội dung này',
  },
  {
    id: 2,
    reason: 'spam',
    title: 'Bắt nạt hoặc liên hệ theo cách không mong muốn',
  },
  {
    id: 3,
    reason: 'spam',
    title: 'Tự tử, tự gây thương tích hoặc ăn uống thất thường',
  },
  {
    id: 4,
    reason: 'spam',
    title: 'Bạo lực, thù ghét hoặc bóc lột',
  },
  {
    id: 5,
    reason: 'spam',
    title: 'Bán hoặc quảng cáo mặt hàng bị hạn chế',
  },
  {
    id: 6,
    reason: 'spam',
    title: 'Ảnh khỏa thân hoặc hoạt động tình dục',
  },
  {
    id: 7,
    reason: 'spam',
    title: 'Lừa đảo, gian lận hoặc spam',
  },
  {
    id: 8,
    reason: 'spam',
    title: 'Thông tin sai sự thật',
  },
  {
    id: 9,
    reason: 'spam',
    title: 'Quyền sở hữu trí tuệ',
  },
];

function ReportPostDialog({ onClose, onReport }) {
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [description, setDescription] = useState('');

  const handleReasonClick = (reason) => {
    setSelectedReasonId(reason);
  };

  const handleSubmit = () => {
    if (!selectedReasonId) return;
    const selectedReason = REPORT_REASONS.find((reason) => reason.id === selectedReasonId);
    onReport(selectedReason.reason, description);
  };

  return (
    <div className='w-full rounded-2xl border border-(--lines-primary) bg-(--elevated-background) md:w-[560px]'>
      <div className='p-8 text-center'>
        <h2 className='text-lg font-bold'>Tại sao bạn báo cáo bài viết này?</h2>
        <p className='mt-3 text-sm text-(--text-secondary)'>
          Báo cáo của bạn sẽ được ẩn danh. Nếu ai đó đang gặp nguy hiểm, đừng chần chừ mà hãy báo
          ngay cho dịch vụ khẩn cấp tại địa phương.
        </p>
      </div>

      <ul className='pb-4'>
        {REPORT_REASONS.map((reasonItem) => {
          const isSelected = selectedReasonId === reasonItem.id;
          return (
            <li
              className={cn(
                'flex h-12 cursor-pointer items-center justify-between px-8 hover:font-bold hover:text-(--error-text)',
                isSelected && 'font-bold text-(--error-text)'
              )}
              key={reasonItem.id}
              onClick={() => handleReasonClick(reasonItem.id)}
            >
              {reasonItem.title}
            </li>
          );
        })}
      </ul>

      {selectedReasonId && (
        <>
          <div className='px-8 pb-4'>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder='Mô tả thêm (tùy chọn)'
              autoFocus
              autoComplete='off'
              className='w-full resize-none rounded-lg border border-(--lines-primary) bg-(--elevated-background) px-4 py-3 text-sm focus:outline-0'
              rows={4}
            />
          </div>
          <div className='relative flex border-t border-inherit'>
            <div className='absolute left-1/2 h-full w-px -translate-x-1/2 bg-(--lines-primary)' />

            <button className='h-[54px] flex-1 focus-visible:outline-0' onClick={onClose}>
              Hủy
            </button>

            <button
              className='h-[54px] flex-1 font-bold text-(--error-text) focus-visible:outline-0'
              onClick={handleSubmit}
            >
              Gửi
            </button>
          </div>
        </>
      )}
    </div>
  );
}
