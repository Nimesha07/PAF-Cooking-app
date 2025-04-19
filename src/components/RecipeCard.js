import React from 'react';
import {
  Card,
  CardContent,
  Typography,
  Stack,
  Box,
  IconButton,
  Avatar,
  Chip,
} from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import CommentIcon from '@mui/icons-material/Comment';
import moment from 'moment';
import MediaCarousel from './MediaCarousel';

const RecipeCard = ({ recipe, currentUser, isOwner, onEdit, onDelete, onComment, onClick }) => {
  return (
    <Card 
      sx={{ 
        cursor: 'pointer',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
      onClick={onClick}
    >
      <CardContent>
        <Stack spacing={2}>
          {/* User Info */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Avatar src={recipe.userAvatar} alt={recipe.userName} />
            <Box>
              <Typography variant="subtitle1">{recipe.userName}</Typography>
              <Typography variant="caption" color="text.secondary">
                {moment(recipe.createdAt).fromNow()}
              </Typography>
            </Box>
          </Box>

          {/* Recipe Title and Description */}
          <Typography variant="h6">{recipe.title}</Typography>
          <Typography variant="body1" color="text.secondary">
            {recipe.description}
          </Typography>

          {/* Meal Type */}
          <Chip 
            label={recipe.mealType} 
            color="primary" 
            size="small"
            sx={{ alignSelf: 'flex-start' }}
          />

          {/* Media Carousel */}
          {recipe.media && recipe.media.length > 0 && (
            <MediaCarousel media={recipe.media} />
          )}

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
            <IconButton onClick={(e) => {
              e.stopPropagation();
              onComment();
            }}>
              <CommentIcon />
            </IconButton>
            {isOwner && (
              <>
                <IconButton onClick={(e) => {
                  e.stopPropagation();
                  onEdit(recipe);
                }}>
                  <EditIcon />
                </IconButton>
                <IconButton onClick={(e) => {
                  e.stopPropagation();
                  onDelete(recipe);
                }}>
                  <DeleteIcon />
                </IconButton>
              </>
            )}
          </Box>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default RecipeCard; 