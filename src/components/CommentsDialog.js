import { Dialog, DialogTitle, DialogContent, Box, Stack, Avatar, Typography, TextField, Button, IconButton, Menu, MenuItem } from '@mui/material';
import { Close as CloseIcon, MoreVert as MoreVertIcon } from '@mui/icons-material';
import moment from 'moment';
import { useState } from 'react';

const CommentsDialog = ({ open, onClose, content, currentUser, onAddComment, onDeleteComment }) => {
  const [newComment, setNewComment] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedComment, setSelectedComment] = useState(null);

  const handleMenuClick = (event, comment) => {
    setAnchorEl(event.currentTarget);
    setSelectedComment(comment);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComment(null);
  };

  const handleAddComment = () => {
    if (newComment.trim() && content) {
      onAddComment(content.id, newComment);
      setNewComment('');
    }
  };

  const handleDeleteComment = () => {
    if (selectedComment && content) {
      onDeleteComment(content.id, selectedComment.id);
      handleMenuClose();
    }
  };

  if (!content) return null;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h6">Comments</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {/* Comments List */}
          <Box sx={{ maxHeight: 400, overflowY: 'auto' }}>
            {(content.comments || []).map((comment) => (
              <Box key={comment.id} sx={{ mb: 2 }}>
                <Stack direction="row" spacing={2} alignItems="flex-start">
                  <Avatar src={comment.user?.avatar} />
                  <Box sx={{ flex: 1 }}>
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <Typography variant="subtitle2" fontWeight="bold">
                        {comment.user?.name}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {moment(comment.createdAt).fromNow()}
                      </Typography>
                      {comment.user?.id === currentUser?.id && (
                        <Box sx={{ ml: 'auto' }}>
                          <IconButton size="small" onClick={(e) => handleMenuClick(e, comment)}>
                            <MoreVertIcon fontSize="small" />
                          </IconButton>
                        </Box>
                      )}
                    </Stack>
                    <Typography variant="body2" mt={0.5}>
                      {comment.text}
                    </Typography>
                  </Box>
                </Stack>
              </Box>
            ))}
          </Box>

          {/* Add Comment */}
          <Stack direction="row" spacing={2} alignItems="flex-start">
            <Avatar src={currentUser?.avatar} />
            <Box sx={{ flex: 1 }}>
              <TextField
                fullWidth
                variant="outlined"
                placeholder="Write a comment..."
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                multiline
                rows={2}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  }
                }}
              />
              <Button
                variant="contained"
                onClick={handleAddComment}
                disabled={!newComment.trim()}
                sx={{ mt: 1 }}
              >
                Post Comment
              </Button>
            </Box>
          </Stack>
        </Stack>
      </DialogContent>

      {/* Comment Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: 'visible',
            filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
            mt: 1.5,
            '&:before': {
              content: '""',
              display: 'block',
              position: 'absolute',
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: 'background.paper',
              transform: 'translateY(-50%) rotate(45deg)',
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: 'right', vertical: 'top' }}
        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
      >
        <MenuItem onClick={handleDeleteComment}>
          Delete
        </MenuItem>
      </Menu>
    </Dialog>
  );
};

export default CommentsDialog; 