OrderDropper is a food ordering site which allows restaurants to post, edit, and delete their dishes, and allows customers to add dishes to their cart and order them.

In order to set up this app locally, create .env files in both the client and backend with the following environment values:

Client:
VITE_API_URL=Where you are hosting your backend (http://localhost:4000)

Backend:
MONGODB_URI=Link to MongoDB Cluster
JWT_SECRET=String to sign JWT tokens with
APP_ORIGIN=Where you are hosting your client (http://localhost:5173)
PORT=Port that the server is listening in on (4000)

Link to live frontend: https://food-ordering-site-ecru.vercel.app
Link to live backend: https://food-ordering-site-j5bk.onrender.com

API routes:
POST /api/auth/signup - Create a new user, posting a restaurant if the user has the restaurant role
POST /api/auth/login - Log into user account
GET /api/auth/me - Retrieve current user's information
POST /api/auth/logout - Log out of user account

GET /dishes/ - Retrieve all dishes and filter them based on search query and page number
GET /dishes/:id - Retrieve a specific dish's information
POST /dishes/ - Post dish to app
PUT /dishes/:id - Update a specific dish's information
DELETE /dishes/:id - Delete a specific dish

GET /restaurants/ - Retrieve all restaurants based on search query and page
GET /restaurants/:id - Retrieve a specific restaurant's information, and return it alongside the dishes belonging to that restaurant
GET /restaurants/findRestaurant/:email - Retrieve a specific restaurant's information by email
POST /restaurants/ - Post restaurant to app

GET /shoppingcart/:id - Retrieve a specific user's shopping cart
PUT /shoppingcart/:id - Update a specific user's shopping cart

Note: Many of the CRUD operations on this site required interaction with the backend (e.g., fetch requests), so only tests that don't require interaction with the backend were included.

Image Credits: 

McDonalds:
https://pixabay.com/photos/mcdonalds-editorial-chain-fast-food-1340199/
https://pixabay.com/photos/burger-cheese-burger-burgers-3946012/
https://pixabay.com/photos/hamburger-sandwich-chicken-healthy-8026582/
https://pixabay.com/photos/food-gourmet-delicious-meal-3635355/

Olive Garden:
https://pixabay.com/photos/spaghetti-sauce-pasta-food-1604836/
https://pixabay.com/photos/ravioli-mouth-pockets-pasta-noodles-9641574/

Taco Bell:
https://pixabay.com/photos/tacos-taco-shells-meal-drink-8076612/
https://pixabay.com/photos/taco-tortilla-mexican-meal-food-7623097/
https://pixabay.com/photos/mexican-food-burrito-mexican-food-2456038/

Dunkin' Donuts:
https://pixabay.com/photos/donuts-pastries-kringel-cakes-4633040/
https://pixabay.com/photos/donut-baked-goods-sweet-1761520/
https://pixabay.com/photos/donuts-donut-pastries-cute-643277/

KFC:
https://pixabay.com/photos/kfc-kentucky-fried-chicken-san-juan-1574389/
https://pixabay.com/illustrations/chicken-drumstick-crispy-fried-9579090/
https://pixabay.com/illustrations/sandwich-chicken-food-meal-7628011/

Pizza Hut:
https://pixabay.com/photos/pizza-food-italy-3000274/
https://pixabay.com/photos/pizza-mozzarella-food-5661748/

New York Fries:
https://pixabay.com/photos/fry-food-fried-delicious-1807668/
https://pixabay.com/photos/bowl-french-fries-food-fries-1842294/