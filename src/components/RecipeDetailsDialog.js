import { Dialog, DialogTitle, DialogContent, Box, Stack, Avatar, Typography, IconButton, Chip, Divider } from '@mui/material';
import { Close as CloseIcon, AccessTime as TimeIcon, Restaurant as ServingIcon, LocalFireDepartment as CaloriesIcon } from '@mui/icons-material';
import moment from 'moment';
import MediaCarousel from './MediaCarousel';

const RecipeDetailsDialog = ({ open, onClose, recipe, currentUser }) => {
  if (!recipe) return null;

  // Sample recipe details
  const recipeDetails = {
    prepTime: "15 mins",
    cookTime: "30 mins",
    servings: 4,
    calories: 450,
    ingredients: [
      "2 cups all-purpose flour",
      "1 cup sugar",
      "1 tsp baking powder",
      "1/2 tsp salt",
      "1 cup milk",
      "2 eggs",
      "1/4 cup butter, melted",
      "1 tsp vanilla extract"
    ],
    instructions: [
      "Preheat oven to 350°F (175°C).",
      "In a large bowl, mix flour, sugar, baking powder, and salt.",
      "In another bowl, beat eggs, then add milk, melted butter, and vanilla.",
      "Combine wet and dry ingredients, stirring until just combined.",
      "Pour batter into a greased baking pan.",
      "Bake for 30 minutes or until a toothpick comes out clean.",
      "Let cool before serving."
    ],
    nutrition: {
      calories: 450,
      protein: "12g",
      carbs: "65g",
      fat: "15g",
      fiber: "2g"
    }
  };

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 3,
        }
      }}
    >
      <DialogTitle>
        <Stack direction="row" alignItems="center" justifyContent="space-between">
          <Typography variant="h5" fontWeight="bold">{recipe.title}</Typography>
          <IconButton onClick={onClose}>
            <CloseIcon />
          </IconButton>
        </Stack>
      </DialogTitle>
      <DialogContent>
        <Stack spacing={3}>
          {/* Recipe Header */}
          <Stack direction="row" spacing={2} alignItems="center">
            <Avatar src={currentUser?.avatar} sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography variant="subtitle1" fontWeight="bold">
                {currentUser?.name}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {moment(recipe.createdAt).fromNow()}
              </Typography>
            </Box>
            <Chip 
              label={recipe.mealType} 
              sx={{ 
                ml: 'auto',
                bgcolor: 'primary.light',
                color: 'white',
                '&:hover': {
                  bgcolor: 'primary.main',
                }
              }} 
            />
          </Stack>

          {/* Media */}
          <Box sx={{ borderRadius: 2, overflow: 'hidden' }}>
            <MediaCarousel media={recipe.media} />
          </Box>

          {/* Description */}
          <Typography variant="body1" color="text.secondary">
            {recipe.description}
          </Typography>

          {/* Recipe Info */}
          <Stack direction="row" spacing={3} sx={{ py: 2 }}>
            <Stack direction="row" spacing={1} alignItems="center">
              <TimeIcon color="primary" />
              <Typography variant="body2">
                {recipeDetails.prepTime} prep
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <TimeIcon color="primary" />
              <Typography variant="body2">
                {recipeDetails.cookTime} cook
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <ServingIcon color="primary" />
              <Typography variant="body2">
                {recipeDetails.servings} servings
              </Typography>
            </Stack>
            <Stack direction="row" spacing={1} alignItems="center">
              <CaloriesIcon color="primary" />
              <Typography variant="body2">
                {recipeDetails.calories} cal
              </Typography>
            </Stack>
          </Stack>

          <Divider />

          {/* Ingredients */}
          <Box>
            <Typography variant="h6" gutterBottom>Ingredients</Typography>
            <Stack spacing={1}>
              {recipeDetails.ingredients.map((ingredient, index) => (
                <Typography key={index} variant="body2">
                  • {ingredient}
                </Typography>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Instructions */}
          <Box>
            <Typography variant="h6" gutterBottom>Instructions</Typography>
            <Stack spacing={2}>
              {recipeDetails.instructions.map((instruction, index) => (
                <Stack key={index} direction="row" spacing={2}>
                  <Typography 
                    variant="body2" 
                    sx={{ 
                      minWidth: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center'
                    }}
                  >
                    {index + 1}
                  </Typography>
                  <Typography variant="body2">
                    {instruction}
                  </Typography>
                </Stack>
              ))}
            </Stack>
          </Box>

          <Divider />

          {/* Nutrition */}
          <Box>
            <Typography variant="h6" gutterBottom>Nutrition Facts</Typography>
            <Stack direction="row" spacing={3}>
              <Box>
                <Typography variant="body2" color="text.secondary">Calories</Typography>
                <Typography variant="h6">{recipeDetails.nutrition.calories}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Protein</Typography>
                <Typography variant="h6">{recipeDetails.nutrition.protein}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Carbs</Typography>
                <Typography variant="h6">{recipeDetails.nutrition.carbs}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Fat</Typography>
                <Typography variant="h6">{recipeDetails.nutrition.fat}</Typography>
              </Box>
              <Box>
                <Typography variant="body2" color="text.secondary">Fiber</Typography>
                <Typography variant="h6">{recipeDetails.nutrition.fiber}</Typography>
              </Box>
            </Stack>
          </Box>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default RecipeDetailsDialog; 