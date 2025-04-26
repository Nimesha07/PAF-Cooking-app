import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Tabs,
  Tab,
  Box,
  Container,
  IconButton,
  Paper,
  Button,
  Grid,
  Avatar,
  Toolbar,
  InputBase,
  Badge,
  Menu,
  Stack,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Drawer,
  Dialog,
  DialogTitle,
  DialogContent,
  ThemeProvider,
  Typography,
} from "@mui/material";
import {
  Comment as CommentIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Add as AddIcon,
  CalendarMonth as CalendarIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Close as CloseIcon,
  Menu as MenuIcon,
  Person as PersonIcon
} from "@mui/icons-material";
import { useNavigate } from 'react-router-dom';
import MealScheduler from '../components/MealScheduler';
import CreateContent from '../components/CreateContent';
import PostCard from '../components/PostCard';
import RecipeCard from '../components/RecipeCard';
import CommentsDialog from '../components/CommentsDialog';
import RecipeDetailsDialog from '../components/RecipeDetailsDialog';
import { theme } from '../theme/theme';
import { useAuth } from '../context/AuthContext';
import { testUser, dummyPosts, dummyRecipes, dummyNotifications } from '../data/dummyData';

const HomePage = () => {
  const { currentUser, logout, isOwner } = useAuth();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [openModal, setOpenModal] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchor, setNotificationsAnchor] = useState(null);
  const [profileDrawer, setProfileDrawer] = useState(false);
  const [showScheduler, setShowScheduler] = useState(false);
  const [notifications, setNotifications] = useState(dummyNotifications);
  const [createDialogOpen, setCreateDialogOpen] = useState(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [selectedContent, setSelectedContent] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [commentsDialogOpen, setCommentsDialogOpen] = useState(false);
  const [recipeDetailsOpen, setRecipeDetailsOpen] = useState(false);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [posts, setPosts] = useState(dummyPosts);
  const [recipes, setRecipes] = useState(dummyRecipes);

  // Redirect to login if not authenticated
  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  const handleChange = (event, newValue) => {
    setTab(newValue);
  };

  const handleCommentClick = (content) => {
    setSelectedContent(content);
    setCommentsDialogOpen(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    setSelectedPost(null);
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsClick = (event) => {
    setNotificationsAnchor(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchor(null);
  };

  const handleProfileClick = () => {
    setProfileDrawer(true);
  };

  const handleProfileClose = () => {
    setProfileDrawer(false);
  };

  const markNotificationAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const unreadNotifications = notifications.filter(n => !n.read).length;

  const handleSchedulerClick = () => {
    setShowScheduler(true);
    setProfileDrawer(false);
  };

  const handleCreateClick = () => {
    setCreateDialogOpen(true);
  };

  const handleEditClick = (content) => {
    setSelectedContent(content);
    setEditDialogOpen(true);
  };

  const handleDeleteContent = (content) => {
    if (content.type === 'post') {
      setPosts(posts.filter(post => post.id !== content.id));
    } else {
      setRecipes(recipes.filter(recipe => recipe.id !== content.id));
    }
  };

  const handleSaveContent = (formData) => {
    const newContent = {
      id: Date.now(),
      ...Object.fromEntries(formData),
      userId: currentUser.id,
      createdAt: new Date().toISOString()
    };

    if (formData.get('type') === 'post') {
      setPosts([newContent, ...posts]);
    } else {
      setRecipes([newContent, ...recipes]);
    }
  };

  const handleUpdateContent = (formData) => {
    const updatedContent = {
      ...selectedContent,
      ...Object.fromEntries(formData)
    };

    if (selectedContent.type === 'post') {
      setPosts(posts.map(post => 
        post.id === selectedContent.id ? updatedContent : post
      ));
    } else {
      setRecipes(recipes.map(recipe => 
        recipe.id === selectedContent.id ? updatedContent : recipe
      ));
    }
  };

  const handleAddComment = (contentId, commentText) => {
    const newComment = {
      id: Date.now(),
      text: commentText,
      user: currentUser,
      createdAt: new Date().toISOString()
    };

    if (selectedContent.type === 'post') {
      setPosts(posts.map(post => 
        post.id === contentId 
          ? { ...post, comments: [...(post.comments || []), newComment] }
          : post
      ));
    } else {
      setRecipes(recipes.map(recipe => 
        recipe.id === contentId 
          ? { ...recipe, comments: [...(recipe.comments || []), newComment] }
          : recipe
      ));
    }
  };

  const handleDeleteComment = (contentId, commentId) => {
    if (selectedContent.type === 'post') {
      setPosts(posts.map(post => 
        post.id === contentId 
          ? { ...post, comments: post.comments.filter(c => c.id !== commentId) }
          : post
      ));
    } else {
      setRecipes(recipes.map(recipe => 
        recipe.id === contentId 
          ? { ...recipe, comments: recipe.comments.filter(c => c.id !== commentId) }
          : recipe
      ));
    }
  };

  const handleRecipeClick = (recipe) => {
    setSelectedRecipe(recipe);
    setRecipeDetailsOpen(true);
  };

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ flexGrow: 1, bgcolor: 'background.default' }}>
        {/* Modern Navbar */}
        <AppBar position="sticky" color="default" elevation={0}>
          <Toolbar>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setProfileDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Social Meal
            </Typography>
            
            <Stack direction="row" spacing={2} alignItems="center">
              <Paper
                component="form"
                sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: 300 }}
              >
                <InputBase
                  sx={{ ml: 1, flex: 1 }}
                  placeholder="Search..."
                  inputProps={{ 'aria-label': 'search' }}
                />
                <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
                  <SearchIcon />
                </IconButton>
              </Paper>

              <IconButton color="inherit" onClick={handleNotificationsClick}>
                <Badge badgeContent={unreadNotifications} color="error">
                  <NotificationsIcon />
                </Badge>
              </IconButton>

              <Button 
                variant="contained" 
                startIcon={<AddIcon />}
                onClick={handleCreateClick}
              >
                Create
              </Button>

              <Avatar 
                src={currentUser.avatar}
                sx={{ cursor: 'pointer' }}
                onClick={() => setProfileDrawer(true)}
              />
            </Stack>
          </Toolbar>
        </AppBar>

        {/* Notifications Menu */}
        <Menu
          anchorEl={notificationsAnchor}
          open={Boolean(notificationsAnchor)}
          onClose={handleNotificationsClose}
          PaperProps={{ sx: { width: 320, maxHeight: 400 } }}
        >
          <Typography variant="h6" sx={{ p: 2, pb: 1 }}>
            Notifications
          </Typography>
          <List sx={{ width: '100%' }}>
            {notifications.map((notification) => (
              <ListItem
                key={notification.id}
                sx={{
                  bgcolor: notification.read ? 'inherit' : 'rgba(0, 0, 0, 0.04)',
                  '&:hover': { bgcolor: 'rgba(0, 0, 0, 0.08)' }
                }}
                onClick={() => markNotificationAsRead(notification.id)}
              >
                <ListItemAvatar>
                  <Avatar src="https://i.pravatar.cc/150?img=1" />
                </ListItemAvatar>
                <ListItemText
                  primary={notification.message}
                  secondary={notification.time}
                />
              </ListItem>
            ))}
          </List>
        </Menu>

        {/* Profile Drawer */}
        <Drawer
          anchor="right"
          open={profileDrawer}
          onClose={handleProfileClose}
          PaperProps={{ sx: { width: 320 } }}
        >
          <Box sx={{ p: 2 }}>
            <Stack direction="row" spacing={2} alignItems="center" mb={3}>
              <Avatar src={currentUser.avatar} sx={{ width: 64, height: 64 }} />
              <Box>
                <Typography variant="h6">{currentUser.name}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {currentUser.email}
                </Typography>
              </Box>
            </Stack>
            
            <List>
              <ListItem button onClick={handleSchedulerClick}>
                <ListItemAvatar>
                  <Avatar>
                    <CalendarIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Meal Scheduler" />
              </ListItem>
              <ListItem button>
                <ListItemAvatar>
                  <Avatar>
                    <SettingsIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Settings" />
              </ListItem>
              <ListItem button onClick={logout}>
                <ListItemAvatar>
                  <Avatar>
                    <LogoutIcon />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Logout" />
              </ListItem>
            </List>
          </Box>
        </Drawer>

        <Container maxWidth="md" sx={{ pt: 3 }}>
          {/* Tabs */}
          <Paper sx={{ mb: 3, position: 'sticky', top: 64, zIndex: 1 }}>
            <Tabs
              value={tab}
              onChange={handleChange}
              variant="fullWidth"
              indicatorColor="primary"
              textColor="primary"
            >
              <Tab label="Posts" />
              <Tab label="Recipes" />
            </Tabs>
          </Paper>

          {/* Content */}
          <Box mt={4}>
            {/* Posts Section */}
            <Box sx={{ display: tab === 0 ? "block" : "none" }}>
              <Grid container spacing={3}>
                {posts.map((post) => (
                  <Grid item xs={12} key={post.id}>
                    <PostCard
                      post={post}
                      currentUser={currentUser}
                      isOwner={isOwner(post)}
                      onEdit={handleEditClick}
                      onDelete={() => handleDeleteContent({ ...post, type: 'post' })}
                      onComment={() => handleCommentClick({ ...post, type: 'post' })}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>

            {/* Recipes Section */}
            <Box sx={{ display: tab === 1 ? "block" : "none" }}>
              <Grid container spacing={3}>
                {recipes.map((recipe) => (
                  <Grid item xs={12} key={recipe.id}>
                    <RecipeCard
                      recipe={recipe}
                      currentUser={currentUser}
                      isOwner={isOwner(recipe)}
                      onEdit={handleEditClick}
                      onDelete={() => handleDeleteContent({ ...recipe, type: 'recipe' })}
                      onClick={() => handleRecipeClick(recipe)}
                    />
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Box>

          {/* Create Content Dialog */}
          <CreateContent
            open={createDialogOpen}
            onClose={() => setCreateDialogOpen(false)}
            type={tab === 0 ? 'post' : 'recipe'}
            onSave={handleSaveContent}
          />

          {/* Edit Content Dialog */}
          <CreateContent
            open={editDialogOpen}
            onClose={() => setEditDialogOpen(false)}
            type={selectedContent?.type}
            onSave={handleUpdateContent}
            initialData={selectedContent}
            isOwner={isOwner(selectedContent)}
          />

          {/* Comments Dialog */}
          <CommentsDialog
            open={commentsDialogOpen}
            onClose={() => setCommentsDialogOpen(false)}
            content={selectedContent}
            currentUser={currentUser}
            onAddComment={handleAddComment}
            onDeleteComment={handleDeleteComment}
          />

          {/* Recipe Details Dialog */}
          <RecipeDetailsDialog
            open={recipeDetailsOpen}
            onClose={() => setRecipeDetailsOpen(false)}
            recipe={selectedRecipe}
            currentUser={currentUser}
          />
        </Container>

        {/* Meal Scheduler Modal */}
        <Dialog
          open={showScheduler}
          onClose={() => setShowScheduler(false)}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography variant="h6">Meal Scheduler</Typography>
              <IconButton onClick={() => setShowScheduler(false)}>
                <CloseIcon />
              </IconButton>
            </Stack>
          </DialogTitle>
          <DialogContent>
            <MealScheduler />
          </DialogContent>
        </Dialog>
      </Box>
    </ThemeProvider>
  );
};

export default HomePage;
