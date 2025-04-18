import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  IconButton,
  Grid,
  Chip,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Tabs,
  Tab,
  InputAdornment,
  Divider
} from '@mui/material';
import {
  AddPhotoAlternate as AddPhotoIcon,
  VideoLibrary as VideoIcon,
  Delete as DeleteIcon,
  Add as AddIcon
} from '@mui/icons-material';

const CreateContent = ({ open, onClose, type, onSave, initialData = null, isOwner = false }) => {
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [media, setMedia] = useState(initialData?.media || []);
  const [mealType, setMealType] = useState(initialData?.mealType || 'breakfast');
  const [activeTab, setActiveTab] = useState(0);
  
  // Recipe specific states
  const [prepTime, setPrepTime] = useState(initialData?.prepTime || '');
  const [cookTime, setCookTime] = useState(initialData?.cookTime || '');
  const [servings, setServings] = useState(initialData?.servings || '');
  const [ingredients, setIngredients] = useState(initialData?.ingredients || []);
  const [instructions, setInstructions] = useState(initialData?.instructions || []);
  const [nutrition, setNutrition] = useState(initialData?.nutrition || {
    calories: '',
    protein: '',
    carbs: '',
    fat: '',
    fiber: ''
  });
  const [newIngredient, setNewIngredient] = useState('');
  const [newInstruction, setNewInstruction] = useState('');

  const handleAddIngredient = () => {
    if (newIngredient.trim()) {
      setIngredients([...ingredients, newIngredient.trim()]);
      setNewIngredient('');
    }
  };

  const handleRemoveIngredient = (index) => {
    setIngredients(ingredients.filter((_, i) => i !== index));
  };

  const handleAddInstruction = () => {
    if (newInstruction.trim()) {
      setInstructions([...instructions, newInstruction.trim()]);
      setNewInstruction('');
    }
  };

  const handleRemoveInstruction = (index) => {
    setInstructions(instructions.filter((_, i) => i !== index));
  };

  const handleSave = () => {
    const content = {
      title,
      description,
      media,
      type,
      ...(type === 'recipe' && {
        mealType,
        prepTime,
        cookTime,
        servings,
        ingredients,
        instructions,
        nutrition
      })
    };
    onSave(content);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>
        {initialData ? 'Edit Content' : `Create New ${type === 'recipe' ? 'Recipe' : 'Post'}`}
      </DialogTitle>
      <DialogContent>
        <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 2 }}>
          <Tab label="Basic Info" />
          {type === 'recipe' && <Tab label="Recipe Details" />}
          <Tab label="Media" />
        </Tabs>

        {activeTab === 0 && (
          <Stack spacing={2}>
            <TextField
              label="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              fullWidth
              required
            />
            <TextField
              label="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              fullWidth
              multiline
              rows={4}
              required
            />
            {type === 'recipe' && (
              <FormControl fullWidth>
                <InputLabel>Meal Type</InputLabel>
                <Select
                  value={mealType}
                  onChange={(e) => setMealType(e.target.value)}
                  label="Meal Type"
                >
                  <MenuItem value="breakfast">Breakfast</MenuItem>
                  <MenuItem value="lunch">Lunch</MenuItem>
                  <MenuItem value="dinner">Dinner</MenuItem>
                  <MenuItem value="snack">Snack</MenuItem>
                  <MenuItem value="dessert">Dessert</MenuItem>
                </Select>
              </FormControl>
            )}
          </Stack>
        )}

        {activeTab === 1 && type === 'recipe' && (
          <Stack spacing={3}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Prep Time"
                  value={prepTime}
                  onChange={(e) => setPrepTime(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mins</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Cook Time"
                  value={cookTime}
                  onChange={(e) => setCookTime(e.target.value)}
                  fullWidth
                  InputProps={{
                    endAdornment: <InputAdornment position="end">mins</InputAdornment>,
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <TextField
                  label="Servings"
                  value={servings}
                  onChange={(e) => setServings(e.target.value)}
                  fullWidth
                  type="number"
                />
              </Grid>
            </Grid>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>Ingredients</Typography>
              <Stack spacing={1}>
                {ingredients.map((ingredient, index) => (
                  <Chip
                    key={index}
                    label={ingredient}
                    onDelete={() => handleRemoveIngredient(index)}
                    sx={{ mr: 1, mb: 1 }}
                  />
                ))}
              </Stack>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField
                  label="Add Ingredient"
                  value={newIngredient}
                  onChange={(e) => setNewIngredient(e.target.value)}
                  fullWidth
                  onKeyPress={(e) => e.key === 'Enter' && handleAddIngredient()}
                />
                <IconButton onClick={handleAddIngredient} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>Instructions</Typography>
              <Stack spacing={1}>
                {instructions.map((instruction, index) => (
                  <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <Typography variant="body2" sx={{ minWidth: 24 }}>{index + 1}.</Typography>
                    <Typography variant="body2" sx={{ flex: 1 }}>{instruction}</Typography>
                    <IconButton size="small" onClick={() => handleRemoveInstruction(index)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Stack>
              <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                <TextField
                  label="Add Instruction"
                  value={newInstruction}
                  onChange={(e) => setNewInstruction(e.target.value)}
                  fullWidth
                  onKeyPress={(e) => e.key === 'Enter' && handleAddInstruction()}
                />
                <IconButton onClick={handleAddInstruction} color="primary">
                  <AddIcon />
                </IconButton>
              </Box>
            </Box>

            <Divider />

            <Box>
              <Typography variant="h6" gutterBottom>Nutrition Facts</Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Calories"
                    value={nutrition.calories}
                    onChange={(e) => setNutrition({ ...nutrition, calories: e.target.value })}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">kcal</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Protein"
                    value={nutrition.protein}
                    onChange={(e) => setNutrition({ ...nutrition, protein: e.target.value })}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Carbohydrates"
                    value={nutrition.carbs}
                    onChange={(e) => setNutrition({ ...nutrition, carbs: e.target.value })}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fat"
                    value={nutrition.fat}
                    onChange={(e) => setNutrition({ ...nutrition, fat: e.target.value })}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    label="Fiber"
                    value={nutrition.fiber}
                    onChange={(e) => setNutrition({ ...nutrition, fiber: e.target.value })}
                    fullWidth
                    type="number"
                    InputProps={{
                      endAdornment: <InputAdornment position="end">g</InputAdornment>,
                    }}
                  />
                </Grid>
              </Grid>
            </Box>
          </Stack>
        )}

        {activeTab === (type === 'recipe' ? 2 : 1) && (
          <Stack spacing={2}>
            <Typography variant="subtitle1">Add Media</Typography>
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
              {media.map((item, index) => (
                <Box key={index} sx={{ position: 'relative' }}>
                  {item.type === 'image' ? (
                    <img
                      src={item.url}
                      alt={`Media ${index + 1}`}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                  ) : (
                    <video
                      src={item.url}
                      style={{ width: 100, height: 100, objectFit: 'cover' }}
                    />
                  )}
                  <IconButton
                    size="small"
                    sx={{
                      position: 'absolute',
                      top: 0,
                      right: 0,
                      bgcolor: 'rgba(0,0,0,0.5)',
                      color: 'white',
                      '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' }
                    }}
                    onClick={() => setMedia(media.filter((_, i) => i !== index))}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                </Box>
              ))}
            </Box>
            <Button
              variant="outlined"
              startIcon={<AddIcon />}
              onClick={() => {
                const url = prompt('Enter media URL:');
                const type = prompt('Enter media type (image/video):');
                if (url && type) {
                  setMedia([...media, { url, type }]);
                }
              }}
            >
              Add Media
            </Button>
          </Stack>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSave} variant="contained" color="primary">
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreateContent; 