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
import { useTranslation } from 'react-i18next';

const DIALOG_TYPES = {
  DELETE_POST: 'DELETE_POST',
  EDIT_POST: 'EDIT_POST',
  REPORT_POST: 'REPORT_POST',
};

export default function PostMenu({ hidden, post, onCopyLink }) {
  const { t } = useTranslation();
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
      toast.success(t('postMenu.deleted'));
    } catch {
      toast.error(t('postMenu.deleteError'));
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
      toast.success(t('postMenu.reported'));
    } catch {
      toast.error(t('postMenu.reportError'));
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
            <span>{post.is_saved_by_auth ? t('postMenu.unsave') : t('postMenu.save')}</span>
            {post.is_saved_by_auth ? (
              <BookmarkXIcon className='size-5 text-inherit' />
            ) : (
              <BookmarkIcon className='size-5 text-inherit' />
            )}
          </DropdownMenuItem>
          {!isOwner && (
            <>
              <DropdownMenuItem className='opacity-50'>
                <span>{t('postMenu.notInterested')}</span>
                <EyeOffIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className='opacity-50'>
                <span>{t('postMenu.turnOffNotifications')}</span>
                <BellOffIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem className='opacity-50'>
                <span>{t('postMenu.restrict')}</span>
                <UserRoundMinusIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem className='text-(--error-text)! opacity-50'>
                <span>{t('postMenu.block')}</span>
                <UserRoundXIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-(--error-text)!'
                onClick={() => {
                  setDialogType(DIALOG_TYPES.REPORT_POST);
                  setOpen(true);
                }}
              >
                <span>{t('postMenu.report')}</span>
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
                <span>{t('postMenu.edit')}</span>
                <PencilIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuItem
                className='text-(--error-text)!'
                onClick={() => {
                  setDialogType(DIALOG_TYPES.DELETE_POST);
                  setOpen(true);
                }}
              >
                <span>{t('postMenu.delete')}</span>
                <TrashIcon className='size-5 text-inherit' />
              </DropdownMenuItem>
              <DropdownMenuSeparator />
            </>
          )}
          <DropdownMenuItem onClick={onCopyLink}>
            <span>{t('postMenu.copyLink')}</span>
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
  const { t } = useTranslation();
  return (
    <div className='w-full rounded-2xl border border-(--lines-primary) bg-(--elevated-background) text-center md:w-[280px]'>
      <div className='p-6'>
        <p className='font-bold'>{t('postMenu.deleteConfirm')}</p>
        <p className='mt-5 text-(--text-secondary)'>
          {t('postMenu.deleteWarning')}
        </p>
      </div>

      <div className='relative flex border-t border-inherit'>
        <div className='absolute left-1/2 h-full w-px -translate-x-1/2 bg-(--lines-primary)' />

        <button className='h-[54px] flex-1 focus-visible:outline-0' onClick={onClose}>
          {t('postMenu.cancel')}
        </button>

        <button
          className='h-[54px] flex-1 font-bold text-(--error-text) focus-visible:outline-0'
          onClick={onDelete}
        >
          {t('postMenu.delete')}
        </button>
      </div>
    </div>
  );
}

function ReportPostDialog({ onClose, onReport }) {
  const { t } = useTranslation();
  const [selectedReasonId, setSelectedReasonId] = useState(null);
  const [description, setDescription] = useState('');

  const REPORT_REASONS = [
    {
      id: 1,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.notLike',
    },
    {
      id: 2,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.bullying',
    },
    {
      id: 3,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.selfHarm',
    },
    {
      id: 4,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.violence',
    },
    {
      id: 5,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.restricted',
    },
    {
      id: 6,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.nudity',
    },
    {
      id: 7,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.spam',
    },
    {
      id: 8,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.falseInfo',
    },
    {
      id: 9,
      reason: 'spam',
      titleKey: 'postMenu.reportReasons.intellectualProperty',
    },
  ];

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
        <h2 className='text-lg font-bold'>{t('postMenu.reportTitle')}</h2>
        <p className='mt-3 text-sm text-(--text-secondary)'>
          {t('postMenu.reportDescription')}
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
              {t(reasonItem.titleKey)}
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
              placeholder={t('postMenu.additionalDescription')}
              autoFocus
              autoComplete='off'
              className='w-full resize-none rounded-lg border border-(--lines-primary) bg-(--elevated-background) px-4 py-3 text-sm focus:outline-0'
              rows={4}
            />
          </div>
          <div className='relative flex border-t border-inherit'>
            <div className='absolute left-1/2 h-full w-px -translate-x-1/2 bg-(--lines-primary)' />

            <button className='h-[54px] flex-1 focus-visible:outline-0' onClick={onClose}>
              {t('postMenu.cancel')}
            </button>

            <button
              className='h-[54px] flex-1 font-bold text-(--error-text) focus-visible:outline-0'
              onClick={handleSubmit}
            >
              {t('postMenu.send')}
            </button>
          </div>
        </>
      )}
    </div>
  );
}
