# TripGo - Travel Agency Booking System Platform

Welcome to the TripGo repository! This project is a Travel Agency Booking System designed to help customers easily explore and book exciting travel packages. It provides a user-friendly interface for customers to view available packages, book their trips, and receive basic invoices for their bookings.

## Project Overview

TripGo offers an easy-to-use platform where customers can:
- Browse through available tour packages.
- Book a tour package by providing necessary details.
- Receive a basic invoice after booking, summarizing customer information and booking details.

### Core Features:
1. **Tour Packages Page:**
   - Displays a list of tour packages with essential details:
     - Title
     - Description
     - Price
     - Available Dates
     - Images
   - Data is fetched from a MongoDB collection to dynamically display the available packages.

2. **Package Booking:**
   - Each package has a 'Book Now' button.
   - Clicking the 'Book Now' button opens a form where customers can input:
     - Name
     - Email
     - Phone Number
     - Number of travelers
     - Special requests 
   - After the customer fills in their details, the booking is saved to MongoDB.

3. **Invoice Generation:**
   - After booking, the system generates a basic invoice which includes:
     - Customer Details (Name, Email, Phone Number)
     - Package Details (Title, Price, Number of Travelers)
     - Total Price (Calculated based on the price per person * number of travelers)

## Tech Stack
- **Frontend:**
  - React
  - TailwindCSS 

- **Backend:**
  - Node.js
  - Express.js

- **Database:**
  - MongoDB (for storing package and booking details)

## Installation

### Prerequisites
Ensure that you have the following installed:
- Node.js
- MongoDB

### Frontend Setup
1. Clone the repository:
   ```bash
   git clone https://github.com/Aditya1or0/TripGo.git
   ```
2. Navigate to the frontend directory:
   ```bash
   cd TripGo/frontend
   ```
3. Install the necessary dependencies:
   ```bash
   npm install
   ```
4. Start the development server:
   ```bash
   npm run dev
   ```

### Backend Setup
1. Navigate to the backend directory:
   ```bash
   cd TripGo/backend
   ```
2. Install the necessary dependencies:
   ```bash
   npm install
   ```
3. Start the server:
   ```bash
   npm start
   ```

Ensure your MongoDB server is running and properly connected to the backend.

## Usage

### 1. **Tour Packages Page:**
   - Navigate to the homepage where you can view all available tour packages.
   - Each package will have details like the title, description, price, available dates, and an image.

### 2. **Booking a Package:**
   - Click on the 'Book Now' button next to the package you wish to book.
   - Fill in the required customer information and submit the form.
   - Your booking will be saved in MongoDB.

### 3. **Invoice Generation:**
   - After the booking is confirmed, you will receive an invoice with your booking details, including the customer and package information.

## Contributing

We welcome contributions to enhance the functionality of TripGo! If you'd like to contribute:

1. Fork the repository.
2. Create a new branch 
3. Make your changes and commit them.
4. Push your changes to your forked repository.
5. Submit a pull request with a description of your changes.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Contact

- **GitHub Repository:** [https://github.com/Aditya1or0/TripGo](https://github.com/Aditya1or0/TripGo)
- **Email:** [adityapandit264@gmail.com](mailto:adityapandit264@gmail.com)

