# OrderDropper

_OrderDropper is a food ordering site which allows restaurants to post, edit, and delete their dishes, and allows customers to add dishes to their cart and order them._

## Author Information
**Author:** Richard Ly
**Github:** https://github.com/Richard-Ly-7

## How To Run Locally

**Client**
1. Create a .env file in the client directory with the following value:
VITE_API_URL=Backend URI (Default: http://localhost:4000)
2. Open a terminal and navigate to the client directory.
3. Run `npm install`.
4. Run `npm run dev`.

**Backend**
1. Create a .env file in the backend directory with the following values:
MONGODB_URI=Link to MongoDB Cluster
JWT_SECRET=String to sign JWT tokens with (Can be any string)
APP_ORIGIN=Client URI (Default: http://localhost:5173)
PORT=Port that the server is listening in on (Default: 4000)

### The following environment variables are optional, but will improve app performance when loading images by enabling the ImageKit API:
USE_IMAGEKIT='true' 
IMAGEKIT_PUBLIC_KEY=Your ImageKit public key
IMAGEKIT_PRIVATE_KEY=Your ImageKit private key
IMAGEKIT_URI=Your ImageKit URL endpoint

2. Open a terminal and navigate to the backend directory.
3. Run `npm install`.
4. Run `npm run start`.

## Link To Live Frontend
https://food-ordering-site-ecru.vercel.app

## Link To Live Backend
https://food-ordering-site-j5bk.onrender.com

## API Routes

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

## How To Test Frontend
1. Open a terminal and navigate to the client directory.
2. Ensure node_modules are already installed with `npm install`.
3. Run `npx vitest`.

## Image Credits

_Orderdropper and accessibility logos created by Richard Ly._ 

**McDonalds**
https://pixabay.com/photos/mcdonalds-editorial-chain-fast-food-1340199/
https://pixabay.com/photos/burger-cheese-burger-burgers-3946012/
https://pixabay.com/photos/hamburger-sandwich-chicken-healthy-8026582/
https://pixabay.com/photos/food-gourmet-delicious-meal-3635355/

**Olive Garden**
https://pixabay.com/photos/spaghetti-sauce-pasta-food-1604836/
https://pixabay.com/photos/ravioli-mouth-pockets-pasta-noodles-9641574/

**Taco Bell**
https://pixabay.com/photos/tacos-taco-shells-meal-drink-8076612/
https://pixabay.com/photos/taco-tortilla-mexican-meal-food-7623097/
https://pixabay.com/photos/mexican-food-burrito-mexican-food-2456038/

**Dunkin' Donuts**
https://pixabay.com/photos/donuts-pastries-kringel-cakes-4633040/
https://pixabay.com/photos/donut-baked-goods-sweet-1761520/
https://pixabay.com/photos/donuts-donut-pastries-cute-643277/

**KFC**
https://pixabay.com/photos/kfc-kentucky-fried-chicken-san-juan-1574389/
https://pixabay.com/illustrations/chicken-drumstick-crispy-fried-9579090/
https://pixabay.com/illustrations/sandwich-chicken-food-meal-7628011/

**Pizza Hut**
https://pixabay.com/photos/pizza-food-italy-3000274/
https://pixabay.com/photos/pizza-mozzarella-food-5661748/

**New York Fries**
https://pixabay.com/photos/fry-food-fried-delicious-1807668/
https://pixabay.com/photos/bowl-french-fries-food-fries-1842294/