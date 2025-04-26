import { Card, CardContent, Typography, Stack, Box, IconButton, Avatar, Menu, MenuItem } from '@mui/material';
import { Favorite, FavoriteBorder, ChatBubbleOutline, MoreVert } from '@mui/icons-material';
import moment from 'moment';
import MediaCarousel from './MediaCarousel';
import { useState } from 'react';

const PostCard = ({ post, currentUser, isOwner, onEdit, onDelete, onComment }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card>
      <Stack direction="row" spacing={2} alignItems="center" p={2}>
        <Avatar src={currentUser.avatar} />
        <Box>
          <Typography variant="subtitle1" fontWeight="bold">
            {currentUser.name}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {moment(post.createdAt).fromNow()}
          </Typography>
        </Box>
        {isOwner && (
          <Box sx={{ ml: 'auto' }}>
            <IconButton onClick={handleMenuClick}>
              <MoreVert />
            </IconButton>
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
              <MenuItem onClick={() => { handleMenuClose(); onEdit({ ...post, type: 'post' }); }}>
                Update
              </MenuItem>
              <MenuItem onClick={() => { handleMenuClose(); onDelete({ ...post, type: 'post' }); }}>
                Delete
              </MenuItem>
            </Menu>
          </Box>
        )}
      </Stack>
      
      <CardContent>
        <Typography variant="body1" mb={2}>
          {post.content}
        </Typography>
        
        <MediaCarousel media={post.media} />

        <Stack direction="row" spacing={2} mt={2}>
          <IconButton onClick={handleLike} sx={{ color: isLiked ? 'primary.main' : 'inherit' }}>
            {isLiked ? <Favorite /> : <FavoriteBorder />}
            <Typography variant="body2" ml={1}>{likes}</Typography>
          </IconButton>
          <IconButton onClick={() => onComment(post)}>
            <ChatBubbleOutline />
            <Typography variant="body2" ml={1}>{post.comments?.length || 0}</Typography>
          </IconButton>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default PostCard; 