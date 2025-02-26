# API Endpoints Reference

## Finance Endpoints

### Loan
- **POST** `/api/finance/loan` - Add a loan  
- **GET** `/api/finance/loan/:userId` - Get all loans for a user  
- **PUT** `/api/finance/loan/:userId/:entryId` - Update a loan entry (Partial)  
- **DELETE** `/api/finance/loan/:userId/:entryId` - Delete a loan entry  

### Savings
- **POST** `/api/finance/savings` - Add a savings entry  
- **GET** `/api/finance/savings/:userId` - Get all savings for a user  
- **PUT** `/api/finance/savings/:userId/:entryId` - Update a savings entry (Partial)  
- **DELETE** `/api/finance/savings/:userId/:entryId` - Delete a savings entry  

### Assets
- **POST** `/api/finance/assets` - Add an asset  
- **GET** `/api/finance/assets/:userId` - Get all assets for a user  
- **PUT** `/api/finance/assets/:userId/:entryId` - Update an asset entry (Partial)  
- **DELETE** `/api/finance/assets/:userId/:entryId` - Delete an asset entry  

### Lent
- **POST** `/api/finance/lent` - Add a lent entry  
- **GET** `/api/finance/lent/:userId` - Get all lent entries for a user  
- **PUT** `/api/finance/lent/:userId/:entryId` - Update a lent entry (Partial)  
- **DELETE** `/api/finance/lent/:userId/:entryId` - Delete a lent entry  
