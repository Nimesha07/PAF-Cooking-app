// Dummy test user
export const testUser = {
  id: 1,
  name: "Test User",
  email: "test@example.com",
  avatar: "https://i.pravatar.cc/150?img=1",
  bio: "Food enthusiast and recipe creator",
  role: "USER"
};

// Dummy posts data
export const dummyPosts = [
  { 
    id: 1, 
    content: "Exploring the mountains! 🏞️", 
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1551218808-94e220e084d2" },
      { type: 'video', url: "https://example.com/video1.mp4" }
    ],
    userId: 1,
    createdAt: "2024-03-15T10:30:00",
    comments: [
      {
        id: 1,
        text: "Amazing view! Where is this?",
        user: {
          id: 2,
          name: "Jane Smith",
          avatar: "https://i.pravatar.cc/150?img=2"
        },
        createdAt: "2024-03-15T11:30:00"
      },
      {
        id: 2,
        text: "Beautiful scenery! 😍",
        user: {
          id: 3,
          name: "Mike Johnson",
          avatar: "https://i.pravatar.cc/150?img=3"
        },
        createdAt: "2024-03-15T12:45:00"
      }
    ]
  },
  { 
    id: 2, 
    content: "City lights at night ✨", 
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1493612276216-ee3925520721" }
    ],
    userId: 1,
    createdAt: "2024-03-15T10:30:00",
    comments: [
      {
        id: 3,
        text: "Which city is this?",
        user: {
          id: 4,
          name: "Sarah Wilson",
          avatar: "https://i.pravatar.cc/150?img=4"
        },
        createdAt: "2024-03-15T14:20:00"
      }
    ]
  },
  { 
    id: 3, 
    content: "Coffee and rainy days ☕", 
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1509042239860-f550ce710b93" }
    ],
    userId: 1,
    createdAt: "2024-03-15T10:30:00",
    comments: []
  }
];

// Dummy recipes data
export const dummyRecipes = [
  { 
    id: 1, 
    title: "Grilled Chicken Salad", 
    description: "Fresh and healthy!", 
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1606787366850-de6330128bfc" }
    ],
    userId: 1,
    mealType: 'lunch',
    createdAt: "2024-03-15T10:30:00",
    comments: [
      {
        id: 4,
        text: "Looks delicious! Can you share the recipe?",
        user: {
          id: 5,
          name: "Alex Brown",
          avatar: "https://i.pravatar.cc/150?img=5"
        },
        createdAt: "2024-03-15T16:30:00"
      }
    ]
  },
  { 
    id: 2, 
    title: "Pancakes Stack", 
    description: "Fluffy and delicious.", 
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1550317138-10000687a72b" }
    ],
    userId: 1,
    mealType: 'breakfast',
    createdAt: "2024-03-15T10:30:00",
    comments: []
  },
  { 
    id: 3, 
    title: "Berry Smoothie Bowl", 
    description: "Perfect breakfast.", 
    media: [
      { type: 'image', url: "https://images.unsplash.com/photo-1490645935967-10de6ba17061" }
    ],
    userId: 1,
    mealType: 'breakfast',
    createdAt: "2024-03-15T10:30:00",
    comments: []
  }
];

// Dummy notifications data
export const dummyNotifications = [
  { id: 1, message: "John liked your post", time: "2 hours ago", read: false },
  { id: 2, message: "New comment on your recipe", time: "4 hours ago", read: false },
  { id: 3, message: "Meal plan reminder: Dinner at 7 PM", time: "1 day ago", read: true }
]; 