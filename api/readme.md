```js 
export const getAllTours = async (req, res, next) => {
  try {
    // Copying the request query parameters into queryObj
    const queryObj = { ...req.query };

    // Excluding specific fields ('page', 'sort', 'limit', 'fields') from queryObj
    const excludeFields = ['page', 'sort', 'limit', 'fields'];
    excludeFields.forEach(el => delete queryObj[el]);

    // Converting queryObj to a JSON string and replacing specific comparison operators ('$gte', '$gt', '$lte', '$lt')
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, match => `$${match}`);

    // Parsing the modified queryStr into a MongoDB query object
    let query = Tour.find(JSON.parse(queryStr));

    // Sorting the query results based on 'sort' query parameter
    if (req.query.sort) {
      const sortBy = req.query.sort.split(',').join(' '); // Converting comma-separated fields into space-separated for sorting
      query = query.sort(sortBy);
    } else {
      query = query.sort('-createdAt'); // Default sorting by 'createdAt' field in descending order
    }

    // Selecting specific fields to include/exclude from query results based on 'fields' query parameter
    if (req.query.fields) {
      const field = req.query.fields.split(',').join(' '); // Converting comma-separated fields into space-separated for field selection
      query = query.select(field);
    } else {
      query = query.select('-__v'); // Excluding '__v' field from query results by default
    }

    // Pagination setup based on 'page' and 'limit' query parameters
    const page = req.query.page * 1 || 1; // Current page number (default: 1)
    const limit = req.query.limit * 1 || 100; // Number of documents per page (default: 100)
    const skip = (page - 1) * limit; // Number of documents to skip for pagination

    // Applying pagination to the query
    query = query.skip(skip).limit(limit);

    // Checking if requested page exceeds the total number of documents
    if (req.query.page) {
      const numTours = await Tour.countDocuments();
      if (skip >= numTours) {
        throw new Error('This page does not exist.'); // Throw error if page number is out of range
      }
    }

    // Executing the final query to retrieve tour data
    let tours = await query;

    // Sending response with the retrieved tour data
    res.status(200).json({
      success: 'success',
      data: tours,
    });
  } catch (e) {
    next(e); // Forwarding any caught errors to the error handling middleware
  }
};
```