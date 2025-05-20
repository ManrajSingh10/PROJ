# Nest Finder

Welcome to the Nest Finder - Property Marketplace project! This is an online platform where users can buy, sell, and rent properties. It allows users to list properties, browse available properties, apply filters for advanced searches, and contact property owners or agents directly.

## Table of Contents

- [About](#about)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Usage](#usage)

## About

Nest Finder is a platform where individuals can list properties for sale or rent, browse available listings, and manage their accounts. Users can filter properties based on various criteria like location, price, type, and more. The platform is built using modern web technologies to provide a seamless and responsive user experience.

## Features

- **User Registration & Authentication**: Users can sign up, log in, and manage their profiles.
- **Property Listings**: Users can list their properties for sale or rent with all necessary details like price, description, images, etc.
<!-- - **Advanced Search & Filters**: Search properties based on location, price, number of rooms, area, and other criteria. -->
- **Property Details Page**: Each property has a dedicated page with detailed information, images, and contact options.
- **Favorites**: Users can save their favorite properties for quick access later.
- **Responsive Design**: The platform is mobile-friendly and works well on both desktop and mobile devices.
- **User Messaging**: Users can contact property owners directly through the platform's messaging system.

## Tech Stack

This project is built using the following technologies:

- **Frontend**:
  - React.js (for building the user interface)
  - Tailwind (for styling)
  - Axios (for API calls)

- **Backend**:
  - Node.js (for building the backend server)
  - Express.js (for handling API routes)
  - MongoDB (for database storage)
  - Mongoose (for interacting with MongoDB)

- **Authentication**:
  - JSON Web Tokens (JWT) for user authentication and session management.

- **File Storage**:
  - Cloudinary (for storing property images and other media)

<!-- - **Others**:
  - Google Maps API (for property location visualization) -->

## Setup Instructions

To get started with this project locally, follow the steps below.

### 1. Clone the Repository

```bash
git clone https://github.com/567mayank/Nest-Finder.git
cd Nest-Finder
```


### 2. Install Dependencies
```bash
# Frontend
# Navigate to the frontend directory and install dependencies:

cd frontend
npm install

# Backend
# Navigate to the backend directory and install dependencies:

cd backend
npm install
```
### 3. Environment Variables
Create a .env file in both the frontend and backend directories and add the following environment variables:

```bash
# Frontend .env:
REACT_APP_API_URL=http://localhost:5000/api
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

### 4. Run the Project

```bash
# Frontend
# Run the frontend development server:

cd frontend
npm run dev

# Backend
# Run the backend server:

cd backend
npm run dev
```
The backend will be running on http://localhost:5173, and the frontend will be available at http://localhost:8000.


## Usage
### Browse Properties: 
Visit the homepage to view available listings.
### Search and Filter:
Use the search bar and filters to find properties by location, price, and other criteria.
### List Property: 
Registered users can add new properties by filling out a listing form.
### Contact Owners: 
Users can send messages to property owners or agents directly through the platform.


## Thank you for checking out Nest Finder! 

This **README.md** file will give contributors and users clear guidance on how to set up, use, and contribute to your